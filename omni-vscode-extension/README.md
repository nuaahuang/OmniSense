# OmniOpenAIDoc

**OmniOpenAIDoc** is a VS Code extension built for the AI-native developer. It eliminates "context gaps" for AI Agents (like Cursor, Claude, and Copilot) when dealing with binary dependencies by synchronizing semantic metadata.

---

## 🧐 Core Value

Traditional AI coding assistants struggle with compiled Java libraries, often seeing only decompiled code or missing Javadocs. Used alongside the `omni-openai-doc-maven-plugin`, this extension injects source-level semantics (comments, logical intent, and structures) directly into your AI's context to eliminate hallucinations.

## 🚀 Quick Start

Get full semantic awareness for your AI assistant in just two steps:

1. **Install** the `OmniOpenAIDoc` extension from the VS Code Marketplace.
2. **Synchronize**: Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run:
   > **OmniOpenAIDoc: Sync Semantic Context**

## 📦 Requirements

* **Maven Plugin**: Ensure your Java project has generated semantic metadata via `omni-openai-doc-maven-plugin`.
* **Build Completed**: Run `mvn install` before syncing to ensure the necessary index files are produced.

## ⚙️ Extension Settings

* `omniOpenAIDoc.autoScan`: (Default: `true`) Automatically scans the classpath for semantic metadata.

---

## 📄 License

Apache License 2.0