import { useRef, useEffect } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

// Thin wrapper over the native <dialog>: syncs the `open` prop to
// showModal()/close() and adds light-dismiss. Focus trap, backdrop,
// Escape-to-close and top-layer come from the platform.
export default function Dialog({ open, onClose, className, children, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={cx("feather-dialog", className)}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
      {...props}
    >
      {children}
    </dialog>
  );
}

export function DialogBody({ className, ...p }) {
  return <div className={cx("feather-dialog-body", className)} {...p} />;
}
export function DialogFoot({ className, ...p }) {
  return <div className={cx("feather-dialog-foot", className)} {...p} />;
}
