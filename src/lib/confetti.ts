import confetti from "canvas-confetti";

const BRAND_COLORS = ["#04BBFF", "#0594D0", "#FFEA2C", "#218362"];

/** Confetti falling from the top of the page, across its full width. */
export function celebrate() {
  const duration = 3200;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 12,
      angle: 90,
      spread: 100,
      startVelocity: 48,
      gravity: 0.85,
      scalar: 1.6,
      ticks: 260,
      origin: { x: Math.random(), y: -0.1 },
      colors: BRAND_COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
