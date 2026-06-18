import { useState, useEffect } from "react";
import { Select, Checkbox, Input, Slider, Table, Badge } from "feather-ui-kit";
import { Nav, Footer } from "../chrome.jsx";
import { ThemePicker, useThemeControl } from "../theme-control.jsx";
import { DOCS, FLAT } from "../docs-data.jsx";

function Control({ ctrl, value, onChange }) {
  if (ctrl.type === "enum") {
    return (
      <div className="feather-field">
        <label className="feather-label">{ctrl.label}</label>
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {ctrl.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </Select>
      </div>
    );
  }
  if (ctrl.type === "boolean") {
    return <Checkbox label={ctrl.label} checked={!!value} onChange={(e) => onChange(e.target.checked)} />;
  }
  if (ctrl.type === "range") {
    return <Slider label={ctrl.label} min={ctrl.min} max={ctrl.max} value={value} showValue onChange={(e) => onChange(+e.target.value)} />;
  }
  return <Input label={ctrl.label} value={value} onChange={(e) => onChange(e.target.value)} />;
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="doc-code">
      <button className="doc-code-copy" onClick={() => navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }).catch(() => {})}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre>{code}</pre>
    </div>
  );
}

function Playground({ comp }) {
  const [props, setProps] = useState(comp.defaults);
  useEffect(() => { setProps(comp.defaults); }, [comp]);
  const set = (k, v) => setProps((p) => ({ ...p, [k]: v }));
  const controls = comp.controls || [];
  return (
    <div className="doc-pg">
      <div className="doc-pg-preview">{comp.render(props, set)}</div>
      {controls.length > 0 && (
        <div className="doc-pg-controls">
          {controls.map((c) => <Control key={c.key} ctrl={c} value={props[c.key]} onChange={(v) => set(c.key, v)} />)}
        </div>
      )}
      <CodeBlock code={comp.code(props)} />
    </div>
  );
}

function PropsTable({ rows }) {
  return (
    <Table>
      <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td><code className="doc-prop">{r.name}</code></td>
            <td><code className="doc-type">{r.type}</code></td>
            <td><span className="doc-default">{r.def}</span></td>
            <td className="doc-prop-desc">{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function Docs({ slug }) {
  const comp = FLAT.find((c) => c.slug === slug) || FLAT[0];
  const [theme, setTheme] = useThemeControl();
  return (
    <>
      <Nav active="components" extra={<ThemePicker value={theme} onChange={setTheme} />} />
      <main className="docs">
        <div className="wrap wide-wrap docs-layout">
          <aside className="docs-side">
            <a className="docs-side-home" href="#/">← Overview</a>
            {DOCS.map((g) => (
              <div className="docs-side-block" key={g.group}>
                <div className="docs-side-group">{g.group}</div>
                {g.items.map((it) => (
                  <a key={it.slug} href={`#/components/${it.slug}`} className={it.slug === comp.slug ? "active" : ""}>{it.name}</a>
                ))}
              </div>
            ))}
          </aside>

          <article className="docs-main">
            <div className="docs-head">
              <h1>{comp.name}</h1>
              {comp.zeroJs && <Badge variant="soft" dot>zero JS</Badge>}
            </div>
            <p className="docs-desc">{comp.desc}</p>
            <pre className="docs-import">{comp.import}</pre>

            <h2 className="docs-h2">Playground</h2>
            <p className="docs-sub">Tweak the props below — the preview and the code update live.</p>
            <Playground comp={comp} />

            <h2 className="docs-h2">Props</h2>
            <div className="docs-props">
              <PropsTable rows={comp.props} />
            </div>

            <div className="docs-foot-nav">
              <a href="#/customizer">Theme this component →</a>
              <a href="https://www.npmjs.com/package/feather-ui-kit" target="_blank" rel="noreferrer">View on npm →</a>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
