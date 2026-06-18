const cx = (...c) => c.filter(Boolean).join(" ");

export function Overline({ className, ...p }) {
  return <span className={cx("feather-overline", className)} {...p} />;
}

export function Heading({ level = 2, className, ...p }) {
  const Tag = "h" + Math.min(Math.max(level, 1), 6);
  const cls = level <= 1 ? "feather-h1" : level === 2 ? "feather-h2" : "feather-h3";
  return <Tag className={cx(cls, className)} {...p} />;
}

export function Title({ as: As = "h3", className, ...p }) {
  return <As className={cx("feather-title", className)} {...p} />;
}

export function Lead({ as: As = "p", className, ...p }) {
  return <As className={cx("feather-lead", className)} {...p} />;
}

export function Text({ as: As = "p", className, ...p }) {
  return <As className={cx("feather-text", className)} {...p} />;
}

export function Muted({ as: As = "span", className, ...p }) {
  return <As className={cx("feather-muted", className)} {...p} />;
}

export function Metric({ unit, size, className, children, ...p }) {
  return (
    <div className={cx("feather-metric", size === "sm" && "feather-metric-sm", className)} {...p}>
      {children}
      {unit != null && <span className="feather-metric-unit">{unit}</span>}
    </div>
  );
}
