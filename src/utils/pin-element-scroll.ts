export async function Pin(id:string){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger)

      const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`);

      // const el = document.getElementById(id);
      if (!el) {
        console.warn(`Element with ID "${id}" not found`);
        return;
      }
      // Parse dataset values with fallbacks
      const start = el.dataset.start ?? '0';
      const end = el.dataset.end ?? '100';
      const position = el.dataset.position ?? 'top';
      const positionEnd = el.dataset.positionend ?? 'bottom';
      const mark = el.dataset.mark === 'true';

    gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          pin: true,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub:true,
          markers:mark,
          pinSpacing:false
        }
      });
}