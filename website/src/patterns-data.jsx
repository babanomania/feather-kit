import { useState } from "react";
import {
  Button, Input, Select, Checkbox, Switch, Badge, Avatar, AvatarGroup, Progress,
  Card, CardBody, Table, Tabs, Menu, Dialog, DialogBody, DialogFoot, useToast,
  Overline, Heading, Text, Muted, Metric,
} from "feather-ui-kit";

const grad = (a, b) => ({ background: `linear-gradient(135deg, ${a}, ${b})` });
const Up = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 15 12 9 18 15" /></svg>;
const Down = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>;
const Check = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const Dots = () => <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" /></svg>;
const Plus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const SearchIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;

function Spark({ bars }) {
  return <div className="s-spark">{bars.map((h, i) => <i key={i} className={h.hi ? "hi" : ""} style={{ height: h.v + "%" }} />)}</div>;
}
function ConfirmBlock() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>Delete project</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBody><h3>Delete project?</h3><p>This permanently removes the project and all of its deployments. This can't be undone.</p></DialogBody>
        <DialogFoot>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
        </DialogFoot>
      </Dialog>
    </>
  );
}
function ToastBlock() {
  const toast = useToast();
  return <Button variant="primary" onClick={() => toast({ title: "Changes saved", desc: "Your settings are up to date." })}>Save changes</Button>;
}

