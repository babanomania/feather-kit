import { useState, useEffect, useRef } from "react";
import {
  Button, Input, Select, Checkbox, Radio, Switch, Slider, Badge, Avatar, AvatarGroup,
  Progress, Card, CardHead, CardTitle, CardDesc, CardBody, CardFoot, Table, Tabs,
  Accordion, Tooltip, Menu, Dialog, DialogBody, DialogFoot,
  Overline, Heading, Text, Metric, Muted, useToast,
} from "feather-ui-kit";
import { Nav, Footer } from "../chrome.jsx";
import { THEMES, COLOR_KEYS, VAR_OF, themeVars, genCSS, darken, onAccent, rgba, isHex, norm, hslToHex } from "../theme-presets.js";

const LABELS = {
  accent: "Accent", accentDeep: "Accent deep", ink: "Text (ink)", inkSoft: "Text soft",
  muted: "Muted", bg: "Background", bgSubtle: "Subtle", border: "Border", danger: "Danger",
};
const grad = (a, b) => ({ background: `linear-gradient(135deg, ${a}, ${b})` });

function PreviewStage() {
  const toast = useToast();
  const [dlg, setDlg] = useState(false);
  const [vol, setVol] = useState(68);
  return (
    <div className="stage">
      <div className="pv">
        <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start", width: "100%" }}>
          <Overline>Analytics overview</Overline>
          <Heading level={2}>Type that carries the theme.</Heading>
          <Text style={{ maxWidth: "48ch" }}>Headings, labels and metrics all read from the same <code className="ui-codeword">--fk-*</code> tokens — restyle once, everything follows.</Text>
          <div style={{ display: "flex", gap: 26, alignItems: "flex-end", marginTop: 4, flexWrap: "wrap" }}>
            <Metric unit="MRR">$48,210</Metric>
            <Metric unit="users" size="sm">3,942</Metric>
            <Muted>Updated 2h ago</Muted>
          </div>
        </div>

        <div className="pv-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="primary" size="sm">Small</Button>
        </div>

        <div className="pv-grid">
          <Card>
            <CardHead style={{ borderBottom: 0, paddingBottom: 0 }}>
              <div className="card-head-row">
                <div><CardTitle>Create project</CardTitle><CardDesc>Deploy your new project in one click.</CardDesc></div>
                <Badge variant="soft" dot>Pro</Badge>
              </div>
            </CardHead>
            <CardBody style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input label="Project name" defaultValue="feather-ui-kit" spellCheck={false} />
              <div className="feather-field"><label className="feather-label">Framework</label>
                <Select><option>React</option><option>Preact</option><option>Solid</option></Select>
              </div>
              <Switch title="Private repository" description="Only invited members can see it." defaultChecked />
            </CardBody>
            <CardFoot>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary" onClick={() => toast({ title: "Deployed to production", desc: "feather-kit is live in ~12s." })}>Deploy →</Button>
            </CardFoot>
          </Card>

          <div className="pv-stack">
            <div className="pv-row">
              <Badge variant="solid">New</Badge><Badge variant="soft">Beta</Badge>
              <Badge variant="outline">Draft</Badge><Badge variant="soft" dot>Live</Badge>
            </div>
            <AvatarGroup>
              <Avatar initials="AK" />
              <Avatar initials="RS" style={grad("#6D4AE0", "#9a7cf0")} />
              <Avatar initials="MT" style={grad("#2F5FD0", "#6f93e8")} />
              <Avatar className="feather-avatar-more" initials="+5" />
            </AvatarGroup>
            <Checkbox label="Accept terms" defaultChecked />
            <Radio name="pvr" label="Monthly billing" defaultChecked />
            <Switch label="Notifications" defaultChecked />
            <Slider label="Volume" min={0} max={100} value={vol} showValue onChange={(e) => setVol(+e.target.value)} />
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--fk-ink-soft)" }}><span>Uploading</span><span>68%</span></div>
              <Progress value={68} />
            </div>
          </div>
        </div>

        <Tabs items={[
          { label: "Account", content: "Tabs are radio inputs + a CSS sibling selector — zero JS, and they still carry the theme." },
          { label: "Password", content: "The browser's radio group remembers the active tab." },
          { label: "Team", content: "Invite teammates and manage their roles here." },
        ]} />

        <Card>
          <Table>
            <thead><tr><th>Component</th><th>Built on</th><th className="feather-num">Size</th></tr></thead>
            <tbody>
              <tr><td>Dialog</td><td>&lt;dialog&gt;</td><td className="feather-num">≈ 300 B</td></tr>
              <tr><td>Accordion</td><td>&lt;details&gt;</td><td className="feather-num">≈ 140 B</td></tr>
              <tr><td>Tabs</td><td>radio + CSS</td><td className="feather-num">≈ 220 B</td></tr>
            </tbody>
          </Table>
        </Card>

        <div className="pv-grid">
          <div className="pv-stack" style={{ width: "100%" }}>
            <Accordion summary="Is it accessible?" open>Yes — a native &lt;details&gt;, keyboard &amp; screen-reader behavior built in.</Accordion>
            <Accordion summary="Does it need JavaScript?">No. The browser toggles it on its own.</Accordion>
          </div>
          <div className="pv-stack" style={{ gap: 14 }}>
            <Tooltip tip="Copied to clipboard ✓"><span style={{ borderBottom: "1px dashed var(--fk-border)", fontSize: 13.5, color: "var(--fk-ink)" }}>Hover or focus me</span></Tooltip>
            <Menu label="Actions">
              <button>Duplicate <span className="feather-kbd">⌘D</span></button>
              <button>Rename <span className="feather-kbd">⌘R</span></button>
              <hr />
              <button className="feather-menu-danger">Delete</button>
            </Menu>
            <Button variant="outline" onClick={() => setDlg(true)}>Open dialog</Button>
          </div>
        </div>
      </div>

      <Dialog open={dlg} onClose={() => setDlg(false)}>
        <DialogBody><h3>Delete project?</h3><p>This permanently removes feather-kit and all its deployments.</p></DialogBody>
        <DialogFoot>
          <Button variant="ghost" onClick={() => setDlg(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setDlg(false)}>Delete</Button>
        </DialogFoot>
      </Dialog>
    </div>
  );
}

