import React, { useEffect, useState, useRef } from "react";

const BubblesCSSBackground = ({ count = 20 }) => {
  const wrapRef = useRef(null);


  const [bubbles] = useState(() => {
    const rand = (a, b) => a + Math.random() * (b - a);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: rand(1, 5),
      left: rand(0, 100),
      duration: rand(18, 36),
      delay: -rand(0, 10),
      hue: rand(260, 320),
      depth: rand(0.05, 0.2),
      opacity: rand(0.3, 0.6),
    }));
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mx = ((e.clientX - w / 2) / w) * 50;
      const my = ((e.clientY - h / 2) / h) * 50;
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="bubbles-bg" ref={wrapRef} aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          style={{
            "--size": `${b.size}px`,
            "--left": `${b.left}%`,
            "--duration": `${b.duration}s`,
            "--delay": `${b.delay}s`,
            "--hue": b.hue,
            "--depth": b.depth,
            "--opacity": b.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default BubblesCSSBackground;