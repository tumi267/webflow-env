export async function slideInRight (){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const elements = document.querySelectorAll<HTMLElement>(`[data-animation="slideRight"]`);
      const cleanups: (() => void)[] = [];
    
      elements.forEach((parent) => {
      const start = parent.dataset.start ?? '0';
      const end = parent.dataset.end ?? '100';
      const position = parent.dataset.position ?? 'top';
      const positionEnd = parent.dataset.positionend ?? 'bottom';
      const mark = parent.dataset.mark === 'true';
      const y = parent.dataset.y ?? '100';
      const x = parent.dataset.x ?? '0';
      const duration = parseFloat(parent.dataset.duration ?? '0.5');
    gsap.from(parent, {
        x: x,
        y:y,
        // opacity: 0,
        // duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: parent, // Element that triggers the animation
          start: `${position} ${start}%`,          // When top hits 75% of viewport
          end: `${positionEnd} ${end}%`,            // When top hits 25% of viewport
          scrub:true,
          markers:mark
        }
      }); 
    })
    ScrollTrigger.refresh();
}