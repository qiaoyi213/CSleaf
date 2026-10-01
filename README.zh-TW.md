<div align="center">

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md)

<img src="web/public/leaf.svg" width="84" alt="CSleaf logo"/>

# CSleaf

**本地優先、Overleaf 風格的 LaTeX 編輯器**

[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%E2%89%A518-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-2d3946)](#-快速開始)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-34d399.svg)](#-貢獻)

*不需要 Docker · 不需要網路 · 論文資料完全留在本機*

[功能特色](#-功能特色) · [快速開始](#-快速開始) · [模板](#-內建模板19-個皆通過實際編譯驗證) · [快捷鍵](#️-快捷鍵) · [線上預覽頁](https://jensen-yao.github.io/CSleaf/)

<img src="screenshots/editor.png" width="920" alt="CSleaf 編輯器與即時 PDF 預覽"/>

</div>

---

## ✨ 為什麼要做 CSleaf？

寫論文時，你可能遇過這些困擾：

- **Overleaf** 好用，但需要網路、免費版編譯受限，私有部署還得維護整套 Docker；
- **TeXstudio / TeXmaker** 功能完整，但介面老舊，PDF 預覽體驗較割裂；
- **VS Code + LaTeX Workshop** 很強大，但設定繁瑣，不是為「打開就寫」而設計。

**CSleaf 把 Overleaf 的體驗帶回本機**：一行指令啟動，在瀏覽器中提供完整的三欄寫作環境——左側專案檔案樹、中間 Monaco 編輯器、右側即時 PDF 預覽。編譯使用本機既有的 TeX Live / MiKTeX，所有資料都保存在自己的磁碟中。

## 🌟 功能特色

**專案管理**

- 🗂️ 專案圖庫：建立、重新命名、複製、刪除、匯出 ZIP、從 ZIP 匯入（支援 GitHub 下載的專案壓縮檔）
- 📚 19 個開箱即用的模板：中英文論文、IEEE 會議/期刊、ACM、Springer LNCS、Elsevier、Beamer、畢業論文、實驗報告、組會報告、審稿回覆、作業、海報、履歷、數學筆記等，皆通過實際編譯驗證

**編輯器（Monaco）**

- 📝 LaTeX 語法高亮、括號配對、程式碼折疊（`\begin{}...\end{}` 區域）
- 🧠 智慧補全：150+ 個常用指令、環境片段與情境感知補全
  - `\ref{` → 自動列出全文所有 `\label{}`
  - `\cite{` → 解析 `.bib` 檔案並顯示標題預覽
  - `\input{` / `\includegraphics{` → 列出專案內相符檔案
- 📖 大綱導覽：章節、Beamer frame、圖表，點擊即可跳轉
- 🔍 搜尋、正規表達式與取代，另支援快速開啟（`Ctrl+P`）、命令面板（`Ctrl+Shift+P`）、多分頁與自動儲存

**編譯與預覽**

- ⚡ 一鍵編譯：支援 `latexmk`（自動多輪編譯 + BibTeX）、`pdflatex`、`xelatex`、`lualatex`
- 🔁 儲存後自動編譯（可關閉），PDF 原位置更新、不閃爍
- 🖥️ 高畫質 PDF 渲染：2x 超採樣，在各種縮放比例與高解析度螢幕上都保持清晰
- 🖼️ **PDF 縮圖側欄**：快速瀏覽全文並點擊跳頁
- 🔎 **PDF 內搜尋**：相符數量、上一個/下一個、高亮定位（Enter / Shift+Enter）
- 🧭 **SyncTeX 雙向跳轉**：`Alt+S` 從游標定位 PDF；雙擊 PDF 返回原始碼
- 🐞 錯誤/警告面板：解析 `.log` 至檔案與行號，點擊即可抵達；缺少套件時提供提示
- 📄 PDF 預覽：縮放、頁碼跳轉、符合寬度/頁面、總頁數與下載

**介面與體驗**

- 🌗 深色/淺色主題、葉綠色調，可拖曳調整三欄版面
- 🌏 繁體中文、简体中文、English 三語介面，使用列表切換
- 📊 狀態列：TeX 發行版偵測、字數統計、游標位置與自動編譯開關；點擊可查看全專案統計
- 🧹 一鍵清除輔助檔案（`.aux/.log/.bbl/...`），檔案樹自動隱藏編譯產物

## 🚀 快速開始

### 0. 前置條件：安裝 TeX 發行版

CSleaf 負責編輯與呼叫編譯器，因此需要一套 TeX 發行版：

| 系統 | 建議 | 安裝方式 |
|---|---|---|
| Windows | **TeX Live**（完整安裝）或 MiKTeX | [tug.org/texlive](https://tug.org/texlive/) · `install-tl-windows.exe` |
| macOS | MacTeX / TinyTeX | `brew install --cask mactex-no-gui` |
| Linux | TeX Live | `sudo apt install texlive-full` |

> CSleaf 會自動掃描 PATH，以及各磁碟中的 TeX Live / MiKTeX / TinyTeX（包含 `E:\texlive\2026` 等非 C 槽安裝）；也可在**設定**中手動指定路徑。

### 1. 啟動 CSleaf

```bash
git clone https://github.com/Jensen-Yao/CSleaf.git
cd CSleaf
npm run setup     # 安裝相依套件並建置前端
npm start         # 啟動並自動開啟 http://127.0.0.1:4513
```

從模板建立專案，按下 `Ctrl+Enter` 編譯，即可開始寫作 🎉

> 可使用 `PORT=8080 npm start` 修改連接埠；論文資料保存在 `workspace/`（已加入 gitignore，不會誤提交）。

## 🎓 內建模板（19 個，皆通過實際編譯驗證）

| 模板 | 引擎 | 說明 |
|---|---|---|
| 學術文章 Academic Article | latexmk | 章節、TikZ 圖、三線表與參考文獻 |
| 中文學術論文 | xelatex | ctexart：摘要、關鍵字、圖表與參考文獻 |
| IEEE 會議論文 | latexmk | IEEEtran 會議雙欄格式 |
| IEEE 期刊論文 | latexmk | IEEEtran 期刊模式，含 thanks 註腳 |
| ACM 會議論文 | latexmk | acmart sigconf（可選 nonacm） |
| Springer LNCS | latexmk | LNCS 單欄、多機構作者 |
| Elsevier 期刊 | latexmk | elsarticle frontmatter 與關鍵字 |
| Beamer 簡報 | latexmk | 16:9 學術投影片 |
| 中文 Beamer 報告 | xelatex | ctexbeamer：目錄、分欄與表格 |
| 中文畢業論文 | xelatex | ctexbook：封面、摘要、目錄、多章與附錄 |
| 英文學位論文 | latexmk | book 類別：標題頁、TOC、圖表清單與附錄 |
| 實驗報告 | xelatex | 目的、原理、步驟、資料表與結論 |
| 組會報告 | xelatex | 週報式：進度、問題、實驗紀錄與計畫 |
| 審稿回覆信 | latexmk | 逐項 Comment / Response 與回覆高亮 |
| 課程作業 | latexmk | Problem–Solution 環境、頁首與總頁數 |
| 學術海報 | latexmk | tikzposter A0 直式多欄 |
| 英文履歷 Academic CV | latexmk | 單頁學術履歷 |
| 數學筆記 | latexmk | amsthm 定理環境與證明 |
| Blank | latexmk | 最小可編譯文件 |

## ⌨️ 快捷鍵

| 快捷鍵 | 功能 |
|---|---|
| `Ctrl + Enter` | 編譯 |
| `Ctrl + S` | 儲存（預設自動儲存） |
| `Ctrl + F` / `Ctrl + H` | 搜尋 / 取代 |
| `Ctrl + P` | 快速開啟檔案 |
| `Ctrl + Shift + P` | 命令面板 |
| `Ctrl + B` / `Ctrl + Shift + E` / `Ctrl + J` | 切換側欄 / PDF 預覽 / 日誌面板 |
| `Alt + S` | SyncTeX：游標 → PDF |
| 雙擊 PDF | SyncTeX：PDF → 原始碼 |

## 🏗️ 架構

```text
┌──────────────────────────── 瀏覽器 ─────────────────────────────┐
│  React 18 · Monaco Editor（LaTeX 語言）· PDF.js · Zustand · Vite │
└──────────────────────────────┬─────────────────────────────────┘
                    REST + WebSocket (127.0.0.1:4513)
┌──────────────────────────────┴─────────────────────────────────┐
│  Node.js · Express · ws                                        │
│  專案/檔案 CRUD · ZIP 匯入匯出 · 編譯流程 · 日誌解析 · SyncTeX │
└──────────────────────────────┬─────────────────────────────────┘
                   本機 TeX 發行版（TeX Live / MiKTeX / TinyTeX）
```

- 後端僅有 4 個執行階段相依套件（express / ws / multer / adm-zip）；Monaco 與 PDF.js 皆在本機打包，**內網離線可用**
- 預設僅綁定 `127.0.0.1`

## 🗺️ Roadmap

- [ ] Git 整合（專案層級版本歷史）
- [ ] 拼字檢查與語法提示（ChkTeX / LanguageTool）
- [ ] 視覺化公式/表格插入精靈
- [ ] 跨專案全文搜尋
- [ ] 桌面外殼（Electron/Tauri）與安裝套件
- [ ] 中文參考文獻格式（GB/T 7714）模板

## 🤝 貢獻

歡迎提交 Issue 與 PR。開發模式：

```bash
npm install && npm install --prefix web
npm run dev:web   # 前端熱更新，並自動啟動後端 API
```

## 📄 授權

[MIT](LICENSE) © 2026 Jensen-Yao

## 🙏 致謝

靈感與相依套件來自：[Overleaf](https://github.com/overleaf/overleaf)、[LaTeX Workshop](https://github.com/James-Yu/LaTeX-Workshop)、[Monaco Editor](https://github.com/microsoft/monaco-editor)、[PDF.js](https://github.com/mozilla/pdf.js)、[TinyTeX](https://github.com/rstudio/tinytex)。

<div align="center">
<i>如果 CSleaf 對你有幫助，歡迎給一顆 ⭐</i>
</div>
