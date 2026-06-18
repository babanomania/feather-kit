import { useState, useEffect } from "react";
import { THEMES, themeVars } from "./theme-presets.js";

// Shared theme state: persisted to localStorage so the chosen theme follows the
// user across Components / Patterns / Templates, applied to :root (so previews
// AND portaled dialog/toast theme), and reverted when the page unmounts.
export function useThemeControl() {
  const [index, setIndex] = useState(() => {
    try { const v = +localStorage.getItem("fk-theme"); return Number.isInteger(v) && v >= 0 && v < THEMES.length ? v : 0; }
    catch { return 0; }
  });
  useEffect(() => {
    try { localStorage.setItem("fk-theme", String(index)); } catch { /* ignore */ }
    const root = document.documentElement;
    const vars = themeVars(THEMES[index]);
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [index]);
  return [index, setIndex];
}

const Dots = ({ t }) => (
  <span className="tp-dots">
    <i style={{ background: t.accent }} />
    <i style={{ background: t.ink }} />
    <i style={{ background: t.bgSubtle, boxShadow: `inset 0 0 0 1px ${t.border}` }} />
  </span>
);

export function ThemePicker({ value, onChange }) {
  const t = THEMES[value];
  return (
    <>
      <button className="tp-btn" popoverTarget="fkThemeMenu" aria-label="Choose theme">
        <Dots t={t} />
        <span className="tp-name">{t.name}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      <div className="tp-menu" popover="auto" id="fkThemeMenu">
        <div className="tp-grid">
          {THEMES.map((th, i) => (
            <button key={th.name} className={"tp-item" + (i === value ? " active" : "")}
              onClick={(e) => { onChange(i); e.currentTarget.closest("[popover]")?.hidePopover?.(); }}>
              <span className="d"><i style={{ background: th.accent }} /><i style={{ background: th.ink }} /><i style={{ background: th.bgSubtle, boxShadow: `inset 0 0 0 1px ${th.border}` }} /></span>
              <span>{th.name}</span>
            </button>
          ))}
        </div>
        <div className="tp-foot"><a href="#/customizer">Open full customizer <span>→</span></a></div>
      </div>
    </>
  );
}
