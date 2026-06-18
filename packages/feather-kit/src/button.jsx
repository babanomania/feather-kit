export default function Button({ variant = "primary", size, className, ...props }) {
  const cls = [
    "feather-button",
    `feather-button-${variant}`,
    size === "sm" && "feather-button-sm",
    className,
  ].filter(Boolean).join(" ");
  return <button className={cls} {...props} />;
}
