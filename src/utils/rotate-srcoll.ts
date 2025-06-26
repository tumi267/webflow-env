// may have conflict with webflow
export async function rotateScroll(id: string) {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
    
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
      const amount = el.dataset.amount ?? '720';
      const duration = parseFloat(el.dataset.duration ?? '0.5');

  const children = el.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;

  gsap.from(children, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers:mark,
    },
    rotation: amount,
    opacity: 0,
    duration: duration,
    // stagger: 0.2, // optional: stagger effect
  });
}
