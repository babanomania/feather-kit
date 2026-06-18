export default function Switch({ label, title, description, className, ...props }) {
  const cx = (...c) => c.filter(Boolean).join(" ");
  if (title != null || description != null) {
    return (
      <label className={cx("feather-switch feather-switch-row", className)}>
        <span className="feather-switch-text"><b>{title}</b><span>{description}</span></span>
        <span style={{ display: "inline-flex" }}>
          <input type="checkbox" {...props} />
          <span className="feather-switch-track" />
        </span>
      </label>
    );
  }
  return (
    <label className={cx("feather-switch", className)}>
      <input type="checkbox" {...props} />
      <span className="feather-switch-track" />
      {label}
    </label>
  );
}
