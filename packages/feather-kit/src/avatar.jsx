const cx = (...c) => c.filter(Boolean).join(" ");

export default function Avatar({ initials, src, alt, className, ...props }) {
  return (
    <span className={cx("feather-avatar", className)} {...props}>
      {src ? <img src={src} alt={alt || ""} /> : initials}
    </span>
  );
}

export function AvatarGroup({ className, children, ...props }) {
  return <div className={cx("feather-avatars", className)} {...props}>{children}</div>;
}
