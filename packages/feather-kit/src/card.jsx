const cx = (...c) => c.filter(Boolean).join(" ");

export default function Card({ className, ...p }) {
  return <div className={cx("feather-card", className)} {...p} />;
}
export function CardHead({ className, ...p }) {
  return <div className={cx("feather-card-head", className)} {...p} />;
}
export function CardTitle({ as: As = "h3", className, ...p }) {
  return <As className={cx("feather-card-title", className)} {...p} />;
}
export function CardDesc({ className, ...p }) {
  return <p className={cx("feather-card-desc", className)} {...p} />;
}
export function CardBody({ className, ...p }) {
  return <div className={cx("feather-card-body", className)} {...p} />;
}
export function CardFoot({ className, ...p }) {
  return <div className={cx("feather-card-foot", className)} {...p} />;
}
