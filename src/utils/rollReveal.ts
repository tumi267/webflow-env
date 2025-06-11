import { gsap, ScrollTrigger } from '$utils/gsap-core';
export function rollReveal(
  id: string ,
  duration: number = 2
) {
  // Set initial clip path
  gsap.set(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });

  // Create and run the reveal animation
  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top center",   // When top of element hits 80% viewport
      end: "bottom 10%",     // When top hits 20% viewport
      scrub:true,
   
    }
  });
  tl.to(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });

  return tl; // optional: return timeline for chaining or control
}
