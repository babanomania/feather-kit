export default function Radio({ label, className, ...props }) {
  const cls = ["feather-check feather-radio", className].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input type="radio" {...props} />
      <span className="feather-check-box"><span className="feather-check-dot" /></span>
      {label}
    </label>
  );
}
