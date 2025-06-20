export async function rollReveal(
  id: string ,
  start:number,
  end:number,
  duration: number = 2,
  position:"top" | "center" | "bottom" | string = "top" ,
  positionEnd:"top" | "center" | "bottom" | string = "top",
  mark:boolean
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
      start: `${position} ${start}%`,   // When top of element hits 80% viewport
      end: `${positionEnd} ${end}%`,     // When top hits 20% viewport
      scrub:true,
      markers: mark
    }
  });
  tl.to(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });

  return tl; // optional: return timeline for chaining or control
}
