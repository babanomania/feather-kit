export default function Table({ className, children, ...props }) {
  const cls = ["feather-table", className].filter(Boolean).join(" ");
  return (
    <div className="feather-table-wrap">
      <table className={cls} {...props}>{children}</table>
    </div>
  );
}
