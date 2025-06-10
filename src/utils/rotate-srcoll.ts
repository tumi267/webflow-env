import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function rotateScroll(id: string) {
  const parent = document.getElementById(id);
  if (!parent) return;

  const children = parent.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;

  gsap.from(children, {
    scrollTrigger: {
      trigger: parent,
      start: "top 80%",
      end: "top top",
      scrub: true,
    },
    rotation: 180,
    opacity: 0,
    duration: 1,
    // stagger: 0.2, // optional: stagger effect
  });
}