export const CATEGORIES = [
  {
    slug: "stats",
    name: "Stats & metrics",
    desc: "KPI cards, trends and goal tracking — the numbers that lead most dashboards.",
    blocks: [
      {
        name: "KPI card row",
        render: () => (
          <div className="stat-row" style={{ width: "100%" }}>
            {[["Revenue", "$48,210", "up", "12.4%", [40, 55, 35, 70, 60, 90, 100]],
              ["Active users", "3,942", "up", "8.1%", [50, 45, 60, 55, 75, 80, 95]],
              ["Conversion", "3.18%", "down", "1.2%", [80, 70, 85, 60, 65, 50, 55]],
              ["Churn", "1.9%", "up", "0.4%", [60, 55, 65, 40, 45, 35, 30]]].map(([label, num, dir, pct, bars]) => (
              <Card className="stat" key={label}>
                <div className="s-top"><span className="s-label">{label}</span><span className={"delta " + dir}>{dir === "up" ? <Up /> : <Down />}{pct}</span></div>
                <div className="s-num">{num}</div>
                <Spark bars={bars.map((v, i) => ({ v, hi: i >= 5 }))} />
              </Card>
            ))}
          </div>
        ),
        code: `<div className="stat-row">
  <Card className="stat">
    <div className="s-top">
      <span className="s-label">Revenue</span>
      <span className="delta up"><Up />12.4%</span>
    </div>
    <div className="s-num">$48,210</div>
    <Spark bars={[40, 55, 35, 70, 60, 90, 100]} />
  </Card>
  {/* …repeat for Active users, Conversion, Churn */}
</div>`,
      },
      {
        name: "Goal progress card",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 360 }}>
            <div className="feather-card-head"><h3 className="feather-card-title">Quarterly goals</h3><Badge variant="soft" dot>On track</Badge></div>
            <div className="feather-card-body goal">
              <div className="goal-row"><div className="gl"><b>New revenue</b><span>$48k / $60k</span></div><Progress value={80} /></div>
              <div className="goal-row"><div className="gl"><b>Signups</b><span>3.9k / 5k</span></div><Progress value={78} /></div>
              <div className="goal-row"><div className="gl"><b>Retention</b><span>92% / 95%</span></div><Progress value={92} /></div>
            </div>
          </Card>
        ),
        code: `<Card>
  <div className="feather-card-head">
    <h3 className="feather-card-title">Quarterly goals</h3>
    <Badge variant="soft" dot>On track</Badge>
  </div>
  <div className="feather-card-body goal">
    <div className="goal-row">
      <div className="gl"><b>New revenue</b><span>$48k / $60k</span></div>
      <Progress value={80} />
    </div>
    {/* …more goals */}
  </div>
</Card>`,
      },
      {
        name: "Metric with trend",
        render: () => (
          <Card style={{ width: 280 }}>
            <CardBody>
              <Overline>Monthly recurring revenue</Overline>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "8px 0 12px" }}>
                <Metric unit="MRR">$48,210</Metric>
                <span className="delta up"><Up />12.4%</span>
              </div>
              <Spark bars={[38, 46, 42, 58, 54, 68, 80, 72, 100].map((v, i) => ({ v, hi: i >= 6 }))} />
              <Muted as="p" style={{ marginTop: 12 }}>vs $42,900 last month</Muted>
            </CardBody>
          </Card>
        ),
        code: `<Card>
  <CardBody>
    <Overline>Monthly recurring revenue</Overline>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <Metric unit="MRR">$48,210</Metric>
      <span className="delta up"><Up />12.4%</span>
    </div>
    <Spark bars={[38, 46, 42, 58, 54, 68, 80, 72, 100]} />
    <Muted as="p">vs $42,900 last month</Muted>
  </CardBody>
</Card>`,
      },
      {
        name: "Revenue chart card",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 460 }}>
            <div className="feather-card-head"><div><h3 className="feather-card-title">Revenue</h3><p className="feather-card-desc">Last 9 months</p></div><Badge variant="soft" dot>Live</Badge></div>
            <div className="feather-card-body" style={{ paddingBottom: 14 }}>
              <div className="chart">
                {[["Oct", 38, 1], ["Nov", 46, 1], ["Dec", 42, 1], ["Jan", 58, 1], ["Feb", 54, 1], ["Mar", 68, 1], ["Apr", 80], ["May", 72], ["Jun", 100]].map(([m, h, soft]) => (
                  <div className="col" key={m}><div className={"bar" + (soft ? " soft" : "")} style={{ height: h + "%" }} /><span>{m}</span></div>
                ))}
              </div>
            </div>
          </Card>
        ),
        code: `<Card>
  <div className="feather-card-head">
    <div><h3 className="feather-card-title">Revenue</h3><p className="feather-card-desc">Last 9 months</p></div>
    <Badge variant="soft" dot>Live</Badge>
  </div>
  <div className="feather-card-body">
    <div className="chart">
      {months.map((m) => (
        <div className="col" key={m.label}>
          <div className="bar" style={{ height: m.value + "%" }} />
          <span>{m.label}</span>
        </div>
      ))}
    </div>
  </div>
</Card>`,
      },
    ],
  },
  {
    slug: "tables",
    name: "Tables & lists",
    desc: "Data tables, activity feeds and ranked lists for the busy parts of an app.",
    blocks: [
      {
        name: "Customers table",
        render: () => (
          <Card style={{ width: "100%" }}>
            <Table>
              <thead><tr><th>Customer</th><th>Plan</th><th>Status</th><th className="feather-num">Amount</th><th /></tr></thead>
              <tbody>
                {[["MK", "#109488", "Mara Kessler", "mara@northwind.io", "Pro", "soft", "Paid", "$290"],
                  ["DT", "#2F5FD0", "Devon Tate", "devon@acme.dev", "Team", "outline", "Pending", "$79"],
                  ["RB", "#6D4AE0", "Rohan Bhatt", "rohan@flux.app", "Starter", "danger", "Failed", "$9"]].map((r) => (
                  <tr key={r[2]}>
                    <td><div className="cell-u"><Avatar initials={r[0]} style={grad(r[1], "#9a7cf0")} /><div className="nm"><b>{r[2]}</b><span>{r[3]}</span></div></div></td>
                    <td>{r[4]}</td>
                    <td><Badge variant={r[5]} dot={r[5] !== "outline"}>{r[6]}</Badge></td>
                    <td className="feather-num">{r[7]}</td>
                    <td><Menu trigger={<Dots />}><button>View</button><button>Edit</button><hr /><button className="feather-menu-danger">Remove</button></Menu></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ),
        code: `<Card>
  <Table>
    <thead><tr><th>Customer</th><th>Plan</th><th>Status</th><th className="feather-num">Amount</th><th /></tr></thead>
    <tbody>
      <tr>
        <td>
          <div className="cell-u">
            <Avatar initials="MK" />
            <div className="nm"><b>Mara Kessler</b><span>mara@northwind.io</span></div>
          </div>
        </td>
        <td>Pro</td>
        <td><Badge variant="soft" dot>Paid</Badge></td>
        <td className="feather-num">$290</td>
        <td>
          <Menu trigger={<Dots />}>
            <button>View</button><button>Edit</button>
            <hr /><button className="feather-menu-danger">Remove</button>
          </Menu>
        </td>
      </tr>
    </tbody>
  </Table>
</Card>`,
      },
      {
        name: "Activity feed",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 380 }}>
            <div className="feather-card-head"><h3 className="feather-card-title">Activity</h3></div>
            <ul className="bk-feed">
              {[["MK", "#109488", "Mara Kessler", "deployed to production", "2h ago"],
                ["DT", "#2F5FD0", "Devon Tate", "opened a pull request", "5h ago"],
                ["RB", "#6D4AE0", "Rohan Bhatt", "left a comment", "Yesterday"]].map((r) => (
                <li key={r[2]}>
                  <Avatar initials={r[0]} style={grad(r[1], "#9a7cf0")} />
                  <div><Text as="div"><b>{r[2]}</b> {r[3]}</Text><Muted>{r[4]}</Muted></div>
                </li>
              ))}
            </ul>
          </Card>
        ),
        code: `<Card>
  <div className="feather-card-head"><h3 className="feather-card-title">Activity</h3></div>
  <ul className="bk-feed">
    {events.map((e) => (
      <li key={e.id}>
        <Avatar initials={e.who} />
        <div>
          <Text as="div"><b>{e.name}</b> {e.action}</Text>
          <Muted>{e.time}</Muted>
        </div>
      </li>
    ))}
  </ul>
</Card>`,
      },
      {
        name: "Leaderboard",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 380 }}>
            <div className="feather-card-head"><h3 className="feather-card-title">Top pages</h3><Muted>30 days</Muted></div>
            <div className="feather-card-body" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["/pricing", 92, "8.2k"], ["/blog/launch", 71, "6.4k"], ["/docs", 58, "5.1k"], ["/changelog", 34, "3.0k"]].map((r) => (
                <div className="bk-rank" key={r[0]}>
                  <div className="bk-rank-bar"><i style={{ width: r[1] + "%" }} /><span className="bk-rank-label">{r[0]}</span></div>
                  <span className="bk-rank-val">{r[2]}</span>
                </div>
              ))}
            </div>
          </Card>
        ),
        code: `<Card>
  <div className="feather-card-head">
    <h3 className="feather-card-title">Top pages</h3>
    <Muted>30 days</Muted>
  </div>
  <div className="feather-card-body">
    {pages.map((p) => (
      <div className="bk-rank" key={p.path}>
        <div className="bk-rank-bar">
          <i style={{ width: p.pct + "%" }} />
          <span className="bk-rank-label">{p.path}</span>
        </div>
        <span className="bk-rank-val">{p.views}</span>
      </div>
    ))}
  </div>
</Card>`,
      },
      {
        name: "List with actions",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 400 }}>
            <ul className="bk-list">
              {[["Design refresh", "acme-web", "soft", "On track"],
                ["Mobile app v2", "acme-mobile", "danger", "At risk"],
                ["Billing migration", "acme-payments", "outline", "Paused"]].map((r) => (
                <li key={r[0]}>
                  <div className="cell-u"><Avatar initials={r[0].slice(0, 2).toUpperCase()} /><div className="nm"><b>{r[0]}</b><span>{r[1]}</span></div></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Badge variant={r[2]} dot={r[2] !== "outline"}>{r[3]}</Badge>
                    <Menu trigger={<Dots />}><button>Open</button><button>Archive</button></Menu>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ),
        code: `<Card>
  <ul className="bk-list">
    {projects.map((p) => (
      <li key={p.id}>
        <div className="cell-u">
          <Avatar initials={p.initials} />
          <div className="nm"><b>{p.name}</b><span>{p.repo}</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Badge variant="soft" dot>{p.status}</Badge>
          <Menu trigger={<Dots />}>
            <button>Open</button><button>Archive</button>
          </Menu>
        </div>
      </li>
    ))}
  </ul>
</Card>`,
      },
    ],
  },
  {
    slug: "forms",
    name: "Forms & auth",
    desc: "Sign-in, sign-up, settings and toolbars — the input-heavy screens, ready to drop in.",
    blocks: [
      {
        name: "Sign in",
        render: () => (
          <Card style={{ width: 340 }}>
            <CardBody style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><Heading level={3}>Welcome back</Heading><Muted as="p" style={{ marginTop: 4 }}>Sign in to continue to Acme.</Muted></div>
              <Input label="Email" type="email" defaultValue="jordan@acme.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <div className="row-between">
                <Checkbox label="Remember me" defaultChecked />
                <span className="link">Forgot password?</span>
              </div>
              <Button variant="primary" className="feather-button-block">Sign in</Button>
              <div className="divider">or</div>
              <Button variant="outline" className="feather-button-block">Continue with GitHub</Button>
            </CardBody>
          </Card>
        ),
        code: `<Card>
  <CardBody style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <Heading level={3}>Welcome back</Heading>
    <Muted as="p">Sign in to continue to Acme.</Muted>
    <Input label="Email" type="email" />
    <Input label="Password" type="password" placeholder="••••••••" />
    <div className="row-between">
      <Checkbox label="Remember me" defaultChecked />
      <span className="link">Forgot password?</span>
    </div>
    <Button variant="primary" className="feather-button-block">Sign in</Button>
    <div className="divider">or</div>
    <Button variant="outline" className="feather-button-block">Continue with GitHub</Button>
  </CardBody>
</Card>`,
      },
      {
        name: "Sign up",
        render: () => (
          <Card style={{ width: 340 }}>
            <CardBody style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div><Heading level={3}>Create your account</Heading><Muted as="p" style={{ marginTop: 4 }}>Start your 14-day free trial.</Muted></div>
              <div className="row2"><Input label="First name" defaultValue="Jordan" /><Input label="Last name" defaultValue="Shaw" /></div>
              <Input label="Work email" type="email" placeholder="you@company.com" />
              <Input label="Password" type="password" placeholder="8+ characters" hint="Use a mix of letters, numbers and symbols." />
              <Checkbox label="I agree to the Terms & Privacy Policy" defaultChecked />
              <Button variant="primary" className="feather-button-block">Create account</Button>
            </CardBody>
          </Card>
        ),
        code: `<Card>
  <CardBody style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <Heading level={3}>Create your account</Heading>
    <Muted as="p">Start your 14-day free trial.</Muted>
    <div className="row2">
      <Input label="First name" />
      <Input label="Last name" />
    </div>
    <Input label="Work email" type="email" placeholder="you@company.com" />
    <Input label="Password" type="password" hint="Use letters, numbers and symbols." />
    <Checkbox label="I agree to the Terms & Privacy Policy" defaultChecked />
    <Button variant="primary" className="feather-button-block">Create account</Button>
  </CardBody>
</Card>`,
      },
      {
        name: "Profile settings",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 460 }}>
            <div className="feather-card-head"><div><h3 className="feather-card-title">Profile</h3><p className="feather-card-desc">This is how others see you.</p></div></div>
            <CardBody style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="avatar-row"><Avatar className="avatar-lg" initials="JS" style={grad("#6D4AE0", "#9a7cf0")} /><div style={{ display: "flex", gap: 8 }}><Button variant="outline" size="sm">Upload</Button><Button variant="ghost" size="sm">Remove</Button></div></div>
              <div className="row2"><Input label="First name" defaultValue="Jordan" /><Input label="Last name" defaultValue="Shaw" /></div>
              <div className="feather-field"><label className="feather-label">Role</label><Select><option>Owner</option><option>Admin</option><option>Member</option></Select></div>
              <Switch title="Make profile public" description="Anyone with the link can view it." defaultChecked />
            </CardBody>
            <div className="feather-card-foot"><Button variant="ghost">Cancel</Button><Button variant="primary">Save changes</Button></div>
          </Card>
        ),
        code: `<Card>
  <div className="feather-card-head">
    <div><h3 className="feather-card-title">Profile</h3><p className="feather-card-desc">This is how others see you.</p></div>
  </div>
  <CardBody style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="avatar-row">
      <Avatar className="avatar-lg" initials="JS" />
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="outline" size="sm">Upload</Button>
        <Button variant="ghost" size="sm">Remove</Button>
      </div>
    </div>
    <div className="row2"><Input label="First name" /><Input label="Last name" /></div>
    <div className="feather-field">
      <label className="feather-label">Role</label>
      <Select><option>Owner</option><option>Admin</option></Select>
    </div>
    <Switch title="Make profile public" description="Anyone with the link can view it." defaultChecked />
  </CardBody>
  <div className="feather-card-foot">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save changes</Button>
  </div>
</Card>`,
      },
      {
        name: "Search & filter toolbar",
        render: () => (
          <div className="bk-toolbar" style={{ width: "100%" }}>
            <div className="bk-search"><SearchIcon /><Input placeholder="Search projects…" /></div>
            <div style={{ width: 150 }}><Select><option>All statuses</option><option>On track</option><option>At risk</option></Select></div>
            <div style={{ flex: 1 }} />
            <Button variant="outline" size="sm">Filters</Button>
            <Button variant="primary" size="sm"><Plus /> New</Button>
          </div>
        ),
        code: `<div className="bk-toolbar">
  <div className="bk-search">
    <SearchIcon />
    <Input placeholder="Search projects…" />
  </div>
  <Select><option>All statuses</option><option>On track</option></Select>
  <div style={{ flex: 1 }} />
  <Button variant="outline" size="sm">Filters</Button>
  <Button variant="primary" size="sm"><Plus /> New</Button>
</div>`,
      },
    ],
  },
  {
    slug: "headers",
    name: "Headers & toolbars",
    desc: "Page headers, tabbed sections and command bars that anchor the top of a view.",
    blocks: [
      {
        name: "Page header with actions",
        render: () => (
          <div className="bk-header" style={{ width: "100%" }}>
            <div>
              <Overline>Workspace</Overline>
              <Heading level={2} style={{ marginTop: 4 }}>Projects</Heading>
              <Muted as="p" style={{ marginTop: 4 }}>14 active projects across 3 teams.</Muted>
            </div>
            <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
              <Button variant="outline">Export</Button>
              <Button variant="primary"><Plus /> New project</Button>
            </div>
          </div>
        ),
        code: `<div className="bk-header">
  <div>
    <Overline>Workspace</Overline>
    <Heading level={2}>Projects</Heading>
    <Muted as="p">14 active projects across 3 teams.</Muted>
  </div>
  <div style={{ display: "flex", gap: 9 }}>
    <Button variant="outline">Export</Button>
    <Button variant="primary"><Plus /> New project</Button>
  </div>
</div>`,
      },
      {
        name: "Tabbed section",
        render: () => (
          <div style={{ width: "100%", maxWidth: 460 }}>
            <div className="bk-header" style={{ marginBottom: 12 }}>
              <Heading level={3}>Settings</Heading>
              <Button variant="primary" size="sm">Save</Button>
            </div>
            <Tabs items={[
              { label: "General", content: <Text>Workspace name, URL and timezone.</Text> },
              { label: "Members", content: <Text>Invite teammates and manage roles.</Text> },
              { label: "Billing", content: <Text>Plan, invoices and payment method.</Text> },
            ]} />
          </div>
        ),
        code: `<div className="bk-header">
  <Heading level={3}>Settings</Heading>
  <Button variant="primary" size="sm">Save</Button>
</div>
<Tabs items={[
  { label: "General", content: <General /> },
  { label: "Members", content: <Members /> },
  { label: "Billing", content: <Billing /> },
]} />`,
      },
      {
        name: "Card header with menu",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 420 }}>
            <div className="feather-card-head">
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <Avatar initials="AC" style={grad("#109488", "#46c4b6")} />
                <div><h3 className="feather-card-title">Acme Inc.</h3><p className="feather-card-desc">Pro plan · 12 members</p></div>
              </div>
              <Menu trigger={<Dots />}><button>Settings</button><button>Invite</button><hr /><button className="feather-menu-danger">Leave</button></Menu>
            </div>
            <CardBody><Text>Manage your workspace, members and billing from one place.</Text></CardBody>
          </Card>
        ),
        code: `<Card>
  <div className="feather-card-head">
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <Avatar initials="AC" />
      <div><h3 className="feather-card-title">Acme Inc.</h3><p className="feather-card-desc">Pro plan · 12 members</p></div>
    </div>
    <Menu trigger={<Dots />}>
      <button>Settings</button><button>Invite</button>
      <hr /><button className="feather-menu-danger">Leave</button>
    </Menu>
  </div>
  <CardBody><Text>Manage your workspace…</Text></CardBody>
</Card>`,
      },
      {
        name: "Filter chips bar",
        render: () => (
          <div className="bk-toolbar" style={{ width: "100%" }}>
            <Muted>Filters:</Muted>
            <Badge variant="soft" dot>Active</Badge>
            <Badge variant="outline">Pro plan</Badge>
            <Badge variant="outline">This month</Badge>
            <div style={{ flex: 1 }} />
            <Button variant="ghost" size="sm">Clear all</Button>
          </div>
        ),
        code: `<div className="bk-toolbar">
  <Muted>Filters:</Muted>
  <Badge variant="soft" dot>Active</Badge>
  <Badge variant="outline">Pro plan</Badge>
  <Badge variant="outline">This month</Badge>
  <div style={{ flex: 1 }} />
  <Button variant="ghost" size="sm">Clear all</Button>
</div>`,
      },
    ],
  },
  {
    slug: "marketing",
    name: "Pricing & marketing",
    desc: "Pricing tiers, feature grids, CTAs and testimonials for the front of the funnel.",
    blocks: [
      {
        name: "Pricing tiers",
        render: () => (
          <div className="tiers" style={{ width: "100%" }}>
            {[["Starter", "For individuals.", "$0", ["1 project", "Community support", "1 GB storage"], "outline", "Get started"],
              ["Pro", "For growing teams.", "$29", ["Unlimited projects", "Priority support", "100 GB storage", "Analytics"], "primary", "Start trial", true],
              ["Enterprise", "For scale.", "$79", ["SSO & SCIM", "Dedicated manager", "99.99% SLA"], "secondary", "Contact sales"]].map((t) => (
              <Card className={"tier" + (t[6] ? " popular" : "")} key={t[0]}>
                <div className="t-name">{t[0]}{t[6] && <Badge variant="soft">Popular</Badge>}</div>
                <div className="t-desc">{t[1]}</div>
                <div className="price">{t[2]}<small>/mo</small></div>
                <ul className="feat-list">{t[3].map((f) => <li key={f}><Check /> {f}</li>)}</ul>
                <Button variant={t[4]} className="feather-button-block">{t[5]}</Button>
              </Card>
            ))}
          </div>
        ),
        code: `<div className="tiers">
  <Card className="tier popular">
    <div className="t-name">Pro <Badge variant="soft">Popular</Badge></div>
    <div className="t-desc">For growing teams.</div>
    <div className="price">$29<small>/mo</small></div>
    <ul className="feat-list">
      <li><Check /> Unlimited projects</li>
      <li><Check /> Priority support</li>
    </ul>
    <Button variant="primary" className="feather-button-block">Start trial</Button>
  </Card>
  {/* …Starter and Enterprise */}
</div>`,
      },
      {
        name: "Feature grid",
        render: () => (
          <div className="bk-features" style={{ width: "100%" }}>
            {[["Fast", "Built on browser primitives, so a handful of components is about a kilobyte."],
              ["Accessible", "Keyboard and screen-reader behavior come from the native elements."],
              ["Themeable", "Restyle everything by overriding a few --fk-* CSS variables."],
              ["Zero deps", "React is the only peer dependency. Nothing else to audit."]].map((f) => (
              <div className="bk-feature" key={f[0]}>
                <span className="bk-feature-ic"><Check /></span>
                <div><Text as="div" style={{ fontWeight: 650, color: "var(--fk-ink)" }}>{f[0]}</Text><Muted as="p" style={{ marginTop: 3 }}>{f[1]}</Muted></div>
              </div>
            ))}
          </div>
        ),
        code: `<div className="bk-features">
  {features.map((f) => (
    <div className="bk-feature" key={f.title}>
      <span className="bk-feature-ic"><Check /></span>
      <div>
        <Text as="div" style={{ fontWeight: 650 }}>{f.title}</Text>
        <Muted as="p">{f.body}</Muted>
      </div>
    </div>
  ))}
</div>`,
      },
      {
        name: "CTA banner",
        render: () => (
          <div className="bk-cta" style={{ width: "100%" }}>
            <div>
              <Heading level={3} style={{ color: "var(--fk-on-accent)" }}>Ready to ship faster?</Heading>
              <p style={{ color: "var(--fk-on-accent)", opacity: 0.85, margin: "6px 0 0", fontSize: 14 }}>Start free — no credit card required.</p>
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <Button variant="secondary">Talk to sales</Button>
              <button className="bk-cta-btn">Get started →</button>
            </div>
          </div>
        ),
        code: `<div className="bk-cta">
  <div>
    <Heading level={3}>Ready to ship faster?</Heading>
    <p>Start free — no credit card required.</p>
  </div>
  <div style={{ display: "flex", gap: 9 }}>
    <Button variant="secondary">Talk to sales</Button>
    <button className="bk-cta-btn">Get started →</button>
  </div>
</div>`,
      },
      {
        name: "Testimonial",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 460 }}>
            <CardBody>
              <p className="bk-quote">"We shipped our whole dashboard in a weekend. The components just got out of the way."</p>
              <div className="cell-u" style={{ marginTop: 16 }}>
                <Avatar initials="MK" style={grad("#109488", "#46c4b6")} />
                <div className="nm"><b>Mara Kessler</b><span>Head of Product, Northwind</span></div>
              </div>
            </CardBody>
          </Card>
        ),
        code: `<Card>
  <CardBody>
    <p className="bk-quote">"We shipped our whole dashboard in a weekend…"</p>
    <div className="cell-u" style={{ marginTop: 16 }}>
      <Avatar initials="MK" />
      <div className="nm"><b>Mara Kessler</b><span>Head of Product, Northwind</span></div>
    </div>
  </CardBody>
</Card>`,
      },
    ],
  },
  {
    slug: "feedback",
    name: "Feedback & overlays",
    desc: "Empty states, alerts, confirmations and notifications — the moments that need attention.",
    blocks: [
      {
        name: "Empty state",
        render: () => (
          <Card style={{ width: "100%", maxWidth: 420 }}>
            <div className="bk-empty">
              <span className="bk-empty-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg></span>
              <Heading level={3}>No projects yet</Heading>
              <Muted as="p" style={{ maxWidth: "32ch", margin: "6px 0 16px" }}>Create your first project to start deploying and tracking it here.</Muted>
              <Button variant="primary"><Plus /> New project</Button>
            </div>
          </Card>
        ),
        code: `<Card>
  <div className="bk-empty">
    <span className="bk-empty-ic"><FolderIcon /></span>
    <Heading level={3}>No projects yet</Heading>
    <Muted as="p">Create your first project to start deploying.</Muted>
    <Button variant="primary"><Plus /> New project</Button>
  </div>
</Card>`,
      },
      {
        name: "Inline alerts",
        render: () => (
          <div style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="bk-alert info"><span className="bk-alert-dot" /><div><b>Heads up.</b> Your trial ends in 5 days.</div></div>
            <div className="bk-alert warn"><span className="bk-alert-dot" /><div><b>Action needed.</b> Verify your email to keep deploying.</div></div>
            <div className="bk-alert danger"><span className="bk-alert-dot" /><div><b>Payment failed.</b> Update your card to avoid interruption.</div></div>
          </div>
        ),
        code: `<div className="bk-alert info">
  <span className="bk-alert-dot" />
  <div><b>Heads up.</b> Your trial ends in 5 days.</div>
</div>
<div className="bk-alert warn">…</div>
<div className="bk-alert danger">…</div>`,
      },
      {
        name: "Confirmation dialog",
        render: () => <ConfirmBlock />,
        code: `const [open, setOpen] = useState(false);

<Button variant="destructive" onClick={() => setOpen(true)}>Delete project</Button>

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogBody>
    <h3>Delete project?</h3>
    <p>This permanently removes the project. This can't be undone.</p>
  </DialogBody>
  <DialogFoot>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
  </DialogFoot>
</Dialog>`,
      },
      {
        name: "Toast on save",
        render: () => <ToastBlock />,
        code: `// once, near the root:
<ToastProvider><App /></ToastProvider>

// in your component:
const toast = useToast();

<Button onClick={() => toast({ title: "Changes saved", desc: "Your settings are up to date." })}>
  Save changes
</Button>`,
      },
    ],
  },
];

export const ALL_CATS = CATEGORIES;
