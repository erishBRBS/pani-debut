import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./TextCursor.css";

type Mode = "full" | "inline";

interface TextCursorProps {
  text?: string;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;

  mode?: Mode;
  className?: string;
  style?: React.CSSProperties;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  angle: number;
  randomX?: number;
  randomY?: number;
  randomRotate?: number;
}

export default function TextCursor({
  text = "🌹",
  spacing = 40,
  followMouseDirection = false,
  randomFloat = true,
  exitDuration = 0.4,
  removalInterval = 25,
  maxPoints = 10,

  mode = "full",
  className = "",
  style,
}: TextCursorProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const idCounter = useRef<number>(0);

  const handlePointerMove = (e: PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ignore outside
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    setTrail((prev) => {
      const newTrail = [...prev];

      const createRandomData = () =>
        randomFloat
          ? {
              randomX: Math.random() * 10 - 5,
              randomY: Math.random() * 10 - 5,
              randomRotate: Math.random() * 10 - 5,
            }
          : {};

      if (newTrail.length === 0) {
        newTrail.push({
          id: idCounter.current++,
          x,
          y,
          angle: 0,
          ...createRandomData(),
        });
      } else {
        const last = newTrail[newTrail.length - 1];
        const dx = x - last.x;
        const dy = y - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= spacing) {
          const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
          const computedAngle = followMouseDirection ? rawAngle : 0;
          const steps = Math.floor(distance / spacing);

          for (let i = 1; i <= steps; i++) {
            const t = (spacing * i) / distance;
            const newX = last.x + dx * t;
            const newY = last.y + dy * t;

            newTrail.push({
              id: idCounter.current++,
              x: newX,
              y: newY,
              angle: computedAngle,
              ...createRandomData(),
            });
          }
        }
      }

      if (newTrail.length > maxPoints) {
        return newTrail.slice(newTrail.length - maxPoints);
      }
      return newTrail;
    });

    lastMoveTimeRef.current = Date.now();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ✅ works for mouse + touch + pen
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerMove);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacing, followMouseDirection, randomFloat, maxPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 120) {
        setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);

    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div
      ref={containerRef}
      className={`text-cursor-container ${
        mode === "full" ? "text-cursor-full" : "text-cursor-inline"
      } ${className}`}
      style={style}
    >
      <div className="text-cursor-inner">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 1, rotate: item.angle }}
              animate={{
                opacity: 1,
                scale: 1,
                x: randomFloat ? [0, item.randomX || 0, 0] : 0,
                y: randomFloat ? [0, item.randomY || 0, 0] : 0,
                rotate: randomFloat
                  ? [item.angle, item.angle + (item.randomRotate || 0), item.angle]
                  : item.angle,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: exitDuration, ease: "easeOut" },
                ...(randomFloat && {
                  x: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
                  y: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
                  rotate: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
                }),
              }}
              className="text-cursor-item"
              style={{ left: item.x, top: item.y }}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
