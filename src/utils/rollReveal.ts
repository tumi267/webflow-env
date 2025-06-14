export async function rollReveal(
  id: string ,
  start:number,
  duration: number = 2
) {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
  // Set initial clip path
  gsap.set(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });

  // Create and run the reveal animation
  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      start: `top ${start}%`,   // When top of element hits 80% viewport
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
