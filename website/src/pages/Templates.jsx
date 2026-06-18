import { useState } from "react";
import {
  Button, Input, Select, Switch, Slider, Badge, Avatar, AvatarGroup, Progress,
  Card, Table, Tabs, Accordion, Menu, Dialog, DialogBody, DialogFoot, useToast,
} from "feather-ui-kit";
import { Nav, Footer } from "../chrome.jsx";
import { ThemePicker, useThemeControl } from "../theme-control.jsx";

const grad = (a, b) => ({ background: `linear-gradient(135deg, ${a}, ${b})` });
const APP = { dashboard: 1, projects: 1, settings: 1 };
const URLS = {
  dashboard: "app.acme.com/dashboard", projects: "app.acme.com/projects", settings: "app.acme.com/settings",
  pricing: "acme.com/pricing", signin: "acme.com/login",
};
const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const Dots = () => <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>;
const Up = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 15 12 9 18 15" /></svg>;
const Down = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>;

const TEMPLATE_CODE = {
  dashboard: `<div className="tpl-head">
  <div><h2>Overview</h2><p>Welcome back, Jordan.</p></div>
  <div className="tpl-actions">
    <Select><option>Last 30 days</option></Select>
    <Button variant="outline" size="sm">Export</Button>
  </div>
</div>

{/* KPI cards */}
<div className="stat-row">
  <Card className="stat">
    <div className="s-top">
      <span className="s-label">Revenue</span>
      <span className="delta up"><Up />12.4%</span>
    </div>
    <div className="s-num">$48,210</div>
    <Spark bars={[40, 55, 35, 70, 60, 90, 100]} />
  </Card>
  {/* …Active users, Conversion, Churn */}
</div>

{/* chart + goals */}
<div className="dash-grid">
  <Card>{/* <div className="chart">…bars…</div> */}</Card>
  <Card>{/* goal rows with <Progress value={80} /> */}</Card>
</div>

{/* recent orders */}
<Card>
  <Table>
    <thead><tr><th>Customer</th><th>Status</th><th className="feather-num">Amount</th></tr></thead>
    <tbody>
      <tr>
        <td>
          <div className="cell-u">
            <Avatar initials="MK" />
            <div className="nm"><b>Mara Kessler</b><span>mara@northwind.io</span></div>
          </div>
        </td>
        <td><Badge variant="soft" dot>Paid</Badge></td>
        <td className="feather-num">$290</td>
      </tr>
    </tbody>
  </Table>
</Card>`,
  projects: `<div className="tpl-head">
  <div><h2>Projects</h2><p>14 active projects across 3 teams.</p></div>
  <Button variant="primary" size="sm"><Plus /> New project</Button>
</div>

<Card>
  <Table>
    <thead><tr><th>Project</th><th>Team</th><th>Status</th><th>Progress</th><th /></tr></thead>
    <tbody>
      <tr>
        <td>
          <div className="cell-u">
            <Avatar initials="DR" />
            <div className="nm"><b>Design refresh</b><span>acme-web</span></div>
          </div>
        </td>
        <td><AvatarGroup><Avatar initials="JS" /><Avatar initials="MK" /></AvatarGroup></td>
        <td><Badge variant="soft" dot>On track</Badge></td>
        <td>
          <div className="mini-prog"><Progress value={72} /><span>72%</span></div>
        </td>
        <td>
          <Menu trigger={<Dots />}>
            <button>Open</button><button>Archive</button>
          </Menu>
        </td>
      </tr>
    </tbody>
  </Table>
  <div className="feather-card-foot" style={{ justifyContent: "space-between" }}>
    <span>Showing 4 of 14</span>
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="outline" size="sm">Previous</Button>
      <Button variant="outline" size="sm">Next</Button>
    </div>
  </div>
</Card>`,
  settings: `<div className="tpl-head"><div><h2>Settings</h2></div></div>

<Tabs items={[
  { label: "Profile", content: <ProfileForm /> },
  { label: "Notifications", content: <NotificationSwitches /> },
  { label: "Account", content: <PasswordForm /> },
]} />

{/* ProfileForm */}
<Card>
  <div className="feather-card-head"><div><h3 className="feather-card-title">Public profile</h3></div></div>
  <CardBody>
    <div className="avatar-row">
      <Avatar className="avatar-lg" initials="JS" />
      <Button variant="outline" size="sm">Upload</Button>
    </div>
    <div className="row2"><Input label="First name" /><Input label="Last name" /></div>
    <Input label="Email" defaultValue="jordan@acme.com" />
  </CardBody>
</Card>

{/* sticky save bar */}
<div className="save-bar">
  <span>Unsaved changes</span>
  <div style={{ display: "flex", gap: 9 }}>
    <Button variant="ghost">Discard</Button>
    <Button variant="primary">Save changes</Button>
  </div>
</div>`,
  pricing: `const [yearly, setYearly] = useState(false);

<div className="pricing">
  <div className="pricing-head">
    <h2>Simple, transparent pricing</h2>
    <label className="bill-toggle">
      <span>Monthly</span>
      <Switch checked={yearly} onChange={(e) => setYearly(e.target.checked)} />
      <span>Yearly</span>
    </label>
  </div>
  <div className="tiers">
    <Card className="tier popular">
      <div className="t-name">Pro <Badge variant="soft">Popular</Badge></div>
      <div className="price">{yearly ? "$23" : "$29"}<small>/mo</small></div>
      <ul className="feat-list">
        <li><Check /> Unlimited projects</li>
        <li><Check /> Priority support</li>
      </ul>
      <Button variant="primary" className="feather-button-block">Start trial</Button>
    </Card>
    {/* …Starter and Enterprise */}
  </div>
</div>`,
  signin: `<div className="auth">
  <div className="auth-aside">
    {/* gradient brand panel + testimonial */}
  </div>
  <div className="auth-main">
    <div className="auth-card">
      <h3>Welcome back</h3>
      <p className="sub">Sign in to your Acme account.</p>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <Input label="Email" type="email" defaultValue="jordan@acme.com" />
        <Input label="Password" type="password" />
        <div className="row-between">
          <Checkbox label="Remember me" defaultChecked />
          <span className="link">Forgot password?</span>
        </div>
        <Button variant="primary" className="feather-button-block">Sign in</Button>
        <div className="divider">or continue with</div>
        <Button variant="outline" className="feather-button-block">GitHub</Button>
      </form>
    </div>
  </div>
</div>`,
};

