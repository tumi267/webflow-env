export async function rollReveal() {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const elements = document.querySelectorAll(`[data-animation="roll"]`) as NodeListOf<HTMLElement>;;
      const cleanups: (() => void)[] = [];
    
      elements.forEach((el) => {
  // Set initial clip path
  gsap.set(el, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });

  const start = el.dataset.start ?? '0';
  const end = el.dataset.end ?? '100';
  const position = el.dataset.position ?? 'top';
  const positionEnd = el.dataset.positionend ?? 'bottom';
  const mark = el.dataset.mark === 'true';
  const duration = parseFloat(el.dataset.duration ?? '0.5');

  // Create and run the reveal animation
  // Create timeline with ScrollTrigger
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,   
      end: `${positionEnd} ${end}%`,    
      scrub:true,
      markers: mark
    }
  });
  tl.to(el, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });

  return tl; // optional: return timeline for chaining or control
})
ScrollTrigger.refresh();
}
