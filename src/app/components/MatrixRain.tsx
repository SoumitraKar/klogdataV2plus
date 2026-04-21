import { useEffect, useRef } from "react";
import { usePerformanceMode } from "./PerformanceMode";

type MatrixRainProps = {
  active?: boolean;
};

export function MatrixRain({ active = true }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { effectiveMode } = usePerformanceMode();
  const isLightMode = effectiveMode === "light";

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const binary = "01";
    const fontSize = isLightMode ? 12 : 10;
    let drops: number[] = [];

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const columns = Math.ceil(window.innerWidth / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    };

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "rgba(34, 211, 238, 0.3)";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    resizeCanvas();

    let animationFrame = 0;
    let lastFrameTime = 0;
    const frameBudget = 1000 / (isLightMode ? 16 : 24);

    const render = (timestamp: number) => {
      if (timestamp - lastFrameTime >= frameBudget) {
        draw();
        lastFrameTime = timestamp;
      }
      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active, isLightMode]);

  if (!active) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
