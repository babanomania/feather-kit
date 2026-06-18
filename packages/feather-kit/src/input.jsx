import { useId } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

export function Field({ className, ...p }) {
  return <div className={cx("feather-field", className)} {...p} />;
}
export function Label({ className, ...p }) {
  return <label className={cx("feather-label", className)} {...p} />;
}
export function Hint({ className, ...p }) {
  return <span className={cx("feather-hint", className)} {...p} />;
}

export default function Input({ label, hint, id, className, ...props }) {
  const auto = useId();
  const fieldId = id || auto;
  const input = <input id={fieldId} className={cx("feather-input", className)} {...props} />;
  if (label == null && hint == null) return input;
  return (
    <Field>
      {label != null && <Label htmlFor={fieldId}>{label}</Label>}
      {input}
      {hint != null && <Hint>{hint}</Hint>}
    </Field>
  );
}
