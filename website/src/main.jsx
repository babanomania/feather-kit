import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "feather-ui-kit/themes/light.css";
import "feather-ui-kit/styles.css";
import "./site.css";
import { ToastProvider } from "feather-ui-kit";
import Landing from "./pages/Landing.jsx";
import Docs from "./pages/Docs.jsx";
import Patterns from "./pages/Patterns.jsx";
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
  let page;
  if (path.startsWith("/customizer")) page = <Customizer />;
  else if (path.startsWith("/templates")) page = <Templates />;
  else if (path.startsWith("/components")) page = <Docs slug={path.split("/")[2]} />;
  else if (path.startsWith("/patterns")) page = <Patterns cat={path.split("/")[2]} />;
  else page = <Landing />;
  return <ToastProvider>{page}</ToastProvider>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
);
