import React from 'react';
import { useStore } from '../lib/store';
import { LangIcon } from './Icons.jsx';

export default function LanguageSelect() {
  const lang = useStore(s => s.lang);
  const setLang = useStore(s => s.setLang);
  const t = useStore(s => s.t);

  return (
    <span className="icon-btn language-select" title={t('language')}>
      <LangIcon />
      <select aria-label={t('language')} value={lang} onChange={e => setLang(e.target.value)}>
        <option value="zh-TW">繁體中文</option>
        <option value="zh-CN">简体中文</option>
        <option value="en">English</option>
      </select>
    </span>
  );
}
