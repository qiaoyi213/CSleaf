import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { api } from '../lib/api';
import { useStore } from '../lib/store';
import { cover } from './HomePage.jsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const COMPILER_HINTS = {
  latexmk: { 'zh-TW': '自動多輪編譯 + 參考文獻', 'zh-CN': '自动多轮编译 + 参考文献', en: 'auto reruns + BibTeX' },
  pdflatex: { 'zh-TW': '經典引擎 · 純英文', 'zh-CN': '经典引擎 · 纯英文', en: 'classic · English-only' },
  xelatex: { 'zh-TW': '中文論文（系統字體）', 'zh-CN': '中文论文（系统字体）', en: 'Chinese docs (system fonts)' },
  lualatex: { 'zh-TW': '新一代引擎', 'zh-CN': '新一代引擎', en: 'modern engine' },
};

const TAGS_EN = {
  '中文': 'Chinese', '英文': 'English', '論文': 'Paper', '期刊': 'Journal',
  '簡報': 'Slides', '演示': 'Slides', '學位論文': 'Thesis', '課程': 'Coursework', '科研': 'Research',
  '投稿': 'Submission', '海報': 'Poster', '履歷': 'CV', '數學': 'Mathematics',
};

/** Template detail dialog: live preview (server-compiled), description, source. */
export default function TemplateDetailModal({ id, onClose, onUse }) {
  const t = useStore(s => s.t);
  const lang = useStore(s => s.lang);
  const [detail, setDetail] = useState(null);
  const [tab, setTab] = useState('preview'); // preview | source
  const [source, setSource] = useState(null);
  const [sourcePath, setSourcePath] = useState('main.tex');
  const [previewPages, setPreviewPages] = useState(null); // [dataURL]
  const [previewErr, setPreviewErr] = useState(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    api.templateDetail(id).then(setDetail).catch(() => setPreviewErr('failed'));
    return () => { cancelRef.current = true; };
  }, [id]);

  useEffect(() => {
    if (!detail || tab !== 'preview') return;
    let cancelled = false;
    setPreviewPages(null);
    setPreviewErr(null);
    (async () => {
      try {
        const res = await fetch(api.templatePreviewUrl(id));
        if (!res.ok) throw new Error(await res.json().then(j => j.error).catch(() => 'preview failed'));
        const data = await res.arrayBuffer();
        if (cancelled) return;
        const doc = await pdfjsLib.getDocument({ data }).promise;
        const pages = [];
        const n = Math.min(doc.numPages, 3);
        for (let p = 1; p <= n; p++) {
          if (cancelled) return;
          const page = await doc.getPage(p);
          const vp = page.getViewport({ scale: 1 });
          const scale = 460 / vp.width;
          const viewport = page.getViewport({ scale: scale * 2 });
          const css = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width; canvas.height = viewport.height;
          canvas.style.width = css.width + 'px'; canvas.style.height = css.height + 'px';
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
          pages.push(canvas.toDataURL('image/jpeg', 0.82));
        }
        if (!cancelled) setPreviewPages(pages);
      } catch (e) {
        if (!cancelled) setPreviewErr(e.message || 'preview failed');
      }
    })();
    return () => { cancelled = true; };
  }, [detail, tab, id]);

  useEffect(() => {
    if (tab !== 'source' || !detail || source) return;
    loadSource('main.tex');
  }, [tab, detail]);

  async function loadSource(p) {
    setSourcePath(p);
    setSource(null);
    try {
      const d = await api.templateFile(id, p);
      setSource(d.content);
    } catch { setSource('// failed to load'); }
  }

  if (!detail) {
    return (
      <div className="modal-overlay" onMouseDown={onClose}>
        <div className="modal narrow"><div className="modal-body"><div className="log-empty">…</div></div></div>
      </div>
    );
  }

  const cs = cover(detail.id);
  const name = lang === 'zh-TW' ? detail.name : lang === 'zh-CN' ? (detail.nameZhCN || detail.name) : (detail.nameEn || detail.name);
  const desc = lang === 'zh-TW' ? (detail.longDesc || detail.desc) : lang === 'zh-CN' ? (detail.longDescZhCN || detail.descZhCN || detail.desc) : (detail.descEn || detail.nameEn || detail.name);
  const hint = COMPILER_HINTS[detail.compiler]?.[lang] || detail.compiler;

  return (
    <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal tpl-detail-modal" onMouseDown={e => e.stopPropagation()}>
        <div className="tpl-detail-head">
          <div className="cover" style={{ background: cs.g, width: 46, height: 46, borderRadius: 12 }}>{cs.letter}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="tpl-detail-name">{name}</div>
            <div className="tpl-detail-tags">
              {(lang === 'zh-CN' ? (detail.tagsZhCN || detail.tags) : detail.tags || []).map(tag => <span key={tag} className="badge">{lang === 'en' ? (TAGS_EN[tag] || tag) : tag}</span>)}
              <span className="badge green" title={hint}>{detail.compiler}</span>
              {detail.custom && <span className="badge yellow">{lang === 'en' ? 'My templates' : '我的模板'}</span>}
            </div>
          </div>
          <button className="btn primary" onClick={() => onUse(detail)}>{lang === 'zh-TW' ? '使用此模板' : lang === 'zh-CN' ? '使用此模板' : 'Use this template'}</button>
        </div>

        <div className="tpl-detail-tabs">
          <button className={`home-tab ${tab === 'preview' ? 'active' : ''}`} style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => setTab('preview')}>
            {lang === 'zh-TW' ? '編譯預覽' : lang === 'zh-CN' ? '编译预览' : 'Preview'}
          </button>
          <button className={`home-tab ${tab === 'source' ? 'active' : ''}`} style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => setTab('source')}>
            {lang === 'zh-TW' ? '原始碼' : lang === 'zh-CN' ? '源代码' : 'Source'}
          </button>
        </div>

        <div className="tpl-detail-body">
          {tab === 'preview' && (
            <>
              <p className="tpl-detail-desc">{desc}</p>
              {previewErr ? (
                <div className="log-empty">{lang === 'zh-TW' ? `預覽生成失敗：${previewErr}` : lang === 'zh-CN' ? `预览生成失败：${previewErr}` : `Preview failed: ${previewErr}`}</div>
              ) : previewPages ? (
                <div className="tpl-preview-row">
                  {previewPages.map((src, i) => <img key={i} src={src} alt={`page ${i + 1}`} />)}
                </div>
              ) : (
                <div className="tpl-preview-loading pulse">
                  {lang === 'zh-TW' ? '正在真實編譯模板生成預覽…（首次約 3-8 秒，之後秒開）' : lang === 'zh-CN' ? '正在真实编译模板生成预览…（首次约 3-8 秒，之后秒开）' : 'Compiling the template for a live preview… (first time takes a few seconds)'}
                </div>
              )}
              <div className="tpl-files">
                <div className="tpl-files-title">{lang === 'zh-TW' ? '包含檔案' : lang === 'zh-CN' ? '包含文件' : 'Included files'}</div>
                {(detail.files || []).map(f => (
                  <button key={f.path} className={`tpl-file ${f.path === sourcePath ? 'active' : ''}`} onClick={() => { setTab('source'); loadSource(f.path); }}>
                    {f.path}{f.size > 1024 ? ` · ${(f.size / 1024).toFixed(1)} KB` : ''}
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === 'source' && (
            <div className="tpl-source">
              <div className="tpl-files" style={{ marginBottom: 10 }}>
                {(detail.files || []).map(f => (
                  <button key={f.path} className={`tpl-file ${f.path === sourcePath ? 'active' : ''}`} onClick={() => loadSource(f.path)}>{f.path}</button>
                ))}
              </div>
              {source == null ? <div className="log-empty">…</div> : (
                <pre className="tpl-source-code">{source}</pre>
              )}
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button className="btn" onClick={onClose}>{lang === 'zh-TW' ? '關閉' : lang === 'zh-CN' ? '关闭' : 'Close'}</button>
          <button className="btn primary" onClick={() => onUse(detail)}>{lang === 'zh-TW' ? '使用此模板建立專案' : lang === 'zh-CN' ? '使用此模板创建项目' : 'Create with this template'}</button>
        </div>
      </div>
    </div>
  );
}
