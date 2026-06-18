export const REPO = "https://github.com/babanomania/feather-kit";

export function FeatherMark({ size = 20, strokeWidth = 1.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  );
}

export function Nav({ active, extra }) {
  return (
    <nav className="site">
      <div className="wrap wide-wrap nav-in">
        <a className="brand" href="#/">
          <FeatherMark /> <b>Feather</b><span>Kit</span>
        </a>
        <div className="nav-links">
          <a href="#/components" className={active === "components" ? "active" : ""}>Components</a>
          <a href="#/patterns" className={active === "patterns" ? "active" : ""}>Patterns</a>
          <a href="#/templates" className={active === "templates" ? "active" : ""}>Templates</a>
          <a href="#/customizer" className={active === "customizer" ? "active" : ""}>Customize</a>
          {extra}
          <a className="ghub" href={REPO} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap wide-wrap">
        <div className="foot-in">
          <div className="foot-brand">
            <div className="name"><FeatherMark size={18} /> Feather Kit</div>
            <div className="tag">A React component library that weighs almost nothing. Built on browser primitives and restraint.</div>
          </div>
          <div className="foot-cols">
            <div className="col">
              <span>Project</span>
              <a href={REPO} target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.npmjs.com/package/feather-ui-kit" target="_blank" rel="noreferrer">npm</a>
              <a href="#/patterns">Patterns</a>
              <a href="#/templates">Templates</a>
              <a href="#/customizer">Customize</a>
            </div>
            <div className="col">
              <span>Built on</span>
              <a href="#/">&lt;dialog&gt;</a>
              <a href="#/">Popover API</a>
              <a href="#/">&lt;details&gt;</a>
              <a href="#/">CSS</a>
            </div>
          </div>
        </div>
        <div className="foot-base">MIT licensed · This site is built with feather-kit itself — every component above is the published library.</div>
      </div>
    </footer>
  );
}
