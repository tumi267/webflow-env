import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function rollReveal(
  selector: string = ".roll_reveal",
  duration: number = 2
) {
  // Set initial clip path
  gsap.set(selector, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });

  // Create and run the reveal animation
  const tl = gsap.timeline();
  tl.to(selector, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });

  return tl; // optional: return timeline for chaining or control
}
