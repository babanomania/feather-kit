export default function Select({ className, children, ...props }) {
  const cls = ["feather-select", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <select {...props}>{children}</select>
    </div>
  );
}
