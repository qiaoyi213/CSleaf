// UI strings: Simplified Chinese, Traditional Chinese (Taiwan), and English.
const dict = {
  // app / home
  appName: { 'zh-TW': 'CSleaf', 'zh-CN': 'CSleaf', en: 'CSleaf' },
  tagline: { 'zh-TW': '本地優先的 LaTeX 論文寫作環境', 'zh-CN': '本地优先的 LaTeX 论文写作环境', en: 'A local-first LaTeX editor for paper writing' },
  myProjects: { 'zh-TW': '我的專案', 'zh-CN': '我的项目', en: 'My Projects' },
  newProject: { 'zh-TW': '新增專案', 'zh-CN': '新建项目', en: 'New Project' },
  importZip: { 'zh-TW': '匯入 ZIP', 'zh-CN': '导入 ZIP', en: 'Import ZIP' },
  importTemplate: { 'zh-TW': '匯入模板', 'zh-CN': '导入模板', en: 'Import template' },
  emptyProjects: { 'zh-TW': '還沒有專案，從模板建立一個吧', 'zh-CN': '还没有项目，从模板创建一个吧', en: 'No projects yet — create one from a template' },
  open: { 'zh-TW': '開啟', 'zh-CN': '打开', en: 'Open' },
  duplicate: { 'zh-TW': '複製', 'zh-CN': '复制', en: 'Duplicate' },
  rename: { 'zh-TW': '重命名', 'zh-CN': '重命名', en: 'Rename' },
  delete: { 'zh-TW': '刪除', 'zh-CN': '删除', en: 'Delete' },
  export: { 'zh-TW': '匯出 ZIP', 'zh-CN': '导出 ZIP', en: 'Export ZIP' },
  updated: { 'zh-TW': '更新於', 'zh-CN': '更新于', en: 'Updated' },
  created: { 'zh-TW': '建立於', 'zh-CN': '创建于', en: 'Created' },
  settings: { 'zh-TW': '設定', 'zh-CN': '设置', en: 'Settings' },
  confirmDeleteProject: { 'zh-TW': '確定刪除該專案？此操作無法復原。', 'zh-CN': '确定删除该项目？此操作不可恢复。', en: 'Delete this project? This cannot be undone.' },

  // new project modal
  chooseTemplate: { 'zh-TW': '選擇模板', 'zh-CN': '选择模板', en: 'Choose a template' },
  projectName: { 'zh-TW': '專案名稱', 'zh-CN': '项目名称', en: 'Project name' },
  create: { 'zh-TW': '建立', 'zh-CN': '创建', en: 'Create' },
  cancel: { 'zh-TW': '取消', 'zh-CN': '取消', en: 'Cancel' },

  // workspace
  compile: { 'zh-TW': '編譯', 'zh-CN': '编译', en: 'Compile' },
  compiling: { 'zh-TW': '編譯中', 'zh-CN': '编译中', en: 'Compiling' },
  compiler: { 'zh-TW': '編譯器', 'zh-CN': '编译器', en: 'Compiler' },
  mainFile: { 'zh-TW': '主檔案', 'zh-CN': '主文档', en: 'Main file' },
  backToProjects: { 'zh-TW': '返回專案列表', 'zh-CN': '返回项目列表', en: 'Back to projects' },
  files: { 'zh-TW': '檔案', 'zh-CN': '文件', en: 'Files' },
  outline: { 'zh-TW': '大綱', 'zh-CN': '大纲', en: 'Outline' },
  citations: { 'zh-TW': '文獻', 'zh-CN': '文献', en: 'Bibliography' },
  issues: { 'zh-TW': '問題', 'zh-CN': '问题', en: 'Issues' },
  output: { 'zh-TW': '日誌', 'zh-CN': '日志', en: 'Log' },
  noIssues: { 'zh-TW': '編譯通過，沒有錯誤 🎉', 'zh-CN': '编译通过，没有错误 🎉', en: 'Compiled without errors 🎉' },
  noOutline: { 'zh-TW': '目前檔案沒有章節標題', 'zh-CN': '当前文件没有章节标题', en: 'No sections in this file' },
  noBib: { 'zh-TW': '專案裡沒有 .bib 檔案', 'zh-CN': '项目里没有 .bib 文件', en: 'No .bib file in this project' },
  pdfPreview: { 'zh-TW': 'PDF 預覽', 'zh-CN': 'PDF 预览', en: 'PDF Preview' },
  fitWidth: { 'zh-TW': '符合寬度', 'zh-CN': '适应宽度', en: 'Fit width' },
  download: { 'zh-TW': '下載', 'zh-CN': '下载', en: 'Download' },
  syncCursor: { 'zh-TW': '從游標定位 PDF', 'zh-CN': '从光标定位 PDF', en: 'Sync cursor → PDF' },
  clean: { 'zh-TW': '清理輔助檔案', 'zh-CN': '清理辅助文件', en: 'Clean aux files' },
  wordCount: { 'zh-TW': '字數', 'zh-CN': '字数', en: 'Words' },
  shortcuts: { 'zh-TW': '快捷鍵', 'zh-CN': '快捷键', en: 'Shortcuts' },
  commandPalette: { 'zh-TW': '命令面板', 'zh-CN': '命令面板', en: 'Command palette' },
  quickOpen: { 'zh-TW': '快速開啟檔案', 'zh-CN': '快速打开文件', en: 'Quick open file' },
  untitled: { 'zh-TW': '未命名', 'zh-CN': '未命名', en: 'Untitled' },

  // new file modal
  newFile: { 'zh-TW': '新增檔案', 'zh-CN': '新建文件', en: 'New file' },
  newFolder: { 'zh-TW': '新增資料夾', 'zh-CN': '新建文件夹', en: 'New folder' },
  upload: { 'zh-TW': '上傳檔案', 'zh-CN': '上传文件', en: 'Upload files' },
  name: { 'zh-TW': '名稱', 'zh-CN': '名称', en: 'Name' },

  // settings
  texPath: { 'zh-TW': 'TeX 安裝路徑（留空自動偵測）', 'zh-CN': 'TeX 安装路径（留空自动检测）', en: 'TeX path (blank = auto-detect)' },
  timeout: { 'zh-TW': '編譯超時（秒）', 'zh-CN': '编译超时（秒）', en: 'Compile timeout (s)' },
  autoCompile: { 'zh-TW': '儲存後自動編譯', 'zh-CN': '保存后自动编译', en: 'Auto-compile on save' },
  autoOpen: { 'zh-TW': '啟動時開啟瀏覽器', 'zh-CN': '启动时打开浏览器', en: 'Open browser on start' },
  theme: { 'zh-TW': '主題', 'zh-CN': '主题', en: 'Theme' },
  language: { 'zh-TW': '語言', 'zh-CN': '语言', en: 'Language' },
  dark: { 'zh-TW': '深色', 'zh-CN': '深色', en: 'Dark' },
  light: { 'zh-TW': '淺色', 'zh-CN': '浅色', en: 'Light' },
  fontSize: { 'zh-TW': '編輯器字號', 'zh-CN': '编辑器字号', en: 'Editor font size' },
  wordWrap: { 'zh-TW': '自動換行', 'zh-CN': '自动换行', en: 'Word wrap' },
  minimap: { 'zh-TW': '顯示縮圖', 'zh-CN': '显示缩略图', en: 'Show minimap' },
  save: { 'zh-TW': '儲存', 'zh-CN': '保存', en: 'Save' },
  saved: { 'zh-TW': '已儲存', 'zh-CN': '已保存', en: 'Saved' },
  reDetect: { 'zh-TW': '重新偵測 TeX', 'zh-CN': '重新检测 TeX', en: 'Re-detect TeX' },

  // states
  noTex: { 'zh-TW': '未偵測到 TeX 發行版', 'zh-CN': '未检测到 TeX 发行版', en: 'No TeX distribution found' },
  noTexHint: {
    'zh-TW': '請安裝 TeX Live 或 MiKTeX 後，在設定中重新偵測。Windows 推薦 TeX Live。', 'zh-CN': '请安装 TeX Live 或 MiKTeX 后，在设置中重新检测。Windows 推荐 TeX Live。',
    en: 'Install TeX Live or MiKTeX, then re-detect in Settings. TeX Live is recommended on Windows.',
  },
  compileFailed: { 'zh-TW': '編譯失敗', 'zh-CN': '编译失败', en: 'Compile failed' },
  compileOk: { 'zh-TW': '編譯成功', 'zh-CN': '编译成功', en: 'Compile success' },
  compileWarn: { 'zh-TW': '編譯完成（有警告/錯誤）', 'zh-CN': '编译完成（有警告/错误）', en: 'Compiled (with warnings/errors)' },
  unsavedDot: { 'zh-TW': '未儲存', 'zh-CN': '未保存', en: 'Unsaved changes' },
  loading: { 'zh-TW': '載入中…', 'zh-CN': '加载中…', en: 'Loading…' },
  compilingPdf: { 'zh-TW': '正在編譯，請稍候…', 'zh-CN': '正在编译，请稍候…', en: 'Compiling, please wait…' },
  noPdf: { 'zh-TW': '按一下「編譯」生成 PDF 預覽', 'zh-CN': '点击「编译」生成 PDF 预览', en: 'Hit “Compile” to generate the PDF preview' },
  rootlessTitle: { 'zh-TW': '示例：', 'zh-CN': '示例：', en: 'Example: ' },

  // commands
  cmdToggleSidebar: { 'zh-TW': '切換側邊欄', 'zh-CN': '切换侧边栏', en: 'Toggle sidebar' },
  cmdTogglePreview: { 'zh-TW': '切換 PDF 預覽', 'zh-CN': '切换 PDF 预览', en: 'Toggle PDF preview' },
  cmdToggleTheme: { 'zh-TW': '切換深色/淺色主題', 'zh-CN': '切换深色/浅色主题', en: 'Toggle dark/light theme' },
  cmdToggleLang: { 'zh-TW': '切換中文/English', 'zh-CN': '切换中文/English', en: 'Toggle 中文/English' },
  cmdSaveAll: { 'zh-TW': '儲存全部檔案', 'zh-CN': '保存全部文件', en: 'Save all files' },
  cmdGoHome: { 'zh-TW': '返回專案列表', 'zh-CN': '返回项目列表', en: 'Go to project list' },
  cmdCompile: { 'zh-TW': '編譯專案', 'zh-CN': '编译项目', en: 'Compile project' },
  cmdNewFile: { 'zh-TW': '新增檔案', 'zh-CN': '新建文件', en: 'New file' },
  cmdExportZip: { 'zh-TW': '匯出專案 ZIP', 'zh-CN': '导出项目 ZIP', en: 'Export project as ZIP' },
  cmdDownloadPdf: { 'zh-TW': '下載 PDF', 'zh-CN': '下载 PDF', en: 'Download PDF' },
  cmdClean: { 'zh-TW': '清理輔助檔案', 'zh-CN': '清理辅助文件', en: 'Clean auxiliary files' },
  cmdSettings: { 'zh-TW': '開啟設定', 'zh-CN': '打开设置', en: 'Open settings' },
  cmdShortcuts: { 'zh-TW': '查看快捷鍵', 'zh-CN': '查看快捷键', en: 'Show shortcuts' },

  // pdf viewer extras
  thumbnails: { 'zh-TW': '縮圖', 'zh-CN': '缩略图', en: 'Thumbnails' },
  search: { 'zh-TW': '在 PDF 中搜尋', 'zh-CN': '在 PDF 中搜索', en: 'Search in PDF' },
  findPlaceholder: { 'zh-TW': '在 PDF 中尋找…（Enter 下一個）', 'zh-CN': '在 PDF 中查找…（Enter 下一个）', en: 'Find in PDF… (Enter for next)' },
  noMatches: { 'zh-TW': '找不到相符結果', 'zh-CN': '无匹配', en: 'No matches' },
  pagesUnit: { 'zh-TW': '頁', 'zh-CN': '页', en: 'pages' },
  fitPage: { 'zh-TW': '符合頁面', 'zh-CN': '适应页面', en: 'Fit page' },

  // statistics
  statsTitle: { 'zh-TW': '專案統計', 'zh-CN': '项目统计', en: 'Project statistics' },
  cmdStats: { 'zh-TW': '查看專案統計', 'zh-CN': '查看项目统计', en: 'Show project statistics' },

  // editor context menu & find/replace
  cut: { 'zh-TW': '剪下', 'zh-CN': '剪切', en: 'Cut' },
  copy: { 'zh-TW': '複製', 'zh-CN': '复制', en: 'Copy' },
  paste: { 'zh-TW': '貼上', 'zh-CN': '粘贴', en: 'Paste' },
  selectAll: { 'zh-TW': '全選', 'zh-CN': '全选', en: 'Select all' },
  find: { 'zh-TW': '尋找', 'zh-CN': '查找', en: 'Find' },
  replace: { 'zh-TW': '替換', 'zh-CN': '替换', en: 'Replace' },
  replaceWith: { 'zh-TW': '替換為', 'zh-CN': '替换为', en: 'Replace with' },
  replaceThis: { 'zh-TW': '替換', 'zh-CN': '替换', en: 'Replace' },
  replaceAll: { 'zh-TW': '全部替換', 'zh-CN': '全部替换', en: 'Replace all' },
  prevMatch: { 'zh-TW': '上一個', 'zh-CN': '上一个', en: 'Previous' },
  nextMatch: { 'zh-TW': '下一個', 'zh-CN': '下一个', en: 'Next' },
  caseSensitive: { 'zh-TW': '區分大小寫', 'zh-CN': '区分大小写', en: 'Match case' },
  closeUnsaved: { 'zh-TW': '關閉未儲存的分頁', 'zh-CN': '关闭未保存的标签页', en: 'Close unsaved tab' },
  confirmDelete: { 'zh-TW': '確認刪除', 'zh-CN': '确认删除', en: 'Confirm delete' },
  confirmDeleteMsg: { 'zh-TW': '確定要刪除嗎？此操作無法復原。', 'zh-CN': '确定要删除吗？此操作不可恢复。', en: 'Delete this item? This cannot be undone.' },
  create: { 'zh-TW': '建立', 'zh-CN': '创建', en: 'Create' },
  saveAsTemplate: { 'zh-TW': '存為我的模板', 'zh-CN': '存为我的模板', en: 'Save as my template' },
  myTemplates: { 'zh-TW': '我的模板', 'zh-CN': '我的模板', en: 'My templates' },
};

export function makeT(lang) {
  return (key) => {
    const entry = dict[key];
    if (!entry) return key;
    return entry[lang] ?? entry['zh-TW'];
  };
}

export function detectLang() {
  const saved = localStorage.getItem('csleaf.lang');
  if (saved) {
    try {
      const lang = JSON.parse(saved);
      return lang === 'zh' ? 'zh-CN' : lang;
    } catch {
      return saved === 'zh' ? 'zh-CN' : saved;
    }
  }
  const browserLang = navigator.language?.toLowerCase();
  if (browserLang?.startsWith('zh-tw') || browserLang?.startsWith('zh-hk') || browserLang?.startsWith('zh-hant')) return 'zh-TW';
  return browserLang?.startsWith('zh') ? 'zh-CN' : 'en';
}
