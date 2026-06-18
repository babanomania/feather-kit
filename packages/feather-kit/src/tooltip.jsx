export default function Tooltip({ tip, className, children, ...props }) {
  const cls = ["feather-tooltip", className].filter(Boolean).join(" ");
  return (
    <span className={cls} data-tip={tip} tabIndex={0} {...props}>
      {children}
    </span>
  );
}