function Sidebar({ tpl, go }) {
  const item = (key, label, icon) => (
    <a className={tpl === key ? "active" : ""} onClick={key ? () => go(key) : undefined}>{icon} {label}</a>
  );
  return (
    <aside className="side">
      <div className="side-brand"><span className="mk">A</span> Acme Inc.</div>
      {item("dashboard", "Dashboard", <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>)}
      {item("projects", "Projects", <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>)}
      {item(null, "Customers", <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>)}
      <div className="side-cap">Workspace</div>
      {item("settings", "Settings", <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>)}
      <div className="side-sp" />
      <div className="side-user"><Avatar initials="JS" style={grad("#6D4AE0", "#9a7cf0")} /><div className="nm"><b>Jordan Shaw</b><span>Owner</span></div></div>
    </aside>
  );
}

function Spark({ bars }) {
  return <div className="s-spark">{bars.map((h, i) => <i key={i} className={h.hi ? "hi" : ""} style={{ height: h.v + "%" }} />)}</div>;
}

function Dashboard() {
  return (
    <>
      <div className="tpl-head">
        <div><h2>Overview</h2><p>Welcome back, Jordan — here's how Acme is doing this month.</p></div>
        <div className="tpl-actions">
          <div style={{ width: 150 }}><Select><option>Last 30 days</option><option>Last 7 days</option><option>This quarter</option></Select></div>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>
      <div className="stat-row">
        <Card className="stat"><div className="s-top"><span className="s-label">Revenue</span><span className="delta up"><Up />12.4%</span></div><div className="s-num">$48,210</div><Spark bars={[{ v: 40 }, { v: 55 }, { v: 35 }, { v: 70 }, { v: 60 }, { v: 90, hi: 1 }, { v: 100, hi: 1 }]} /></Card>
        <Card className="stat"><div className="s-top"><span className="s-label">Active users</span><span className="delta up"><Up />8.1%</span></div><div className="s-num">3,942</div><Spark bars={[{ v: 50 }, { v: 45 }, { v: 60 }, { v: 55 }, { v: 75 }, { v: 80, hi: 1 }, { v: 95, hi: 1 }]} /></Card>
        <Card className="stat"><div className="s-top"><span className="s-label">Conversion</span><span className="delta down"><Down />1.2%</span></div><div className="s-num">3.18%</div><Spark bars={[{ v: 80 }, { v: 70 }, { v: 85 }, { v: 60 }, { v: 65 }, { v: 50 }, { v: 55, hi: 1 }]} /></Card>
        <Card className="stat"><div className="s-top"><span className="s-label">Churn</span><span className="delta up"><Up />0.4%</span></div><div className="s-num">1.9%</div><Spark bars={[{ v: 60 }, { v: 55 }, { v: 65 }, { v: 40 }, { v: 45 }, { v: 35 }, { v: 30, hi: 1 }]} /></Card>
      </div>
      <div className="dash-grid">
        <Card>
          <div className="feather-card-head"><div><h3 className="feather-card-title">Revenue</h3><p className="feather-card-desc">Monthly recurring revenue, last 9 months</p></div><Badge variant="soft" dot>Live</Badge></div>
          <div className="feather-card-body" style={{ paddingBottom: 14 }}>
            <div className="chart">
              {[["Oct", 38, 1], ["Nov", 46, 1], ["Dec", 42, 1], ["Jan", 58, 1], ["Feb", 54, 1], ["Mar", 68, 1], ["Apr", 80], ["May", 72], ["Jun", 100]].map(([m, h, soft]) => (
                <div className="col" key={m}><div className={"bar" + (soft ? " soft" : "")} style={{ height: h + "%" }} /><span>{m}</span></div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div className="feather-card-head"><h3 className="feather-card-title">Quarterly goals</h3></div>
          <div className="feather-card-body goal">
            <div className="goal-row"><div className="gl"><b>New revenue</b><span>$48k / $60k</span></div><Progress value={80} /></div>
            <div className="goal-row"><div className="gl"><b>Signups</b><span>3.9k / 5k</span></div><Progress value={78} /></div>
            <div className="goal-row"><div className="gl"><b>Retention</b><span>92% / 95%</span></div><Progress value={92} /></div>
            <Switch title="Weekly digest" description="Email me a Monday summary." defaultChecked />
          </div>
        </Card>
      </div>
      <Card>
        <div className="feather-card-head"><h3 className="feather-card-title">Recent orders</h3><Button variant="ghost" size="sm">View all</Button></div>
        <Table>
          <thead><tr><th>Customer</th><th>Plan</th><th>Status</th><th className="feather-num">Amount</th></tr></thead>
          <tbody>
            <tr><td><div className="cell-u"><Avatar initials="MK" /><div className="nm"><b>Mara Kessler</b><span>mara@northwind.io</span></div></div></td><td>Pro · annual</td><td><Badge variant="soft" dot>Paid</Badge></td><td className="feather-num">$290.00</td></tr>
            <tr><td><div className="cell-u"><Avatar initials="DT" style={grad("#2F5FD0", "#6f93e8")} /><div className="nm"><b>Devon Tate</b><span>devon@acme.dev</span></div></div></td><td>Team · monthly</td><td><Badge variant="outline">Pending</Badge></td><td className="feather-num">$79.00</td></tr>
            <tr><td><div className="cell-u"><Avatar initials="SL" style={grad("#D9762F", "#ecab6f")} /><div className="nm"><b>Sora Lin</b><span>sora@studio.co</span></div></div></td><td>Pro · monthly</td><td><Badge variant="soft" dot>Paid</Badge></td><td className="feather-num">$29.00</td></tr>
            <tr><td><div className="cell-u"><Avatar initials="RB" style={grad("#6D4AE0", "#9a7cf0")} /><div className="nm"><b>Rohan Bhatt</b><span>rohan@flux.app</span></div></div></td><td>Starter</td><td><Badge variant="danger">Failed</Badge></td><td className="feather-num">$9.00</td></tr>
          </tbody>
        </Table>
      </Card>
    </>
  );
}

function RowMenu() {
  return (
    <Menu trigger={<Dots />}>
      <button>Open</button><button>Duplicate</button><button>Archive</button>
      <hr /><button className="feather-menu-danger">Delete</button>
    </Menu>
  );
}

function Projects() {
  const rows = [
    { mk: "DR", name: "Design refresh", repo: "acme-web", team: [["JS", "#6D4AE0", "#9a7cf0"], ["MK", null]], status: ["soft", "On track"], pct: 72, up: "2h ago" },
    { mk: "MA", name: "Mobile app v2", repo: "acme-mobile", team: [["DT", "#D9762F", "#ecab6f"], ["SL", null]], status: ["danger", "At risk"], pct: 34, up: "Yesterday" },
    { mk: "BL", name: "Billing migration", repo: "acme-payments", team: [["RB", "#6D4AE0", "#9a7cf0"], ["JS", null]], status: ["soft", "On track"], pct: 88, up: "3d ago" },
    { mk: "DG", name: "Docs & guides", repo: "acme-docs", team: [["SL", "#2F5FD0", "#6f93e8"]], status: ["outline", "Paused"], pct: 51, up: "1w ago" },
  ];
  return (
    <>
      <div className="tpl-head">
        <div><h2>Projects</h2><p>14 active projects across 3 teams.</p></div>
        <div className="tpl-actions">
          <div style={{ width: 140 }}><Select><option>All statuses</option><option>On track</option><option>At risk</option></Select></div>
          <Button variant="primary" size="sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> New project</Button>
        </div>
      </div>
      <Card>
        <Table>
          <thead><tr><th>Project</th><th>Team</th><th>Status</th><th>Progress</th><th>Updated</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td><div className="cell-u"><Avatar initials={r.mk} /><div className="nm"><b>{r.name}</b><span>{r.repo}</span></div></div></td>
                <td><AvatarGroup>{r.team.map(([ini, a, b], i) => <Avatar key={i} initials={ini} style={a ? grad(a, b) : undefined} />)}{r.team.length > 1 && <Avatar className="feather-avatar-more" initials="+2" />}</AvatarGroup></td>
                <td><Badge variant={r.status[0]} dot={r.status[0] !== "outline"}>{r.status[1]}</Badge></td>
                <td><div className="mini-prog"><Progress value={r.pct} /><span className="muted-cell">{r.pct}%</span></div></td>
                <td className="muted-cell">{r.up}</td>
                <td><RowMenu /></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="feather-card-foot" style={{ justifyContent: "space-between" }}>
          <span className="muted-cell">Showing 4 of 14</span>
          <div style={{ display: "flex", gap: 8 }}><Button variant="outline" size="sm">Previous</Button><Button variant="outline" size="sm">Next</Button></div>
        </div>
      </Card>
    </>
  );
}

function Settings({ onDelete, onSave }) {
  const [freq, setFreq] = useState(3);
  return (
    <>
      <div className="tpl-head"><div><h2>Settings</h2><p>Manage your profile, account and notifications.</p></div></div>
      <Tabs items={[
        { label: "Profile", content: (
          <div className="set-grid">
            <Card>
              <div className="feather-card-head"><div><h3 className="feather-card-title">Public profile</h3><p className="feather-card-desc">This is how others see you.</p></div></div>
              <div className="feather-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="avatar-row"><Avatar className="avatar-lg" initials="JS" style={grad("#6D4AE0", "#9a7cf0")} /><div style={{ display: "flex", gap: 8 }}><Button variant="outline" size="sm">Upload</Button><Button variant="ghost" size="sm">Remove</Button></div></div>
                <div className="row2"><Input label="First name" defaultValue="Jordan" /><Input label="Last name" defaultValue="Shaw" /></div>
                <Input label="Email" defaultValue="jordan@acme.com" hint="Used for sign-in and receipts." />
                <div className="feather-field"><label className="feather-label">Role</label><Select><option>Owner</option><option>Admin</option><option>Member</option></Select></div>
              </div>
            </Card>
          </div>
        ) },
        { label: "Notifications", content: (
          <div className="set-grid">
            <Card>
              <div className="feather-card-head"><div><h3 className="feather-card-title">Notifications</h3><p className="feather-card-desc">Choose what reaches your inbox.</p></div></div>
              <div className="feather-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <Switch title="Product updates" description="New features and improvements." defaultChecked />
                <Switch title="Mentions" description="When someone @mentions you." defaultChecked />
                <Switch title="Marketing" description="Tips, offers and the occasional newsletter." />
                <Slider label="Digest frequency" min={1} max={7} value={freq} showValue onChange={(e) => setFreq(+e.target.value)} />
              </div>
            </Card>
          </div>
        ) },
        { label: "Account", content: (
          <div className="set-grid">
            <Card>
              <div className="feather-card-head"><h3 className="feather-card-title">Password</h3></div>
              <div className="feather-card-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Input label="Current password" type="password" defaultValue="password1" />
                <div className="row2"><Input label="New password" type="password" placeholder="••••••••" /><Input label="Confirm" type="password" placeholder="••••••••" /></div>
              </div>
            </Card>
            <Card style={{ borderColor: "color-mix(in srgb, var(--fk-danger), transparent 70%)" }}>
              <div className="feather-card-head"><div><h3 className="feather-card-title" style={{ color: "var(--fk-danger)" }}>Danger zone</h3><p className="feather-card-desc">Deleting your account is permanent.</p></div><Button variant="destructive" size="sm" onClick={onDelete}>Delete account</Button></div>
            </Card>
          </div>
        ) },
      ]} />
      <div className="save-bar">
        <span>Unsaved changes</span>
        <div style={{ display: "flex", gap: 9 }}><Button variant="ghost">Discard</Button><Button variant="primary" onClick={onSave}>Save changes</Button></div>
      </div>
    </>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  const price = (m, y) => (yearly ? y : m);
  return (
    <div className="pricing">
      <div className="pricing-head">
        <p className="pe">Pricing</p>
        <h2>Simple, transparent pricing</h2>
        <p>Start free, upgrade when you grow. No hidden fees, cancel anytime.</p>
        <label className="bill-toggle"><span>Monthly</span><Switch checked={yearly} onChange={(e) => setYearly(e.target.checked)} /><span>Yearly</span><span className="save-pill">Save 20%</span></label>
      </div>
      <div className="tiers">
        <Card className="tier">
          <div className="t-name">Starter</div><div className="t-desc">For individuals trying things out.</div>
          <div className="price">${price(0, 0)}<small>/mo</small></div>
          <ul className="feat-list"><li><Check /> 1 project</li><li><Check /> Community support</li><li><Check /> 1 GB storage</li></ul>
          <Button variant="outline" className="feather-button-block">Get started</Button>
        </Card>
        <Card className="tier popular">
          <div className="t-name">Pro <Badge variant="soft">Popular</Badge></div><div className="t-desc">For growing teams that ship fast.</div>
          <div className="price">${price(29, 23)}<small>/mo</small></div>
          <ul className="feat-list"><li><Check /> Unlimited projects</li><li><Check /> Priority support</li><li><Check /> 100 GB storage</li><li><Check /> Advanced analytics</li></ul>
          <Button variant="primary" className="feather-button-block">Start free trial</Button>
        </Card>
        <Card className="tier">
          <div className="t-name">Enterprise</div><div className="t-desc">For organizations at scale.</div>
          <div className="price">${price(79, 63)}<small>/mo</small></div>
          <ul className="feat-list"><li><Check /> SSO &amp; SCIM</li><li><Check /> Dedicated manager</li><li><Check /> Unlimited storage</li><li><Check /> 99.99% SLA</li></ul>
          <Button variant="secondary" className="feather-button-block">Contact sales</Button>
        </Card>
      </div>
      <div className="pricing-faq">
        <div className="fq-h">Frequently asked</div>
        <Accordion summary="Can I change plans later?" open>Yes — upgrade or downgrade anytime. We prorate the difference automatically.</Accordion>
        <Accordion summary="Is there a free trial?">Pro comes with a 14-day free trial. No credit card required to start.</Accordion>
        <Accordion summary="What payment methods do you accept?">All major cards, plus invoicing on the Enterprise plan.</Accordion>
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <div className="auth">
      <div className="auth-aside">
        <div className="glow" />
        <div className="a-brand"><span className="mk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></svg></span> Acme</div>
        <div className="a-quote"><p>"We shipped our whole dashboard in a weekend. The components just got out of the way."</p><div className="who"><span className="ab">MK</span><div><b style={{ fontWeight: 600 }}>Mara Kessler</b> · Head of Product, Northwind</div></div></div>
      </div>
      <div className="auth-main">
        <div className="auth-card">
          <h3>Welcome back</h3><p className="sub">Sign in to your Acme account to continue.</p>
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <Input label="Email" type="email" defaultValue="jordan@acme.com" />
            <Input label="Password" type="password" defaultValue="password1" />
            <div className="row-between">
              <label className="feather-check"><input type="checkbox" defaultChecked /><span className="feather-check-box"><Check /></span>Remember me</label>
              <span className="link">Forgot password?</span>
            </div>
            <Button variant="primary" className="feather-button-block" type="submit">Sign in</Button>
            <div className="divider">or continue with</div>
            <div style={{ display: "flex", gap: 9 }}>
              <Button variant="outline" className="feather-button-block" type="button"><svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg> GitHub</Button>
              <Button variant="outline" className="feather-button-block" type="button">Google</Button>
            </div>
          </form>
          <div className="auth-foot">No account? <span className="link">Sign up free</span></div>
        </div>
      </div>
    </div>
  );
}

function Window({ tpl, go }) {
  const isApp = !!APP[tpl];
  return (
    <div className="win">
      <div className="win-bar">
        <div className="dots"><i /><i /><i /></div>
        <div className="url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg><span>{URLS[tpl]}</span></div>
      </div>
      <div className="win-body">
        {isApp ? (
          <div className="shell">
            <Sidebar tpl={tpl} go={go} />
            <main className="main">
              <div className="topbar">
                <div className="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg><Input placeholder="Search…" /></div>
                <div style={{ flex: 1 }} />
                <button className="icon-btn" aria-label="Notifications"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg></button>
                <Button variant="primary" size="sm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> New</Button>
              </div>
              <div className="content"><AppScreen tpl={tpl} go={go} /></div>
            </main>
          </div>
        ) : (tpl === "pricing" ? <Pricing /> : <SignIn />)}
      </div>
    </div>
  );
}

function AppScreen({ tpl }) {
  const toast = useToast();
  const [delOpen, setDelOpen] = useState(false);
  if (tpl === "dashboard") return <Dashboard />;
  if (tpl === "projects") return <Projects />;
  return (
    <>
      <Settings onDelete={() => setDelOpen(true)} onSave={() => toast({ title: "Changes saved", desc: "Your settings are up to date." })} />
      <Dialog open={delOpen} onClose={() => setDelOpen(false)}>
        <DialogBody><h3>Delete account?</h3><p>This permanently removes your Acme account, projects and billing history. This can't be undone.</p></DialogBody>
        <DialogFoot><Button variant="ghost" onClick={() => setDelOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => setDelOpen(false)}>Delete account</Button></DialogFoot>
      </Dialog>
    </>
  );
}

export default function Templates() {
  const [theme, setTheme] = useThemeControl();
  const [tpl, setTpl] = useState("dashboard");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyCode = () => navigator.clipboard.writeText(TEMPLATE_CODE[tpl]).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }).catch(() => {});

  const tabs = [["dashboard", "Dashboard"], ["projects", "Projects"], ["settings", "Settings"], ["pricing", "Pricing"], ["signin", "Sign in"]];
  return (
    <>
      <Nav active="templates" extra={<ThemePicker value={theme} onChange={setTheme} />} />
      <main className="tpl-page">
        <div className="wrap wide-wrap">
          <div className="cz-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow"><b>·</b> Templates</p>
            <h1 className="hero-h" style={{ fontSize: "clamp(30px,5vw,46px)" }}>Components, assembled into <span className="n">real pages</span>.</h1>
            <p className="lede" style={{ fontSize: "clamp(16px,2vw,19px)", marginBottom: 0 }}>Five production-shaped screens, built entirely from feather-ui-kit. Pick a screen, switch the theme (top-right), and copy the code.</p>
          </div>
          <div className="switcher">
            <div className="seg">{tabs.map(([k, label]) => <button key={k} className={tpl === k ? "active" : ""} onClick={() => setTpl(k)}>{label}</button>)}</div>
            <div className="tpl-code-actions">
              <button onClick={() => setShowCode((s) => !s)}>{showCode ? "Hide code" : "Show code"}</button>
              <button className="primary" onClick={copyCode}>{copied ? "Copied!" : "Copy code"}</button>
            </div>
          </div>
          <Window tpl={tpl} go={setTpl} />
          {showCode && <pre className="tpl-code">{TEMPLATE_CODE[tpl]}</pre>}
        </div>
      </main>
      <Footer />
    </>
  );
}
