import { useId, Fragment } from "react";

// Zero-JS tabs: a radio group + a CSS sibling selector do the switching.
// `items` is an array of { label, content }. Up to 8 tabs are styled.
export default function Tabs({ items = [], defaultIndex = 0, className }) {
  const name = useId();
  const cls = ["feather-tabs", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {items.map((it, i) => (
        <Fragment key={i}>
          <input type="radio" name={name} id={`${name}-${i}`} defaultChecked={i === defaultIndex} />
          <label htmlFor={`${name}-${i}`}>{it.label}</label>
        </Fragment>
      ))}
      <div className="feather-tabs-panels">
        {items.map((it, i) => (
          <div className="feather-tabs-panel" key={i}>{it.content}</div>
        ))}
      </div>
    </div>
  );
}
