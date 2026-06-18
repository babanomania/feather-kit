export default function Progress({ value = 0, className, ...props }) {
  const cls = ["feather-progress", className].filter(Boolean).join(" ");
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cls} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} {...props}>
      <i style={{ width: pct + "%" }} />
    </div>
  );
}
