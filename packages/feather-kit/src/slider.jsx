export default function Slider({ label, showValue, className, ...props }) {
  const cls = ["feather-slider", className].filter(Boolean).join(" ");
  const v = props.value != null ? props.value : props.defaultValue;
  return (
    <label className={cls}>
      {label != null && <span>{label}</span>}
      <input type="range" {...props} />
      {showValue && <span className="feather-slider-value">{v}</span>}
    </label>
  );
}