export default function Customizer() {
  const [s, setS] = useState({ ...THEMES[0] });
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  // Apply the tokens to :root so the preview AND portaled dialog/toast theme;
  // revert on unmount so other pages aren't affected.
  useEffect(() => {
    const root = document.documentElement;
    const vars = themeVars(s);
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    return () => Object.keys(vars).forEach((k) => root.style.removeProperty(k));
  }, [s]);

  const set = (patch, clearActive = true) => {
    setS((prev) => ({ ...prev, ...patch }));
    if (clearActive) setActive(-1);
  };
  const setColor = (k, raw) => {
    const v = norm(raw);
    const patch = { [k]: v };
    if (k === "accent") patch.accentDeep = darken(v, 0.16);
    set(patch);
  };
  const pickTheme = (i) => { setS({ ...THEMES[i] }); setActive(i); };
  const randomize = () => {
    const accent = hslToHex(Math.floor(Math.random() * 360), 62 + Math.random() * 22, 44 + Math.random() * 8);
    set({ accent, accentDeep: darken(accent, 0.16) });
  };
  const css = genCSS(s);
  const copy = () => navigator.clipboard.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {});
  const download = () => {
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "feather-kit-theme.css";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <Nav active="customizer" />
      <main className="cz">
        <div className="wrap wide-wrap">
          <div className="cz-head">
            <p className="eyebrow"><b>·</b> Theme customizer</p>
            <h1 className="hero-h" style={{ fontSize: "clamp(30px,5vw,46px)" }}>Make it <span className="n">yours</span> in a few clicks.</h1>
            <p className="lede" style={{ fontSize: "clamp(16px,2vw,19px)", marginBottom: 0 }}>Every component styles through one set of <code>--fk-*</code> custom properties. Tweak them, or start from a preset, then copy the generated CSS into your stylesheet.</p>
          </div>

          <div className="cz-layout">
            <aside className="panel">
              <div className="grp">
                <p className="grp-title">Presets <span className="hint">12 themes</span></p>
                <div className="themes">
                  {THEMES.map((t, i) => (
                    <button key={t.name} className={"swatch" + (active === i ? " active" : "")} onClick={() => pickTheme(i)}
                      style={{ background: t.bg, borderColor: t.border, color: t.ink }}>
                      <span className="sw-dots">
                        <i style={{ background: t.accent }} /><i style={{ background: t.ink }} />
                        <i style={{ background: t.bgSubtle, boxShadow: `inset 0 0 0 1px ${t.border}` }} /><i style={{ background: t.danger }} />
                      </span>
                      <span className="sw-name">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grp">
                <p className="grp-title">Accent</p>
                <ColorCtrl k="accent" s={s} setColor={setColor} />
                <ColorCtrl k="accentDeep" s={s} setColor={setColor} />
                <div className="slider-ctl" style={{ marginTop: 6 }}>
                  <div className="slider-top"><span className="s-name">Accent soft <code>--fk-accent-soft</code></span><span className="s-val">{s.softAlpha.toFixed(2)}</span></div>
                  <input type="range" min="0" max="0.3" step="0.01" value={s.softAlpha} onChange={(e) => set({ softAlpha: +e.target.value })} />
                </div>
              </div>

              <div className="grp">
                <p className="grp-title">Text</p>
                <ColorCtrl k="ink" s={s} setColor={setColor} />
                <ColorCtrl k="inkSoft" s={s} setColor={setColor} />
                <ColorCtrl k="muted" s={s} setColor={setColor} />
              </div>

              <div className="grp">
                <p className="grp-title">Surfaces</p>
                <ColorCtrl k="bg" s={s} setColor={setColor} />
                <ColorCtrl k="bgSubtle" s={s} setColor={setColor} />
                <ColorCtrl k="border" s={s} setColor={setColor} />
                <ColorCtrl k="danger" s={s} setColor={setColor} />
              </div>

              <div className="grp">
                <p className="grp-title">Shape</p>
                <div className="slider-ctl">
                  <div className="slider-top"><span className="s-name">Radius <code>--fk-radius</code></span><span className="s-val">{s.radius}px</span></div>
                  <input type="range" min="0" max="20" step="1" value={s.radius} onChange={(e) => set({ radius: +e.target.value })} />
                </div>
              </div>

              <div className="grp">
                <div className="actions">
                  <button className="pbtn" onClick={() => pickTheme(0)}>Reset</button>
                  <button className="pbtn" onClick={randomize}>Surprise me</button>
                </div>
              </div>

              <div className="grp">
                <div className="out-bar">
                  <p className="grp-title" style={{ margin: 0 }}>Generated CSS</p>
                  <div className="actions">
                    <button className="pbtn" onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
                    <button className="pbtn primary" onClick={download}>.css</button>
                  </div>
                </div>
                <pre className="out-code">{css}</pre>
                <p className="out-tip">Paste into your stylesheet <em>after</em> <code>import "feather-ui-kit/themes/light.css"</code> to override the defaults.</p>
              </div>
            </aside>

            <div>
              <div className="stage-bar"><span className="sb-title">Live preview</span><span className="sb-note">reflects your --fk-* variables</span></div>
              <PreviewStage />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ColorCtrl({ k, s, setColor }) {
  const [draft, setDraft] = useState(s[k]);
  useEffect(() => { setDraft(s[k]); }, [s, k]);
  return (
    <div className="ctrl">
      <div className="ctrl-meta"><span className="ctrl-name">{LABELS[k]}</span><code>{VAR_OF[k]}</code></div>
      <div className="ctrl-color">
        <input type="color" value={s[k]} onChange={(e) => setColor(k, e.target.value)} />
        <input className="hex" value={draft} maxLength={7} spellCheck={false}
          onChange={(e) => { const v = e.target.value; setDraft(v); if (isHex(v)) setColor(k, v); }}
          onBlur={() => setDraft(s[k])} />
      </div>
    </div>
  );
}
