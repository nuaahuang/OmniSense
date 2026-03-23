# OmniSense: Software Supply Chain 2.0 🚀

> **"Distribution is Documentation; Shipping is Semantics."** > **“发布即文档，分发即语义。”**

OmniSense is a semantic distribution protocol designed to eliminate **API Drift** and **AI Hallucinations** in large-scale software engineering. It ensures that AI agents (like Cursor/Claude) always reason based on the precise, version-anchored metadata of your dependencies.

---

## 🌐 Documentation & Language / 文档与语言

Please select your preferred language to view the project details and technical specifications:

### 🇺🇸 English (English)
* **Overview & Vision**: [**README_EN.md**](./README_EN.md)
* **Protocol Standard**: [**SPEC_V1_EN.md**](./omni-spec/SPEC_V1_EN.md)

### 🇨🇳 简体中文 (Simplified Chinese)
* **项目愿景与架构**: [**README_CN.md**](./README_CN.md)
* **协议技术规范**: [**SPEC_V1_CN.md**](./omni-spec/SPEC_V1_CN.md)

---

## 📂 Project Structure
* `omni-maven-plugin`: The Producer (Java/Maven) - Injects semantics into artifacts.
* `omni-vscode-extension`: The Consumer (TS/VS Code) - Synchronizes semantics for AI.
* `omni-spec/`: The Core Open-Omni Protocol definition.
* `.cursorrules`: The AI Context Injection rules for IDEs.

---

## 🛠️ Quick Start
1.  Add `omni-maven-plugin` to your `pom.xml`.
2.  Run `mvn omni:generate` to produce `omni-manifest.json`.
3.  Install the VS Code extension to auto-sync dependencies into `.omni/`.

---
© 2026 OmniSense Working Group. Licensed under MIT.