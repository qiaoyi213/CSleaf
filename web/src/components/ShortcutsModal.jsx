import React from 'react';
import { useStore } from '../lib/store';

export default function ShortcutsModal() {
  const t = useStore(s => s.t);
  const lang = useStore(s => s.lang);
  const closeModal = useStore(s => s.closeModal);

  const rows = [
    ['Ctrl + Enter', lang === 'zh-TW' ? '編譯專案' : lang === 'zh-CN' ? '编译项目' : 'Compile project'],
    ['Ctrl + S', lang === 'zh-TW' ? '儲存（預設自動儲存）' : lang === 'zh-CN' ? '保存（默认自动保存）' : 'Save (autosave is on)'],
    ['Ctrl + P', lang === 'zh-TW' ? '快速開啟檔案' : lang === 'zh-CN' ? '快速打开文件' : 'Quick open file'],
    ['Ctrl + Shift + P', lang === 'zh-TW' ? '命令面板' : lang === 'zh-CN' ? '命令面板' : 'Command palette'],
    ['Ctrl + B', lang === 'zh-TW' ? '顯示/隱藏側邊欄' : lang === 'zh-CN' ? '显示/隐藏侧边栏' : 'Toggle sidebar'],
    ['Ctrl + Shift + E', lang === 'zh-TW' ? '顯示/隱藏 PDF 預覽' : lang === 'zh-CN' ? '显示/隐藏 PDF 预览' : 'Toggle PDF preview'],
    ['Ctrl + J', lang === 'zh-TW' ? '顯示/隱藏日誌面板' : lang === 'zh-CN' ? '显示/隐藏日志面板' : 'Toggle log panel'],
    ['Alt + S', lang === 'zh-TW' ? 'SyncTeX：游標 → PDF 定位' : lang === 'zh-CN' ? 'SyncTeX：光标 → PDF 定位' : 'SyncTeX: cursor → PDF'],
    [lang === 'zh-TW' ? '按兩下 PDF' : lang === 'zh-CN' ? '双击 PDF' : 'Double-click PDF', lang === 'zh-TW' ? 'SyncTeX：PDF → 原始碼' : lang === 'zh-CN' ? 'SyncTeX：PDF → 源码' : 'SyncTeX: PDF → source'],
    ['Ctrl + 滾輪', lang === 'zh-TW' ? '（瀏覽器縮放）' : lang === 'zh-CN' ? '（浏览器缩放）' : '(browser zoom)'],
  ];

  return (
    <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal narrow">
        <div className="modal-head"><h3>{t('shortcuts')}</h3></div>
        <div className="modal-body">
          <div className="shortcuts-grid">
            {rows.map(([k, d]) => (
              <div key={k} className="shortcut-row">
                <span style={{ color: 'var(--text1)' }}>{d}</span>
                <span className="keys"><kbd>{k}</kbd></span>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn primary" onClick={closeModal}>OK</button>
        </div>
      </div>
    </div>
  );
}
