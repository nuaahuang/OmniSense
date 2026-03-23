import * as fs from 'fs';
import * as path from 'path';

/**
 * Aligned with Open-Omni Protocol SPEC_V1
 */
export interface OmniMethod {
    signature: string;
    description: string;
    annotations?: string[];
}

export interface OmniClass {
    class: string;      // Fully Qualified Name
    comment: string;    // Class-level semantics
    methods: OmniMethod[];
}

export interface OmniManifest {
    protocol: string;
    module: string;
    version: string;
    timestamp: number;
    apis: OmniClass[]; // Aggregated by class
}

export class SourceGenerator {
    private readonly outputDir: string;

    constructor(projectRoot: string) {
        // Output to .omni/temp_sources for AI indexing (should be git-ignored)
        this.outputDir = path.join(projectRoot, '.omni', 'temp_sources');
    }

    /**
     * Entry point: Generates shadow Java files based on SPEC_V1 manifests
     */
    public async generate(manifestMap: Map<string, OmniManifest>): Promise<void> {
        this.initializeOutputDir();

        for (const [moduleName, manifest] of manifestMap) {
            console.log(`[OmniSense] Syncing shadow sources for: ${moduleName} (v${manifest.version})`);
            
            if (!manifest.apis || !Array.isArray(manifest.apis)) {
                continue;
            }

            // In SPEC_V1, apis are already grouped by class
            for (const classNode of manifest.apis) {
                this.writeShadowJavaFile(manifest.module, classNode);
            }
        }
    }

    private writeShadowJavaFile(moduleName: string, classNode: OmniClass) {
        const fullClassName = classNode.class;
        const parts = fullClassName.split('.');
        const className = parts.pop()!;
        const packageName = parts.join('.');

        // 1. Resolve physical path: .omni/temp_sources/com/example/...
        const packageRelPath = path.join(...parts);
        const targetFolder = path.join(this.outputDir, packageRelPath);
        
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
        }

        // 2. Build Shadow Source Content
        let content = `package ${packageName};\n\n`;
        
        // Class Header with Domain Semantics
        content += `/**\n`;
        content += ` * [OmniSense Shadow Source]\n`;
        content += ` * Module: ${moduleName}\n`;
        if (classNode.comment) {
            content += ` * Domain: ${classNode.comment.replace(/\n/g, '\n * ')}\n`;
        }
        content += ` * \n`;
        content += ` * This is a semantic shell for AI reasoning. DO NOT EDIT.\n`;
        content += ` */\n`;
        content += `public class ${className} {\n\n`;

        // 3. Methods with Javadoc Constraints
        for (const method of classNode.methods) {
            const desc = method.description || "No specific business constraints.";
            content += `    /**\n`;
            content += `     * ${desc.replace(/\n/g, '\n     * ')}\n`;
            content += `     */\n`;
            content += `    public ${this.createMethodStub(method.signature)}\n\n`;
        }

        content += `}\n`;

        const filePath = path.join(targetFolder, `${className}.java`);
        fs.writeFileSync(filePath, content, 'utf8');
    }

    /**
     * Creates a valid Java method stub to satisfy basic IDE syntax highlighting
     */
    private createMethodStub(signature: string): string {
        let s = signature.trim();
        if (s.endsWith(';')) s = s.slice(0, -1);

        // Simple return type inference for shadow bodies
        if (s.includes('void ')) return `${s} { /* Shadow */ }`;
        if (s.includes('boolean ')) return `${s} { return false; }`;
        
        const numericPrimitives = ['int', 'long', 'double', 'float', 'short', 'byte'];
        if (numericPrimitives.some(type => s.startsWith(type + ' ') || s.includes(' ' + type + ' '))) {
            return `${s} { return 0; }`;
        }

        return `${s} { return null; }`;
    }

    private initializeOutputDir() {
        if (fs.existsSync(this.outputDir)) {
            // Force clean to ensure no stale classes remain from old versions
            fs.rmSync(this.outputDir, { recursive: true, force: true });
        }
        fs.mkdirSync(this.outputDir, { recursive: true });
    }
}