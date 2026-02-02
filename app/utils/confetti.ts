"use client";

import confetti from "canvas-confetti";

export const fireConfetti = () => {
  // Fire confetti from the left
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.1, y: 0.6 },
    colors: ["#fbbf24", "#f59e0b", "#d97706", "#8b5cf6", "#6366f1"],
  });

  // Fire confetti from the right
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.9, y: 0.6 },
    colors: ["#fbbf24", "#f59e0b", "#d97706", "#8b5cf6", "#6366f1"],
  });
};

export const fireCoinConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const colors = ["#fbbf24", "#f59e0b", "#d97706"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const fireSuccessConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
  });
};
