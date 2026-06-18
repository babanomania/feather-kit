export default function Accordion({ summary, open, className, children, ...props }) {
  const cls = ["feather-accordion", className].filter(Boolean).join(" ");
  return (
    <details className={cls} open={open} {...props}>
      <summary>{summary}</summary>
      <div className="feather-accordion-body">{children}</div>
    </details>
  );
}
