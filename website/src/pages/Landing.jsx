import { useState } from "react";
import {
  Button, Input, Select, Checkbox, Radio, Switch, Slider, Badge, Avatar, AvatarGroup,
  Progress, Card, CardHead, CardTitle, CardDesc, CardBody, CardFoot, Table, Tabs,
  Accordion, Tooltip, Menu, Dialog, DialogBody, DialogFoot,
  Overline, Heading, Lead, Metric, Muted, useToast,
} from "feather-ui-kit";
import { Nav, Footer, FeatherMark, REPO } from "../chrome.jsx";

const grad = (a, b) => ({ background: `linear-gradient(135deg, ${a}, ${b})` });

function HeroCard() {
  const toast = useToast();
  return (
    <div className="hero-card">
      <Card>
        <CardHead style={{ borderBottom: 0, paddingBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <CardTitle>Create project</CardTitle>
              <CardDesc>Deploy your new project in one click.</CardDesc>
            </div>
            <Badge variant="soft" dot>Pro</Badge>
          </div>
        </CardHead>
        <CardBody style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <Input label="Project name" defaultValue="feather-ui-kit" spellCheck={false} />
          <div className="feather-field">
            <label className="feather-label">Framework</label>
            <Select defaultValue="React"><option>React</option><option>Preact</option><option>Solid</option></Select>
          </div>
          <Switch title="Private repository" description="Only invited members can see it." defaultChecked />
        </CardBody>
        <CardFoot>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" onClick={() => toast({ title: "Deployed to production", desc: "feather-kit is live in ~12s." })}>Deploy →</Button>
        </CardFoot>
      </Card>
    </div>
  );
}

export default function Landing() {
  const [vol, setVol] = useState(68);
  const [dlg, setDlg] = useState(false);

  return (
    <>
      <Nav active="home" />

      <header className="hero">
        <div className="feather-bg"><FeatherMark size={340} strokeWidth={1} /></div>
        <div className="wrap">
          <p className="eyebrow">React <b>·</b> 20+ components <b>·</b> Zero dependencies <b>·</b> MIT</p>
          <h1 className="hero-h">The UI kit that's <span className="n">mostly the browser</span>.</h1>
          <p className="lede">Buttons, inputs, cards, tables — the everyday set, all clean CSS. Dialogs, menus, and tooltips — built on the primitives the browser already ships, so several need <em>no JavaScript at all</em>. Import only what you use; a handful of components is still about a kilobyte.</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={REPO} target="_blank" rel="noreferrer">Star on GitHub</a>
            <a className="npm" href="#/customizer"><span className="prompt">$</span><span>npm i feather-ui-kit</span><span className="copy">themes →</span></a>
          </div>
          <div className="hero-stage"><HeroCard /></div>
        </div>
      </header>

      <section className="band">
        <div className="wrap">
          <p className="kicker">The kit</p>
          <h2 className="sec">Twenty-plus components. One philosophy.</h2>
          <p className="sec-lede">The full set you'd expect from a real library — every one a few lines of CSS or a thin layer over a browser primitive. Everything below is the actual published <code>feather-ui-kit</code>, live.</p>

          <div className="showcase">
            {/* Typography */}
            <div className="sx wide">
              <div className="sx-demo" style={{ gap: 7 }}>
                <Overline>Analytics overview</Overline>
                <Heading level={2}>Type that carries the brand.</Heading>
                <Lead>One scale — overline, heading, title, body — plus tabular metrics for the numbers.</Lead>
                <div style={{ display: "flex", gap: 28, alignItems: "flex-end", marginTop: 6, flexWrap: "wrap" }}>
                  <Metric unit="MRR">$48,210</Metric>
                  <Metric unit="users" size="sm">3,942</Metric>
                  <Muted>Updated 2h ago</Muted>
                </div>
              </div>
              <div className="sx-cap"><span className="sx-name">Typography</span><span className="sx-prim">≈ 120 B · CSS</span></div>
            </div>

            {/* Buttons */}
            <div className="sx wide">
              <div className="sx-demo">
                <div className="sx-row">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
                <div className="sx-row">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="outline" size="sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    With icon
                  </Button>
                </div>
              </div>
              <div className="sx-cap"><span className="sx-name">Button</span><span className="sx-prim">≈ 90 B · CSS</span></div>
            </div>

            {/* Input */}
            <div className="sx">
              <div className="sx-demo"><Input label="Email" placeholder="you@example.com" hint="We'll never share it." /></div>
              <div className="sx-cap"><span className="sx-name">Input</span><span className="sx-prim">≈ 80 B · CSS</span></div>
            </div>

            {/* Select */}
            <div className="sx">
              <div className="sx-demo">
                <div className="feather-field"><label className="feather-label">Role</label>
                  <Select><option>Owner</option><option>Editor</option><option>Viewer</option></Select>
                </div>
              </div>
              <div className="sx-cap"><span className="sx-name">Select</span><span className="sx-prim">≈ 190 B · &lt;select&gt;</span></div>
            </div>

            {/* Checkbox + Radio */}
            <div className="sx">
              <div className="sx-demo">
                <Checkbox label="Accept terms" defaultChecked />
                <Radio name="billing" label="Monthly billing" defaultChecked />
              </div>
              <div className="sx-cap"><span className="sx-name">Checkbox · Radio</span><span className="sx-prim">≈ 150 B · CSS</span></div>
            </div>

            {/* Switch */}
            <div className="sx">
              <div className="sx-demo">
                <Switch label="Notifications" defaultChecked />
                <Switch label="Marketing emails" />
              </div>
              <div className="sx-cap"><span className="sx-name">Switch</span><span className="sx-prim">≈ 160 B · CSS</span></div>
            </div>

            {/* Slider */}
            <div className="sx">
              <div className="sx-demo">
                <Slider label="Volume" min={0} max={100} value={vol} showValue onChange={(e) => setVol(+e.target.value)} />
              </div>
              <div className="sx-cap"><span className="sx-name">Slider</span><span className="sx-prim">≈ 120 B · range</span></div>
            </div>

            {/* Badge */}
            <div className="sx">
              <div className="sx-demo">
                <div className="sx-row">
                  <Badge variant="solid">New</Badge>
                  <Badge variant="soft">Beta</Badge>
                  <Badge variant="outline">Draft</Badge>
                  <Badge variant="soft" dot>Live</Badge>
                </div>
              </div>
              <div className="sx-cap"><span className="sx-name">Badge</span><span className="sx-prim">≈ 70 B · CSS</span></div>
            </div>

            {/* Avatar */}
            <div className="sx">
              <div className="sx-demo">
                <AvatarGroup>
                  <Avatar initials="AK" />
                  <Avatar initials="RS" style={grad("#6D4AE0", "#9a7cf0")} />
                  <Avatar initials="MT" style={grad("#2F5FD0", "#6f93e8")} />
                  <Avatar className="feather-avatar-more" initials="+5" />
                </AvatarGroup>
              </div>
              <div className="sx-cap"><span className="sx-name">Avatar</span><span className="sx-prim">≈ 90 B · CSS</span></div>
            </div>

            {/* Progress */}
            <div className="sx">
              <div className="sx-demo">
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-soft)" }}><span>Uploading</span><span>68%</span></div>
                  <Progress value={68} />
                </div>
              </div>
              <div className="sx-cap"><span className="sx-name">Progress</span><span className="sx-prim">≈ 60 B · CSS</span></div>
            </div>

            {/* Tabs */}
            <div className="sx wide">
              <div className="sx-demo">
                <Tabs items={[
                  { label: "Account", content: "No state, no click handler — three radio inputs and a CSS sibling selector. Try them." },
                  { label: "Password", content: "Change your password here. The browser's radio group remembers the active tab." },
                  { label: "Team", content: "Invite teammates and manage roles. Zero JavaScript made this panel appear." },
                ]} />
              </div>
              <div className="sx-cap"><span className="sx-name">Tabs</span><span className="sx-prim">zero JS · radio + CSS</span></div>
            </div>

            {/* Accordion */}
            <div className="sx">
              <div className="sx-demo" style={{ justifyContent: "flex-start" }}>
                <div style={{ width: "100%" }}>
                  <Accordion summary="Is it accessible?" open>Yes — it's a native &lt;details&gt;, so keyboard and screen-reader behavior come built in.</Accordion>
                  <Accordion summary="Does it need JavaScript?">No. The browser toggles it on its own.</Accordion>
                </div>
              </div>
              <div className="sx-cap"><span className="sx-name">Accordion</span><span className="sx-prim">zero JS · &lt;details&gt;</span></div>
            </div>

            {/* Tooltip */}
            <div className="sx">
              <div className="sx-demo center">
                <Tooltip tip="Copied to clipboard ✓"><span style={{ borderBottom: "1px dashed var(--line-2)", fontSize: 13.5 }}>Hover or focus me</span></Tooltip>
              </div>
              <div className="sx-cap"><span className="sx-name">Tooltip</span><span className="sx-prim">zero JS · CSS</span></div>
            </div>

            {/* Menu */}
            <div className="sx">
              <div className="sx-demo center">
                <Menu label="Actions">
                  <button>Duplicate <span className="feather-kbd">⌘D</span></button>
                  <button>Rename <span className="feather-kbd">⌘R</span></button>
                  <button>Move to…</button>
                  <hr />
                  <button className="feather-menu-danger">Delete <span className="feather-kbd">⌫</span></button>
                </Menu>
              </div>
              <div className="sx-cap"><span className="sx-name">Menu</span><span className="sx-prim">zero JS · Popover</span></div>
            </div>

            {/* Dialog */}
            <div className="sx">
              <div className="sx-demo center">
                <Button variant="outline" onClick={() => setDlg(true)}>Open dialog</Button>
              </div>
              <div className="sx-cap"><span className="sx-name">Dialog</span><span className="sx-prim">≈ 300 B · &lt;dialog&gt;</span></div>
            </div>

            {/* Card */}
            <div className="sx">
              <div className="sx-demo" style={{ background: "var(--paper-2)" }}>
                <Card style={{ width: "100%", boxShadow: "none" }}>
                  <CardBody style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 16px" }}>
                    <Avatar initials="FK" />
                    <div style={{ lineHeight: 1.3 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>Feather Kit</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>20 components · 0 deps</div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="sx-cap"><span className="sx-name">Card</span><span className="sx-prim">≈ 70 B · CSS</span></div>
            </div>

            {/* Table */}
            <div className="sx wide">
              <div className="sx-demo" style={{ padding: 0, alignItems: "stretch", justifyContent: "flex-start" }}>
                <Table>
                  <thead><tr><th>Component</th><th>Built on</th><th className="feather-num">Size</th></tr></thead>
                  <tbody>
                    <tr><td>Dialog</td><td>&lt;dialog&gt;</td><td className="feather-num">≈ 300 B</td></tr>
                    <tr><td>Accordion</td><td>&lt;details&gt;</td><td className="feather-num">≈ 140 B</td></tr>
                    <tr><td>Tabs</td><td>radio + CSS</td><td className="feather-num">≈ 220 B</td></tr>
                    <tr><td>Button</td><td>just CSS</td><td className="feather-num">≈ 90 B</td></tr>
                  </tbody>
                </Table>
              </div>
              <div className="sx-cap"><span className="sx-name">Table</span><span className="sx-prim">≈ 110 B · CSS</span></div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 34 }}>
            <a className="btn btn-primary" href="#/templates">See them in real pages →</a>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)" }}>A dashboard, a pricing page, a sign-in flow — assembled from these components.</span>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="kicker">The pitch, in one chart</p>
          <h2 className="sec">Bytes, where the others are kilobytes.</h2>
          <p className="sec-lede">Most kits ship their own focus-trap, portal layer, and positioning engine — redoing what the browser already does. Feather leans on the platform, so a typical handful of components costs almost nothing.</p>
          <div className="bars">
            {[["Feather Kit", "4px", "≈ 0.9 KB · 3 components", true], ["Radix UI", "13%", "≈ 30 KB"], ["Mantine", "27%", "≈ 60 KB"], ["MUI", "40%", "≈ 90 KB"], ["Ant Design", "100%", "≈ 220 KB"]].map(([name, w, val, me]) => (
              <div className={"bar-row" + (me ? " me" : "")} key={name}>
                <div className="bar-name">{name}</div>
                <div className="bar-track"><div className="bar-fill" style={{ width: w }} /><span className="bar-val">{val}</span></div>
              </div>
            ))}
          </div>
          <p className="bar-note">Rough gzipped figures — the big kits tree-shake too, so this isn't a like-for-like benchmark. The point is the order of magnitude.</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="kicker">Why it's this small</p>
          <h2 className="sec">It leans on the platform.</h2>
          <p className="sec-lede">Feather doesn't reimplement components from scratch. The browser ships accessible, keyboard-ready primitives for the overlays, and CSS is plenty for the rest.</p>
          <div className="grid2">
            <div className="cell"><div className="ix">01</div><h3>Built on primitives</h3><p>Overlays come from <code>&lt;dialog&gt;</code>, <code>&lt;details&gt;</code>, and the Popover API. Buttons, inputs, and cards are just well-made CSS.</p></div>
            <div className="cell"><div className="ix">02</div><h3>Several need zero JS</h3><p>Accordion, Tabs, Menu, and Tooltip run on markup and CSS. Nothing to hydrate, nothing to re-render on a toggle.</p></div>
            <div className="cell"><div className="ix">03</div><h3>Import only what you use</h3><p>Every component is its own entry point — <code>feather-ui-kit/button</code> — independently tree-shaken and measured.</p></div>
            <div className="cell"><div className="ix">04</div><h3>Yours to theme</h3><p>Everything styles through <code>--fk-*</code> variables on a single root. <a href="#/customizer">Open the theme customizer →</a></p></div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap">
          <p className="kicker">No, really — that's all of it</p>
          <h2 className="sec">A whole component.</h2>
          <p className="sec-lede">This is the entire Accordion — props forwarded, children placed, and <code style={{ color: "#fff" }}>&lt;details&gt;</code> does the rest.</p>
          <pre className="code"><span className="kw">export default function</span> <span className="fn">Accordion</span>{"({ summary, open, children, ...rest }) {"}{"\n"}  <span className="kw">return</span> ({"\n"}    &lt;<span className="fn">details</span> className=<span className="st">"feather-accordion"</span> open={"{open}"} {"{...rest}"}&gt;{"\n"}      &lt;<span className="fn">summary</span>&gt;{"{summary}"}&lt;/<span className="fn">summary</span>&gt;{"\n"}      &lt;<span className="fn">div</span> className=<span className="st">"feather-accordion-body"</span>&gt;{"{children}"}&lt;/<span className="fn">div</span>&gt;{"\n"}    &lt;/<span className="fn">details</span>&gt;{"\n"}  );{"\n"}{"}"}</pre>
          <div className="source-meta">
            <div className="accent"><span>Accordion, gzipped</span><b>≈ 228 B</b></div>
            <div><span>Components</span><b>20+</b></div>
            <div><span>Dependencies</span><b>0</b></div>
            <div><span>Build step</span><b>esbuild</b></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="kicker">Drop it in</p>
          <h2 className="sec">Install once. Import per component.</h2>
          <p className="sec-lede">One package, one entry point per component. You only ship the bytes for what you actually import.</p>
          <pre className="ucode"><span className="cm"># install</span>{"\n"}npm i feather-ui-kit</pre>
          <div className="imports">
            {[
              { name: "Button", sub: "Variants and sizes, all CSS — no runtime.", code: `import Button from\n  "feather-ui-kit/button";\n\n<Button variant="primary">\n  Deploy\n</Button>` },
              { name: "Tabs", sub: "A radio group in disguise — no state to wire.", code: `import Tabs from\n  "feather-ui-kit/tabs";\n\n<Tabs items={[\n  { label, content },\n]} />` },
              { name: "Dialog", sub: "Modal, focus-trapped, Escape-to-close — native.", code: `import Dialog from\n  "feather-ui-kit/dialog";\n\n<Dialog open={open}\n  onClose={close} />` },
            ].map((ex) => (
              <div className="imp" key={ex.name}>
                <div className="imp-h"><div className="i-name">{ex.name}</div><p className="i-sub">{ex.sub}</p></div>
                <pre>{ex.code}</pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="honest">
            <p className="kicker">The honest part</p>
            <h2 className="sec">Use the right tool.</h2>
            <p>Leaning on native primitives means inheriting their limits. There's no data grid, no virtualization, no unmount-animation choreography. If you need those, reach for <strong>Radix</strong>, <strong>MUI</strong>, or <strong>Mantine</strong> — and budget the kilobytes. Feather is for the common case: accessible, native-feeling components that don't bloat your bundle.</p>
          </div>
        </div>
      </section>

      <Footer />

      <Dialog open={dlg} onClose={() => setDlg(false)}>
        <DialogBody><h3>Delete project?</h3><p>This permanently removes feather-kit and all its deployments. This can't be undone.</p></DialogBody>
        <DialogFoot>
          <Button variant="ghost" onClick={() => setDlg(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setDlg(false)}>Delete</Button>
        </DialogFoot>
      </Dialog>
    </>
  );
}
