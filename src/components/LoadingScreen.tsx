import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 1400;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), MIN_DISPLAY_MS);
    const removeTimer = setTimeout(() => setVisible(false), MIN_DISPLAY_MS + 400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg-app)] transition-opacity duration-[400ms] ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/nexa-mascot.png"
        alt="Nexa"
        className="w-72 h-72 sm:w-96 sm:h-96 animate-[nexaFloat_2.4s_ease-in-out_infinite]"
      />
      <div className="flex items-center gap-1.5 mt-6">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}