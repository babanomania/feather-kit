import { createContext, useContext, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

const ToastCtx = createContext(null);
let seq = 0;

export function ToastProvider({ children, duration = 3200 }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const toast = useCallback((opts) => {
    const id = ++seq;
    setToasts((list) => [...list, { id, ...opts }]);
    timers.current[id] = setTimeout(() => dismiss(id), opts.duration || duration);
    return id;
  }, [duration, dismiss]);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      {typeof document !== "undefined" && createPortal(
        <div className="feather-toaster">
          {toasts.map((t) => (
            <div className="feather-toast" key={t.id} role="status" onClick={() => dismiss(t.id)}>
              <span className="feather-toast-icon">{t.icon || "✓"}</span>
              <div>
                <div className="feather-toast-title">{t.title}</div>
                {t.desc != null && <div className="feather-toast-desc">{t.desc}</div>}
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
