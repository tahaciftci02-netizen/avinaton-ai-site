"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const val = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      setP(Math.max(0, Math.min(100, val)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scrollProgress" aria-hidden="true">
      <div className="scrollProgress__bar" style={{ width: `${p}%` }} />
    </div>
  );
}
