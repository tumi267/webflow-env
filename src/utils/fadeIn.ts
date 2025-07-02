export async function fadeIn (){
      // Dynamically import GSAP and its plugins
 
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const elements = document.querySelectorAll<HTMLElement>(`[data-animation="fade"]`);
      const cleanups: (() => void)[] = [];
    
      elements.forEach((el) => {
      
      // Parse dataset values with fallbacks
      const start = el.dataset.start ?? '0';
      const end = el.dataset.end ?? '100';
      const position = el.dataset.position ?? 'top';
      const positionEnd = el.dataset.positionend ?? 'bottom';
      const mark = el.dataset.mark === 'true';
    gsap.from(el, {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
        trigger: el, // Element that triggers the animation
        start: `${position} ${start}%`,   // When the top of `.fade_in` hits 80% of the viewport
        end: `${positionEnd} ${end}%`,     // When the top of `.fade_in` hits 20% of the viewport
        scrub:true,
        markers:mark
      }
      });
    })
    ScrollTrigger.refresh();
}