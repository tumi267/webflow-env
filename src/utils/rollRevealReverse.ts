import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function rollRevealReverse(
  selector: string = ".roll_reveal_revese",
  duration: number = 2
) {
  // Set initial clip path
  gsap.set(selector, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
  });

  // Create and run the reveal animation
  
  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: selector,
      start: "top 80%",   // When top of element hits 80% viewport
      end: "top 20%",     // When top hits 20% viewport
      toggleActions: "play none none none", // Play once on enter
      markers: false      // Enable for debugging
    }
  });
  tl.to(selector, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });

  return tl; // optional: return timeline for chaining or control
}
