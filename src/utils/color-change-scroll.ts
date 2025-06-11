import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function colorChange(id: string) {
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild as HTMLElement | null;

  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }

  gsap.to(child, {
    scrollTrigger: {
      trigger: parent,
      start: "top center",
      end: "bottom center",
      scrub: true
    },
    backgroundColor: "#4a00e0",
    color: "#ffffff"
  });
}
