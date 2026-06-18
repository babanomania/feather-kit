import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "feather-ui-kit/themes/light.css";
import "feather-ui-kit/styles.css";
import "./site.css";
import { ToastProvider } from "feather-ui-kit";
import Landing from "./pages/Landing.jsx";
import Customizer from "./pages/Customizer.jsx";
import Templates from "./pages/Templates.jsx";

function useHashPath() {
  const get = () => window.location.hash.replace(/^#/, "") || "/";
  const [path, setPath] = useState(get);
  useEffect(() => {
    const on = () => { setPath(get()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return path;
}

function App() {
  const path = useHashPath();
  const page =
    path.startsWith("/customizer") ? <Customizer /> :
    path.startsWith("/templates") ? <Templates /> :
    <Landing />;
  return <ToastProvider>{page}</ToastProvider>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
);
