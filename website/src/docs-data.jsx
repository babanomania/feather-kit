import { useState } from "react";
import {
  Button, Input, Select, Checkbox, Radio, Switch, Slider, Badge, Avatar, AvatarGroup,
  Progress, Card, CardHead, CardTitle, CardDesc, CardBody, CardFoot, Table, Tabs,
  Accordion, Tooltip, Menu, Dialog, DialogBody, DialogFoot, useToast,
  Overline, Heading, Lead, Text, Muted, Metric,
} from "feather-ui-kit";

const grad = (a, b) => ({ background: `linear-gradient(135deg, ${a}, ${b})` });

// components that manage their own open/fire state for the playground
function DialogDemo({ title, body }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBody><h3>{title}</h3><p>{body}</p></DialogBody>
        <DialogFoot>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setOpen(false)}>Delete</Button>
        </DialogFoot>
      </Dialog>
    </>
  );
}
function ToastDemo({ title, desc }) {
  const toast = useToast();
  return <Button variant="primary" onClick={() => toast({ title, desc })}>Show toast</Button>;
}

export const DOCS = [
  {
    group: "Foundation",
    items: [
      {
        slug: "typography",
        name: "Typography",
        desc: "A small type scale — overline, headings, title, lead, body, muted text and tabular metrics — all reading from the --fk-* tokens.",
        import: `import { Overline, Heading, Title, Lead, Text, Muted, Metric } from "feather-ui-kit";`,
        defaults: { text: "Type that carries the brand", level: 2 },
        controls: [
          { key: "text", type: "text", label: "Heading text" },
          { key: "level", type: "range", label: "level", min: 1, max: 3 },
        ],
        render: (p) => (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
            <Overline>Analytics overview</Overline>
            <Heading level={p.level}>{p.text}</Heading>
            <Lead>A lead paragraph for intros and section blurbs.</Lead>
            <Text>Body text for everything else in the interface.</Text>
            <Metric unit="MRR">$48,210</Metric>
            <Muted>Updated 2h ago</Muted>
          </div>
        ),
        code: (p) => `<Overline>Analytics overview</Overline>
<Heading level={${p.level}}>${p.text}</Heading>
<Lead>A lead paragraph for intros.</Lead>
<Text>Body text for everything else.</Text>
<Metric unit="MRR">$48,210</Metric>
<Muted>Updated 2h ago</Muted>`,
        props: [
          { name: "Heading level", type: "1 | 2 | 3", def: "2", desc: "Renders <h1|h2|h3> with the matching size." },
          { name: "Metric unit", type: "ReactNode", def: "—", desc: "Small trailing unit label (e.g. MRR)." },
          { name: "Metric size", type: '"sm"', def: "—", desc: "Smaller metric variant." },
          { name: "Title / Lead / Text / Muted as", type: "ElementType", def: "h3 / p / p / span", desc: "Override the rendered element." },
        ],
      },
    ],
  },
  {
    group: "Inputs",
    items: [
      {
        slug: "button",
        name: "Button",
        desc: "Five variants and a small size, all pure CSS. Forwards every native <button> prop (onClick, type, disabled…).",
        import: `import Button from "feather-ui-kit/button";`,
        defaults: { variant: "primary", size: "default", disabled: false, label: "Deploy" },
        controls: [
          { key: "variant", type: "enum", label: "variant", options: ["primary", "secondary", "outline", "ghost", "destructive"] },
          { key: "size", type: "enum", label: "size", options: ["default", "sm"] },
          { key: "disabled", type: "boolean", label: "disabled" },
          { key: "label", type: "text", label: "label" },
        ],
        render: (p) => <Button variant={p.variant} size={p.size === "sm" ? "sm" : undefined} disabled={p.disabled}>{p.label}</Button>,
        code: (p) => `<Button variant="${p.variant}"${p.size === "sm" ? ' size="sm"' : ""}${p.disabled ? " disabled" : ""}>${p.label}</Button>`,
        props: [
          { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', def: '"primary"', desc: "Visual style." },
          { name: "size", type: '"sm"', def: "—", desc: "Compact height." },
          { name: "className", type: "string", def: "—", desc: "Appended to feather-button." },
          { name: "...rest", type: "button props", def: "—", desc: "onClick, type, disabled, etc." },
        ],
      },
      {
        slug: "input",
        name: "Input",
        desc: "A text field with an optional label and hint. Pass label or hint and it renders the field wrapper for you; otherwise it's a bare <input>.",
        import: `import Input from "feather-ui-kit/input";`,
        defaults: { label: "Email", placeholder: "you@example.com", hint: "We'll never share it.", type: "text", value: "" },
        controls: [
          { key: "label", type: "text", label: "label" },
          { key: "placeholder", type: "text", label: "placeholder" },
          { key: "hint", type: "text", label: "hint" },
          { key: "type", type: "enum", label: "type", options: ["text", "email", "password"] },
        ],
        render: (p, set) => (
          <div style={{ width: 280 }}>
            <Input label={p.label || undefined} placeholder={p.placeholder} hint={p.hint || undefined} type={p.type} value={p.value} onChange={(e) => set("value", e.target.value)} />
          </div>
        ),
        code: (p) => `<Input\n  label="${p.label}"\n  placeholder="${p.placeholder}"${p.hint ? `\n  hint="${p.hint}"` : ""}${p.type !== "text" ? `\n  type="${p.type}"` : ""}\n/>`,
        props: [
          { name: "label", type: "ReactNode", def: "—", desc: "Renders a <label> above the input." },
          { name: "hint", type: "ReactNode", def: "—", desc: "Small helper text below the input." },
          { name: "id", type: "string", def: "auto", desc: "Wires label htmlFor; auto-generated if omitted." },
          { name: "...rest", type: "input props", def: "—", desc: "value, placeholder, type, onChange, etc." },
        ],
      },
      {
        slug: "select",
        name: "Select",
        desc: "A native <select> with appearance:none and a CSS chevron. All the accessibility and keyboard behavior is the browser's.",
        import: `import Select from "feather-ui-kit/select";`,
        defaults: { value: "Owner", disabled: false },
        controls: [{ key: "disabled", type: "boolean", label: "disabled" }],
        render: (p, set) => (
          <div style={{ width: 220 }}>
            <Select value={p.value} disabled={p.disabled} onChange={(e) => set("value", e.target.value)}>
              <option>Owner</option><option>Editor</option><option>Viewer</option>
            </Select>
          </div>
        ),
        code: (p) => `<Select value={value} onChange={onChange}${p.disabled ? " disabled" : ""}>\n  <option>Owner</option>\n  <option>Editor</option>\n  <option>Viewer</option>\n</Select>`,
        props: [
          { name: "children", type: "<option>[]", def: "—", desc: "The options." },
          { name: "...rest", type: "select props", def: "—", desc: "value, onChange, disabled, etc." },
        ],
      },
      {
        slug: "checkbox",
        name: "Checkbox",
        desc: "A custom box with an SVG checkmark over a real <input type=checkbox>. Click it or use the knob — they stay in sync.",
        import: `import Checkbox from "feather-ui-kit/checkbox";`,
        defaults: { label: "Accept terms", checked: true, disabled: false },
        controls: [
          { key: "label", type: "text", label: "label" },
          { key: "disabled", type: "boolean", label: "disabled" },
        ],
        render: (p, set) => <Checkbox label={p.label} checked={p.checked} disabled={p.disabled} onChange={(e) => set("checked", e.target.checked)} />,
        code: (p) => `<Checkbox label="${p.label}" ${p.checked ? "defaultChecked " : ""}/>`,
        props: [
          { name: "label", type: "ReactNode", def: "—", desc: "Text next to the box." },
          { name: "...rest", type: "input props", def: "—", desc: "checked / defaultChecked, onChange, disabled." },
        ],
      },
      {
        slug: "radio",
        name: "Radio",
        desc: "A custom dot radio. Group several with a shared name; the browser handles single-selection.",
        import: `import Radio from "feather-ui-kit/radio";`,
        defaults: { selected: "monthly" },
        controls: [],
        render: (p, set) => (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["monthly", "yearly"].map((v) => (
              <Radio key={v} name="doc-radio" label={`${v[0].toUpperCase()}${v.slice(1)} billing`} checked={p.selected === v} onChange={() => set("selected", v)} />
            ))}
          </div>
        ),
        code: () => `<Radio name="plan" label="Monthly billing" defaultChecked />\n<Radio name="plan" label="Yearly billing" />`,
        props: [
          { name: "label", type: "ReactNode", def: "—", desc: "Text next to the dot." },
          { name: "...rest", type: "input props", def: "—", desc: "name, checked / defaultChecked, onChange." },
        ],
      },
      {
        slug: "switch",
        name: "Switch",
        desc: "A sliding toggle. Pass a label, or pass title + description for a full settings row.",
        import: `import Switch from "feather-ui-kit/switch";`,
        defaults: { label: "Notifications", checked: true, disabled: false },
        controls: [
          { key: "label", type: "text", label: "label" },
          { key: "disabled", type: "boolean", label: "disabled" },
        ],
        render: (p, set) => <Switch label={p.label} checked={p.checked} disabled={p.disabled} onChange={(e) => set("checked", e.target.checked)} />,
        code: (p) => `<Switch label="${p.label}" ${p.checked ? "defaultChecked " : ""}/>\n\n// or a settings row:\n<Switch\n  title="Private repository"\n  description="Only invited members can see it."\n  defaultChecked\n/>`,
        props: [
          { name: "label", type: "ReactNode", def: "—", desc: "Inline label (simple mode)." },
          { name: "title", type: "ReactNode", def: "—", desc: "Bold title (row mode)." },
          { name: "description", type: "ReactNode", def: "—", desc: "Sub-text under the title (row mode)." },
          { name: "...rest", type: "input props", def: "—", desc: "checked / defaultChecked, onChange." },
        ],
      },
      {
        slug: "slider",
        name: "Slider",
        desc: "An <input type=range> tinted with accent-color, with an optional live value readout.",
        import: `import Slider from "feather-ui-kit/slider";`,
        defaults: { label: "Volume", value: 68, showValue: true },
        controls: [
          { key: "label", type: "text", label: "label" },
          { key: "showValue", type: "boolean", label: "showValue" },
        ],
        render: (p, set) => (
          <div style={{ width: 300 }}>
            <Slider label={p.label || undefined} min={0} max={100} value={p.value} showValue={p.showValue} onChange={(e) => set("value", +e.target.value)} />
          </div>
        ),
        code: (p) => `<Slider\n  label="${p.label}"\n  min={0} max={100}\n  value={${p.value}} onChange={onChange}${p.showValue ? "\n  showValue" : ""}\n/>`,
        props: [
          { name: "label", type: "ReactNode", def: "—", desc: "Text before the track." },
          { name: "showValue", type: "boolean", def: "false", desc: "Show the current value after the track." },
          { name: "...rest", type: "range props", def: "—", desc: "min, max, step, value, onChange." },
        ],
      },
    ],
  },
  {
    group: "Data display",
    items: [
      {
        slug: "badge",
        name: "Badge",
        desc: "A small status pill. Four variants, plus an optional leading dot.",
        import: `import Badge from "feather-ui-kit/badge";`,
        defaults: { variant: "soft", dot: true, label: "Live" },
        controls: [
          { key: "variant", type: "enum", label: "variant", options: ["solid", "soft", "outline", "danger"] },
          { key: "dot", type: "boolean", label: "dot" },
          { key: "label", type: "text", label: "label" },
        ],
        render: (p) => <Badge variant={p.variant} dot={p.dot}>{p.label}</Badge>,
        code: (p) => `<Badge variant="${p.variant}"${p.dot ? " dot" : ""}>${p.label}</Badge>`,
        props: [
          { name: "variant", type: '"solid" | "soft" | "outline" | "danger"', def: '"soft"', desc: "Visual style." },
          { name: "dot", type: "boolean", def: "false", desc: "Show a leading status dot." },
        ],
      },
      {
        slug: "avatar",
        name: "Avatar",
        desc: "An initials (or image) circle with an accent gradient. Stack several with AvatarGroup.",
        import: `import Avatar, { AvatarGroup } from "feather-ui-kit/avatar";`,
        defaults: { initials: "FK" },
        controls: [{ key: "initials", type: "text", label: "initials" }],
        render: (p) => (
          <AvatarGroup>
            <Avatar initials={p.initials} />
            <Avatar initials="RS" style={grad("#6D4AE0", "#9a7cf0")} />
            <Avatar initials="MT" style={grad("#2F5FD0", "#6f93e8")} />
            <Avatar className="feather-avatar-more" initials="+5" />
          </AvatarGroup>
        ),
        code: (p) => `<AvatarGroup>\n  <Avatar initials="${p.initials}" />\n  <Avatar initials="RS" />\n  <Avatar className="feather-avatar-more" initials="+5" />\n</AvatarGroup>`,
        props: [
          { name: "initials", type: "string", def: "—", desc: "Shown when no src is given." },
          { name: "src / alt", type: "string", def: "—", desc: "Render an image instead of initials." },
          { name: "AvatarGroup", type: "wrapper", def: "—", desc: "Overlaps its Avatar children." },
        ],
      },
      {
        slug: "progress",
        name: "Progress",
        desc: "A determinate fill bar. Drag the knob to set the value (0–100).",
        import: `import Progress from "feather-ui-kit/progress";`,
        defaults: { value: 68 },
        controls: [{ key: "value", type: "range", label: "value", min: 0, max: 100 }],
        render: (p) => <div style={{ width: 300 }}><Progress value={p.value} /></div>,
        code: (p) => `<Progress value={${p.value}} />`,
        props: [
          { name: "value", type: "number", def: "0", desc: "Fill percentage, clamped to 0–100." },
        ],
      },
      {
        slug: "card",
        name: "Card",
        desc: "A surface with optional head / body / foot slots. Compose the pieces however you like.",
        import: `import Card, { CardHead, CardTitle, CardDesc, CardBody, CardFoot } from "feather-ui-kit/card";`,
        defaults: { title: "Create project", desc: "Deploy your new project in one click." },
        controls: [
          { key: "title", type: "text", label: "title" },
          { key: "desc", type: "text", label: "description" },
        ],
        render: (p) => (
          <div style={{ width: 320 }}>
            <Card>
              <CardHead><div><CardTitle>{p.title}</CardTitle><CardDesc>{p.desc}</CardDesc></div></CardHead>
              <CardFoot><Button variant="ghost">Cancel</Button><Button variant="primary">Deploy →</Button></CardFoot>
            </Card>
          </div>
        ),
        code: (p) => `<Card>\n  <CardHead>\n    <CardTitle>${p.title}</CardTitle>\n    <CardDesc>${p.desc}</CardDesc>\n  </CardHead>\n  <CardFoot>\n    <Button variant="ghost">Cancel</Button>\n    <Button variant="primary">Deploy →</Button>\n  </CardFoot>\n</Card>`,
        props: [
          { name: "Card", type: "wrapper", def: "—", desc: "The bordered surface." },
          { name: "CardHead / Body / Foot", type: "wrapper", def: "—", desc: "Padded sections; Foot has a top border." },
          { name: "CardTitle / CardDesc", type: "text", def: "—", desc: "Heading and muted sub-text." },
        ],
      },
      {
        slug: "table",
        name: "Table",
        desc: "A thin wrapper that adds uppercase headers, hover rows and horizontal scroll. You write the <thead>/<tbody>.",
        import: `import Table from "feather-ui-kit/table";`,
        defaults: {},
        controls: [],
        render: () => (
          <div style={{ width: "100%", maxWidth: 460 }}>
            <Table>
              <thead><tr><th>Component</th><th>Built on</th><th className="feather-num">Size</th></tr></thead>
              <tbody>
                <tr><td>Dialog</td><td>&lt;dialog&gt;</td><td className="feather-num">≈ 300 B</td></tr>
                <tr><td>Tabs</td><td>radio + CSS</td><td className="feather-num">≈ 220 B</td></tr>
                <tr><td>Button</td><td>just CSS</td><td className="feather-num">≈ 90 B</td></tr>
              </tbody>
            </Table>
          </div>
        ),
        code: () => `<Table>\n  <thead><tr><th>Component</th><th className="feather-num">Size</th></tr></thead>\n  <tbody>\n    <tr><td>Dialog</td><td className="feather-num">≈ 300 B</td></tr>\n  </tbody>\n</Table>`,
        props: [
          { name: "children", type: "thead / tbody", def: "—", desc: "Standard table markup." },
          { name: ".feather-num", type: "className", def: "—", desc: "Right-align + tabular numerals on a cell." },
        ],
      },
    ],
  },
  {
    group: "Disclosure & overlays",
    items: [
      {
        slug: "tabs",
        name: "Tabs",
        desc: "Zero JavaScript — a radio group plus a CSS sibling selector. Pass items as { label, content } and pick the default tab.",
        import: `import Tabs from "feather-ui-kit/tabs";`,
        defaults: { defaultIndex: 0 },
        controls: [{ key: "defaultIndex", type: "range", label: "defaultIndex", min: 0, max: 2 }],
        zeroJs: true,
        render: (p) => (
          <div style={{ width: "100%", maxWidth: 420 }}>
            <Tabs key={p.defaultIndex} defaultIndex={p.defaultIndex} items={[
              { label: "Account", content: <Text>Manage your account details here.</Text> },
              { label: "Password", content: <Text>Change your password here.</Text> },
              { label: "Team", content: <Text>Invite teammates and manage roles.</Text> },
            ]} />
          </div>
        ),
        code: (p) => `<Tabs\n  defaultIndex={${p.defaultIndex}}\n  items={[\n    { label: "Account", content: <Account /> },\n    { label: "Password", content: <Password /> },\n    { label: "Team", content: <Team /> },\n  ]}\n/>`,
        props: [
          { name: "items", type: "{ label, content }[]", def: "[]", desc: "Up to 8 tabs are styled out of the box." },
          { name: "defaultIndex", type: "number", def: "0", desc: "Which tab starts selected." },
        ],
      },
      {
        slug: "accordion",
        name: "Accordion",
        desc: "A native <details> / <summary> — zero JavaScript. The browser handles open/close and the keyboard.",
        import: `import Accordion from "feather-ui-kit/accordion";`,
        defaults: { summary: "Is it accessible?", open: true },
        controls: [
          { key: "summary", type: "text", label: "summary" },
          { key: "open", type: "boolean", label: "open" },
        ],
        zeroJs: true,
        render: (p) => (
          <div style={{ width: "100%", maxWidth: 420 }}>
            <Accordion key={String(p.open)} summary={p.summary} open={p.open}>
              Yes — it's a native &lt;details&gt;, so keyboard and screen-reader behavior come built in.
            </Accordion>
            <Accordion summary="Does it need JavaScript?">No. The browser toggles it on its own.</Accordion>
          </div>
        ),
        code: (p) => `<Accordion summary="${p.summary}"${p.open ? " open" : ""}>\n  Yes — it's a native <details>.\n</Accordion>`,
        props: [
          { name: "summary", type: "ReactNode", def: "—", desc: "The always-visible header." },
          { name: "open", type: "boolean", def: "false", desc: "Start expanded." },
          { name: "children", type: "ReactNode", def: "—", desc: "The collapsible body." },
        ],
      },
      {
        slug: "tooltip",
        name: "Tooltip",
        desc: "CSS-only — the label lives in a data-tip attribute and shows on hover/focus. No JavaScript.",
        import: `import Tooltip from "feather-ui-kit/tooltip";`,
        defaults: { tip: "Copied to clipboard ✓" },
        controls: [{ key: "tip", type: "text", label: "tip" }],
        zeroJs: true,
        render: (p) => (
          <div style={{ paddingTop: 30 }}>
            <Tooltip tip={p.tip}><Button variant="outline">Hover or focus me</Button></Tooltip>
          </div>
        ),
        code: (p) => `<Tooltip tip="${p.tip}">\n  <button>Hover or focus me</button>\n</Tooltip>`,
        props: [
          { name: "tip", type: "string", def: "—", desc: "The tooltip text (data-tip)." },
          { name: "children", type: "ReactNode", def: "—", desc: "The trigger; gets tabIndex for focus." },
        ],
      },
      {
        slug: "menu",
        name: "Menu",
        desc: "Built on the Popover API — free focus management and light-dismiss, with anchor positioning (and a centered fallback). Zero JavaScript.",
        import: `import Menu from "feather-ui-kit/menu";`,
        defaults: { label: "Actions" },
        controls: [{ key: "label", type: "text", label: "trigger label" }],
        zeroJs: true,
        render: (p) => (
          <Menu label={p.label}>
            <button>Duplicate <span className="feather-kbd">⌘D</span></button>
            <button>Rename <span className="feather-kbd">⌘R</span></button>
            <hr />
            <button className="feather-menu-danger">Delete</button>
          </Menu>
        ),
        code: (p) => `<Menu label="${p.label}">\n  <button>Duplicate</button>\n  <button>Rename</button>\n  <hr />\n  <button className="feather-menu-danger">Delete</button>\n</Menu>`,
        props: [
          { name: "label", type: "string", def: '"Actions"', desc: "Default trigger text." },
          { name: "trigger", type: "ReactNode", def: "—", desc: "Custom trigger content (replaces label + chevron)." },
          { name: "children", type: "buttons / links", def: "—", desc: "Menu items; clicking one closes the menu." },
        ],
      },
      {
        slug: "dialog",
        name: "Dialog",
        desc: "A thin wrapper over the native <dialog>: it syncs the open prop to showModal()/close(). Focus trap, backdrop, Esc-to-close and the top layer are the platform's.",
        import: `import Dialog, { DialogBody, DialogFoot } from "feather-ui-kit/dialog";`,
        defaults: { title: "Delete project?", body: "This permanently removes the project. This can't be undone." },
        controls: [
          { key: "title", type: "text", label: "title" },
          { key: "body", type: "text", label: "body" },
        ],
        render: (p) => <DialogDemo title={p.title} body={p.body} />,
        code: (p) => `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open dialog</Button>\n<Dialog open={open} onClose={() => setOpen(false)}>\n  <DialogBody>\n    <h3>${p.title}</h3>\n    <p>${p.body}</p>\n  </DialogBody>\n  <DialogFoot>\n    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>\n    <Button variant="destructive">Delete</Button>\n  </DialogFoot>\n</Dialog>`,
        props: [
          { name: "open", type: "boolean", def: "false", desc: "Calls showModal() / close() to match." },
          { name: "onClose", type: "() => void", def: "—", desc: "Fires on Esc, backdrop click or close()." },
          { name: "DialogBody / DialogFoot", type: "wrapper", def: "—", desc: "Padded body and a bordered footer." },
        ],
      },
      {
        slug: "toast",
        name: "Toast",
        desc: "Wrap your app once in ToastProvider, then call toast() from anywhere via useToast(). Timed, dismissible, rendered in a portal.",
        import: `import { ToastProvider, useToast } from "feather-ui-kit/toast";`,
        defaults: { title: "Changes saved", desc: "Your settings are up to date." },
        controls: [
          { key: "title", type: "text", label: "title" },
          { key: "desc", type: "text", label: "desc" },
        ],
        render: (p) => <ToastDemo title={p.title} desc={p.desc} />,
        code: (p) => `// once, near the root:\n<ToastProvider>\n  <App />\n</ToastProvider>\n\n// anywhere inside:\nconst toast = useToast();\ntoast({ title: "${p.title}", desc: "${p.desc}" });`,
        props: [
          { name: "ToastProvider duration", type: "number", def: "3200", desc: "Auto-dismiss delay (ms)." },
          { name: "toast(opts)", type: "{ title, desc, icon, duration }", def: "—", desc: "Returns from useToast(); shows a toast." },
        ],
      },
    ],
  },
];

export const FLAT = DOCS.flatMap((g) => g.items);
