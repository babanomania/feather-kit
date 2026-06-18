import { useState } from "react";
import { Nav, Footer } from "../chrome.jsx";
import { ThemePicker, useThemeControl } from "../theme-control.jsx";
import { CATEGORIES } from "../patterns-data.jsx";

function Block({ block }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard.writeText(block.code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => {});
  return (
    <div className="block">
      <div className="block-bar">
        <span className="block-name">{block.name}</span>
        <div className="block-actions">
          <button onClick={() => setShow((s) => !s)}>{show ? "Hide code" : "Show code"}</button>
          <button className="primary" onClick={copy}>{copied ? "Copied!" : "Copy code"}</button>
        </div>
      </div>
      <div className="block-preview">{block.render()}</div>
      {show && <pre className="block-code">{block.code}</pre>}
    </div>
  );
}

export default function Patterns({ cat }) {
  const category = CATEGORIES.find((c) => c.slug === cat) || CATEGORIES[0];
  const total = CATEGORIES.reduce((n, c) => n + c.blocks.length, 0);
  const [theme, setTheme] = useThemeControl();
  return (
    <>
      <Nav active="patterns" extra={<ThemePicker value={theme} onChange={setTheme} />} />
      <main className="patterns">
        <div className="wrap wide-wrap">
          <div className="cz-head" style={{ marginBottom: 18 }}>
            <p className="eyebrow"><b>·</b> Patterns</p>
            <h1 className="hero-h" style={{ fontSize: "clamp(30px,5vw,46px)" }}>Copy-paste <span className="n">UX patterns</span>.</h1>
            <p className="lede" style={{ fontSize: "clamp(16px,2vw,19px)", marginBottom: 0 }}>{total} ready-made blocks for the things every app needs — stats, tables, forms, pricing, empty states. Built from feather-ui-kit components; preview them live and copy the code.</p>
          </div>

          <div className="pat-layout">
            <aside className="pat-side">
              {CATEGORIES.map((c) => (
                <a key={c.slug} href={`#/patterns/${c.slug}`} className={c.slug === category.slug ? "active" : ""}>
                  {c.name}<span className="count">{c.blocks.length}</span>
                </a>
              ))}
            </aside>

            <div className="pat-main">
              <div className="pat-cat-head">
                <h2>{category.name}</h2>
                <p>{category.desc}</p>
              </div>
              <div className="pat-blocks">
                {category.blocks.map((b) => <Block key={b.name} block={b} />)}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
