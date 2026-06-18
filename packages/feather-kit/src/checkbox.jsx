export default function Checkbox({ label, className, ...props }) {
  const cls = ["feather-check", className].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input type="checkbox" {...props} />
      <span className="feather-check-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {label}
    </label>
  );
}
