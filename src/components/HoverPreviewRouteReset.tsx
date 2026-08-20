import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHoverPreview } from "../context/HoverPreviewContext";

export function HoverPreviewRouteReset() {
  const location = useLocation();
  const { hidePreview } = useHoverPreview();

  useEffect(() => {
    hidePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
}