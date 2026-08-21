import confetti from "canvas-confetti";

const BRAND_COLORS = ["#04BBFF", "#0594D0", "#FFEA2C", "#218362"];

/** Confetti falling from the top of the page, across its full width. */
export function celebrate() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 90,
      spread: 80,
      startVelocity: 45,
      gravity: 0.9,
      ticks: 200,
      origin: { x: Math.random(), y: -0.1 },
      colors: BRAND_COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
