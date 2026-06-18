import { useId } from "react";

// Zero-JS menu: the Popover API gives focus management and light-dismiss for
// free; anchor positioning (with a centered @supports fallback) handles layout.
export default function Menu({ label = "Actions", trigger, className, children, ...props }) {
  const id = "fkmenu-" + useId().replace(/[:]/g, "");
  const anchor = "--" + id;
  return (
    <>
      <button className="feather-menu-trigger" popoverTarget={id} style={{ anchorName: anchor }} {...props}>
        {trigger || (
          <>
            {label}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </>
        )}
      </button>
      <div
        id={id}
        popover="auto"
        className={["feather-menu", className].filter(Boolean).join(" ")}
        style={{ positionAnchor: anchor }}
        onClick={(e) => { if (e.target.closest("button,a")) e.currentTarget.hidePopover?.(); }}
      >
        {children}
      </div>
    </>
  );
}
