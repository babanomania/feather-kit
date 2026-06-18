export default function Badge({ variant = "soft", dot, className, children, ...props }) {
  const cls = ["feather-badge", `feather-badge-${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {dot && <span className="feather-badge-dot" />}
      {children}
    </span>
  );
}
