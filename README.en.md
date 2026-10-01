<div align="center">

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md)

<img src="web/public/leaf.svg" width="84" alt="CSleaf logo"/>

# CSleaf

**A local-first, Overleaf-style LaTeX editor**

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A518-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-2d3946)](#-quick-start)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-34d399.svg)](#-contributing)

*No Docker · No cloud · Your papers never leave your machine*

[Features](#-features) · [Quick Start](#-quick-start) · [Templates](#-built-in-templates-19-verified-with-real-compilations) · [Shortcuts](#️-shortcuts) · [Online Preview](https://jensen-yao.github.io/CSleaf/)

<img src="screenshots/editor.png" width="920" alt="CSleaf editor with live PDF preview"/>

</div>

---

## ✨ Why CSleaf?

Writing papers often means choosing between tools with frustrating tradeoffs:

- **Overleaf** is convenient, but requires a connection, limits compilation on the free plan, and needs a full Docker stack for self-hosting.
- **TeXstudio / TeXmaker** are capable, but their interfaces and detached PDF workflows feel dated.
- **VS Code + LaTeX Workshop** is powerful, but takes configuration and is not designed for an open-and-write experience.

**CSleaf brings the Overleaf experience back to your computer.** One command launches a complete three-pane writing environment in your browser: a project tree on the left, a Monaco editor in the center, and a live PDF preview on the right. Compilation uses your local TeX Live or MiKTeX installation, and every file stays on your own disk.

## 🌟 Features

**Project management**

- 🗂️ Project gallery with create, rename, duplicate, delete, ZIP export, and ZIP import, including projects downloaded from GitHub
- 📚 19 ready-to-use templates for Chinese and English papers, IEEE, ACM, Springer LNCS, Elsevier, Beamer, theses, lab reports, group meetings, review responses, coursework, posters, CVs, and math notes—all verified with real compilations

**Editor (Monaco)**

- 📝 LaTeX syntax highlighting, bracket matching, and folding for `\begin{}...\end{}` regions
- 🧠 Smart completion with 150+ common commands, environment snippets, and context-aware suggestions
  - `\ref{` lists every `\label{}` in the project
  - `\cite{` parses `.bib` files and previews titles
  - `\input{` / `\includegraphics{` lists matching project files
- 📖 Outline navigation for sections, Beamer frames, figures, and tables
- 🔍 Search, regular expressions, and replace, plus quick open (`Ctrl+P`), command palette (`Ctrl+Shift+P`), tabs, and autosave

**Compilation and preview**

- ⚡ One-click compilation with `latexmk` (automatic reruns + BibTeX), `pdflatex`, `xelatex`, or `lualatex`
- 🔁 Optional compile-on-save with in-place, flicker-free PDF refresh
- 🖥️ Sharp PDF rendering with 2x supersampling across zoom levels and high-DPI displays
- 🖼️ **PDF thumbnail sidebar** for document-wide navigation
- 🔎 **PDF text search** with match counts, previous/next navigation, and highlighting (Enter / Shift+Enter)
- 🧭 **Bidirectional SyncTeX**: `Alt+S` jumps from the cursor to the PDF; double-clicking the PDF jumps back to source
- 🐞 Error and warning panel with `.log` parsing, file and line navigation, and missing-package hints
- 📄 PDF zoom, page navigation, fit width/page, page count, and download

**Interface and workflow**

- 🌗 Dark and light themes with a resizable three-pane layout
- 🌏 Simplified Chinese, Traditional Chinese, and English, selected from a language list
- 📊 Status bar with TeX detection, word counts, cursor position, auto-compile controls, and full-project statistics
- 🧹 One-click cleanup for auxiliary files (`.aux/.log/.bbl/...`), which are hidden automatically from the file tree

## 🚀 Quick Start

### 0. Install a TeX distribution

CSleaf edits files and invokes a local compiler, so a TeX distribution is required:

| System | Recommended | Installation |
|---|---|---|
| Windows | **TeX Live** (full) or MiKTeX | [tug.org/texlive](https://tug.org/texlive/) · `install-tl-windows.exe` |
| macOS | MacTeX / TinyTeX | `brew install --cask mactex-no-gui` |
| Linux | TeX Live | `sudo apt install texlive-full` |

> CSleaf scans PATH and common TeX Live, MiKTeX, and TinyTeX locations on every drive, including installations such as `E:\texlive\2026`. You can also set a custom path in **Settings**.

### 1. Start CSleaf

```bash
git clone https://github.com/Jensen-Yao/CSleaf.git
cd CSleaf
npm run setup     # Install dependencies and build the frontend
npm start         # Start and open http://127.0.0.1:4513
```

Create a project from a template, press `Ctrl+Enter`, and start writing 🎉

> Change the port with `PORT=8080 npm start`. Paper data is stored in `workspace/`, which is gitignored.

## 🎓 Built-in Templates (19, verified with real compilations)

| Template | Engine | Description |
|---|---|---|
| Academic Article | latexmk | Sections, TikZ figure, booktabs table, and bibliography |
| Chinese Academic Paper | xelatex | ctexart with abstract, keywords, figures, tables, and references |
| IEEE Conference Paper | latexmk | IEEEtran two-column conference format |
| IEEE Journal Paper | latexmk | IEEEtran journal mode with thanks footnotes |
| ACM Conference Paper | latexmk | acmart sigconf with optional nonacm mode |
| Springer LNCS | latexmk | Single-column LNCS with multiple affiliations |
| Elsevier Journal | latexmk | elsarticle frontmatter and keywords |
| Beamer Presentation | latexmk | 16:9 academic slides |
| Chinese Beamer Presentation | xelatex | ctexbeamer with outline, columns, and tables |
| Chinese Thesis | xelatex | ctexbook with cover, abstracts, contents, chapters, and appendix |
| English Thesis | latexmk | book class with title page, TOC, lists, and appendix |
| Lab Report | xelatex | Objectives, theory, procedure, data table, and conclusion |
| Group Meeting | xelatex | Weekly progress, problems, experiments, and plans |
| Review Response | latexmk | Comment/Response pairs with highlighted replies |
| Coursework | latexmk | Problem–Solution environments, header, and page count |
| Academic Poster | latexmk | A0 portrait multi-column tikzposter |
| Academic CV | latexmk | Single-page academic CV |
| Math Notes | latexmk | amsthm theorem environments and proofs |
| Blank | latexmk | Minimal compilable document |

## ⌨️ Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Compile |
| `Ctrl + S` | Save (autosave is enabled by default) |
| `Ctrl + F` / `Ctrl + H` | Find / replace |
| `Ctrl + P` | Quick open |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + B` / `Ctrl + Shift + E` / `Ctrl + J` | Toggle sidebar / PDF preview / log panel |
| `Alt + S` | SyncTeX: cursor → PDF |
| Double-click PDF | SyncTeX: PDF → source |

## 🏗️ Architecture

```text
┌──────────────────────────── Browser ─────────────────────────────┐
│  React 18 · Monaco Editor (LaTeX) · PDF.js · Zustand · Vite      │
└──────────────────────────────┬───────────────────────────────────┘
                    REST + WebSocket (127.0.0.1:4513)
┌──────────────────────────────┴───────────────────────────────────┐
│  Node.js · Express · ws                                          │
│  Project/file CRUD · ZIP I/O · compilation · logs · SyncTeX      │
└──────────────────────────────┬───────────────────────────────────┘
                 Local TeX distribution (TeX Live / MiKTeX / TinyTeX)
```

- Only four backend runtime dependencies: express, ws, multer, and adm-zip. Monaco and PDF.js are bundled locally for **fully offline use**.
- The server binds only to `127.0.0.1` by default.

## 🗺️ Roadmap

- [ ] Git integration with project-level history
- [ ] Spelling and linting with ChkTeX / LanguageTool
- [ ] Visual formula and table insertion helpers
- [ ] Cross-project full-text search
- [ ] Electron/Tauri desktop shell and installers
- [ ] GB/T 7714 Chinese bibliography template

## 🤝 Contributing

Issues and pull requests are welcome. For development:

```bash
npm install && npm install --prefix web
npm run dev:web   # Frontend HMR with the backend API started automatically
```

## 📄 License

[MIT](LICENSE) © 2026 Jensen-Yao

## 🙏 Acknowledgements

Inspired by and built with [Overleaf](https://github.com/overleaf/overleaf), [LaTeX Workshop](https://github.com/James-Yu/LaTeX-Workshop), [Monaco Editor](https://github.com/microsoft/monaco-editor), [PDF.js](https://github.com/mozilla/pdf.js), and [TinyTeX](https://github.com/rstudio/tinytex).

<div align="center">
<i>If CSleaf helps you, please consider leaving a ⭐</i>
</div>
