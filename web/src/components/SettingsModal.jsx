import React, { useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import { api } from '../lib/api';
import { CheckIcon, AlertIcon, RefreshIcon, CopyIcon } from './Icons.jsx';

const TABS = [
  ['compile', { 'zh-TW': '編譯', 'zh-CN': '编译', en: 'Compile' }],
  ['editor', { 'zh-TW': '編輯器', 'zh-CN': '编辑器', en: 'Editor' }],
  ['appearance', { 'zh-TW': '外觀', 'zh-CN': '外观', en: 'Appearance' }],
  ['about', { 'zh-TW': '關於', 'zh-CN': '关于', en: 'About' }],
];

export default function SettingsModal() {
  const t = useStore(s => s.t);
  const lang = useStore(s => s.lang);
  const closeModal = useStore(s => s.closeModal);
  const theme = useStore(s => s.theme);
  const setTheme = useStore(s => s.setTheme);
  const setLang = useStore(s => s.setLang);
  const editorPrefs = useStore(s => s.editor);
  const setEditorPref = useStore(s => s.setEditorPref);
  const toast = useStore(s => s.toast);

  const [tab, setTab] = useState('compile');
  const [server, setServer] = useState(null);
  const [texInfo, setTexInfo] = useState(useStore.getState().texInfo);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const L = (o) => o[lang] ?? o['zh-TW'];

  useEffect(() => {
    api.getSettings().then(setServer);
    setTexInfo(useStore.getState().texInfo);
  }, []);

  async function save() {
    try {
      const saved = await api.saveSettings({
        texPath: server.texPath,
        timeoutMs: Number(server.timeoutMs) * 1000,
        autoCompile: server.autoCompile,
        autoOpenBrowser: server.autoOpenBrowser,
      });
      useStore.setState({ serverSettings: saved });
    } catch (e) { toast(e.message, 'error'); }
  }

  async function redetect() {
    await save();
    const info = await api.texInfo(true);
    setTexInfo(info);
    useStore.setState({ texInfo: info });
  }

  function copyDiagnostics() {
    const diag = {
      version: '1.1.0',
      platform: navigator.userAgent,
      tex: texInfo ? { available: texInfo.available, distro: texInfo.distro, version: texInfo.version, engines: texInfo.engines } : null,
      settings: server,
      language: lang,
      theme,
    };
    navigator.clipboard.writeText(JSON.stringify(diag, null, 2)).then(
      () => toast(lang === 'zh-TW' ? '診斷資訊已複製' : lang === 'zh-CN' ? '诊断信息已复制' : 'Diagnostics copied', 'success'),
      () => toast('clipboard failed', 'error'),
    );
  }

  if (!server) return null;

  return (
    <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal settings-modal">
        <div className="settings-layout">
          <aside className="settings-nav">
            <div className="settings-nav-title">CSleaf · {L({ 'zh-TW': '設定', 'zh-CN': '设置', en: 'Settings' })}</div>
            {TABS.map(([id, label]) => (
              <button key={id} className={`settings-nav-item ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
                {L(label)}
              </button>
            ))}
          </aside>

          <div className="settings-content">
            {tab === 'compile' && (
              <>
                {/* TeX detection card */}
                <div className={`tex-card ${texInfo?.available ? 'ok' : 'bad'}`}>
                  <div className="tex-card-head">
                    {texInfo?.available
                      ? <><CheckIcon width={16} height={16} /><b>{texInfo.distro}</b><span className="tex-ver">{texInfo.version}</span></>
                      : <><AlertIcon width={16} height={16} /><b>{t('noTex')}</b></>}
                    <button className="btn small" style={{ marginLeft: 'auto' }} onClick={redetect}>
                      <RefreshIcon width={12} height={12} /> {t('reDetect')}
                    </button>
                  </div>
                  {texInfo?.available ? (
                    <div className="tex-card-body">
                      <div className="tex-engines">
                        {['pdflatex', 'xelatex', 'lualatex', 'latexmk', 'bibtex', 'synctex'].map(e => (
                          <span key={e} className={`badge ${texInfo.engines?.[e] ? 'green' : ''}`}>
                            {texInfo.engines?.[e] ? '✓' : '✕'} {e}
                          </span>
                        ))}
                      </div>
                      <div className="tex-path" title={texInfo.binDir}>{texInfo.binDir}</div>
                    </div>
                  ) : (
                    <div className="tex-card-body">
                      <div className="tex-guide">
                        <div>{L({ 'zh-TW': '三步讓 CSleaf 跑起來：', 'zh-CN': '三步让 CSleaf 跑起来：', en: 'Three steps to get running:' })}</div>
                        <ol>
                          <li dangerouslySetInnerHTML={{ __html: L({
                            'zh-TW': '下載並安裝 <a href="https://tug.org/texlive/" target="_blank" rel="noreferrer">TeX Live</a>（Windows 推薦，選全量安裝）', 'zh-CN': '下载并安装 <a href="https://tug.org/texlive/" target="_blank" rel="noreferrer">TeX Live</a>（Windows 推荐，选全量安装）',
                            en: 'Install <a href="https://tug.org/texlive/" target="_blank" rel="noreferrer">TeX Live</a> (recommended on Windows)',
                          }) }} />
                          <li>{L({ 'zh-TW': '安裝完成後點上方「重新偵測 TeX」', 'zh-CN': '安装完成后点上方「重新检测 TeX」', en: 'Click "Re-detect TeX" above after installation' })}</li>
                          <li>{L({ 'zh-TW': '回到專案按 Ctrl+Enter 編譯', 'zh-CN': '回到项目按 Ctrl+Enter 编译', en: 'Compile with Ctrl+Enter' })}</li>
                        </ol>
                        <div className="tex-guide-alt">
                          {L({ 'zh-TW': '也可以裝輕量的', 'zh-CN': '也可以装轻量的', en: 'Or install lightweight' })} <a href="https://yihui.org/tinytex/" target="_blank" rel="noreferrer">TinyTeX</a>
                          {L({ 'zh-TW': '（約 300MB）。已裝在非系統磁碟？在下方手動指定路徑即可。', 'zh-CN': '（约 300MB）。已装在非系统盘？在下方手动指定路径即可。', en: ' (~300MB). Custom install location? Set the path below.' })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* compiler picker with beginner guidance */}
                <div className="form-row">
                  <label>{t('compiler')} — {L({ 'zh-TW': '不知道怎麼選？', 'zh-CN': '不知道怎么选？', en: 'Not sure which one?' })}</label>
                  <div className="compiler-cards">
                    {COMPILER_INFO.map(c => (
                      <button key={c.id}
                        className={`compiler-card ${server.compiler === c.id ? 'selected' : ''}`}
                        onClick={() => setServer({ ...server, compiler: c.id })}>
                        <div className="cc-head">
                          <span className="cc-name">{c.id}</span>
                          {c.rec && <span className="badge green">{L({ 'zh-TW': '推薦', 'zh-CN': '推荐', en: 'Recommended' })}</span>}
                          {c.chinese && <span className="badge yellow">{L({ 'zh-TW': '中文論文', 'zh-CN': '中文论文', en: 'Chinese' })}</span>}
                        </div>
                        <div className="cc-desc">{L(c.desc)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <label>{t('timeout')}</label>
                  <input type="number" min={10} max={600} value={Math.round(server.timeoutMs / 1000)}
                    onChange={e => setServer({ ...server, timeoutMs: Number(e.target.value) * 1000 })} style={{ width: 130 }} />
                </div>

                <CheckRow label={t('autoCompile')} checked={server.autoCompile} onChange={v => setServer({ ...server, autoCompile: v })} />
                <CheckRow label={t('autoOpen')} checked={server.autoOpenBrowser} onChange={v => setServer({ ...server, autoOpenBrowser: v })} />

                <div className="adv-toggle" onClick={() => setShowAdvanced(v => !v)}>
                  {L({ 'zh-TW': '高級選項', 'zh-CN': '高级选项', en: 'Advanced' })} <span style={{ transform: showAdvanced ? 'rotate(90deg)' : 'none', transition: 'transform .16s', display: 'inline-flex' }}>▸</span>
                </div>
                {showAdvanced && (
                  <div className="form-row">
                    <label>{t('texPath')}</label>
                    <input value={server.texPath || ''} onChange={e => setServer({ ...server, texPath: e.target.value })}
                      placeholder="e.g. E:\texlive\2026\bin\windows" spellCheck={false} />
                  </div>
                )}
              </>
            )}

            {tab === 'editor' && (
              <>
                <div className="form-row">
                  <label>{t('fontSize')}: {editorPrefs.fontSize}px</label>
                  <input type="range" min={11} max={22} value={editorPrefs.fontSize}
                    onChange={e => setEditorPref({ fontSize: Number(e.target.value) })} style={{ width: 220 }} />
                </div>
                <CheckRow label={t('wordWrap')} checked={editorPrefs.wordWrap} onChange={v => setEditorPref({ wordWrap: v })} />
                <CheckRow label={t('minimap')} checked={editorPrefs.minimap} onChange={v => setEditorPref({ minimap: v })} />
                <div className="settings-hint">
                  {L({ 'zh-TW': '提示：Ctrl+F 尋找、Ctrl+H 替換、右鍵選單裡有更多操作。', 'zh-CN': '提示：Ctrl+F 查找、Ctrl+H 替换、右键菜单里有更多操作。', en: 'Tip: Ctrl+F find, Ctrl+H replace, right-click for more actions.' })}
                </div>
              </>
            )}

            {tab === 'appearance' && (
              <>
                <div className="form-row">
                  <label>{t('theme')}</label>
                  <div className="theme-cards">
                    <button className={`theme-card ${theme === 'dark' ? 'selected' : ''}`} onClick={() => setTheme('dark')}>
                      <div className="theme-preview dark-p"><span /><span /><span /></div>
                      <span>{t('dark')}</span>
                    </button>
                    <button className={`theme-card ${theme === 'light' ? 'selected' : ''}`} onClick={() => setTheme('light')}>
                      <div className="theme-preview light-p"><span /><span /><span /></div>
                      <span>{t('light')}</span>
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <label>{t('language')}</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className={`btn ${lang === 'zh-CN' ? 'primary' : ''}`} onClick={() => setLang('zh-CN')}>简体中文</button>
                    <button className={`btn ${lang === 'zh-TW' ? 'primary' : ''}`} onClick={() => setLang('zh-TW')}>繁體中文</button>
                    <button className={`btn ${lang === 'en' ? 'primary' : ''}`} onClick={() => setLang('en')}>English</button>
                  </div>
                </div>
              </>
            )}

            {tab === 'about' && (
              <div className="about-box">
                <img src="/leaf.svg" width="54" height="54" alt="" style={{ borderRadius: 14 }} />
                <div className="about-name">CS<b>leaf</b> <span className="badge">v1.1.0</span></div>
                <div className="about-desc">{t('tagline')}</div>
                <div className="about-links">
                  <a className="btn" href="https://github.com/Jensen-Yao/CSleaf" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="btn" href="https://github.com/Jensen-Yao/CSleaf/issues" target="_blank" rel="noreferrer">{L({ 'zh-TW': '問題反饋', 'zh-CN': '问题反馈', en: 'Report an issue' })}</a>
                  <button className="btn" onClick={copyDiagnostics}><CopyIcon width={13} height={13} /> {L({ 'zh-TW': '複製診斷資訊', 'zh-CN': '复制诊断信息', en: 'Copy diagnostics' })}</button>
                </div>
                <div className="about-license">MIT License · © 2026 Jensen-Yao · {L({ 'zh-TW': '靈感源自', 'zh-CN': '灵感源自', en: 'Inspired by' })} Overleaf / LaTeX Workshop / Monaco / PDF.js</div>
              </div>
            )}
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn" onClick={closeModal}>{L({ 'zh-TW': '關閉', 'zh-CN': '关闭', en: 'Close' })}</button>
          {tab !== 'about' && <button className="btn primary" onClick={() => { save(); toast(t('saved'), 'success'); }}>{t('save')}</button>}
        </div>
      </div>
    </div>
  );
}

const COMPILER_INFO = [
  {
    id: 'latexmk', rec: true,
    desc: { 'zh-TW': '推薦：自動多次編譯、自動處理參考文獻（BibTeX），除非你清楚自己在選甚麼，選它就對了', 'zh-CN': '推荐：自动多次编译、自动处理参考文献（BibTeX），除非你清楚自己在选什么，选它就对了', en: 'Recommended: auto-reruns and handles BibTeX for you. Pick this unless you know otherwise' },
  },
  {
    id: 'pdflatex',
    desc: { 'zh-TW': '最經典的引擎，純英文檔案夠用；交叉引用需要手動多編譯幾次', 'zh-CN': '最经典的引擎，纯英文文档够用；交叉引用需要手动多编译几次', en: 'The classic engine, fine for English-only docs; rerun manually for cross-references' },
  },
  {
    id: 'xelatex', chinese: true,
    desc: { 'zh-TW': '寫中文論文選這個（中文模板預設使用），直接使用系統字體', 'zh-CN': '写中文论文选这个（中文模板默认使用），直接使用系统字体', en: 'Choose this for Chinese documents (default for Chinese templates), uses system fonts' },
  },
  {
    id: 'lualatex',
    desc: { 'zh-TW': '新一代引擎，兼容大多數現代宏包，速度稍慢', 'zh-CN': '新一代引擎，兼容大多数现代宏包，速度稍慢', en: 'The modern engine, supports most current packages, slightly slower' },
  },
];

function CheckRow({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontSize: 13 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ width: 15, height: 15, accentColor: 'var(--accent)', padding: 0 }} />
      {label}
    </label>
  );
}
