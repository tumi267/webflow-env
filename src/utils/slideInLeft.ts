export async function slideInLeft (id:string){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const parent = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
      if (!parent) return;
      const start = parent.dataset.start ?? '0';
      const end = parent.dataset.end ?? '100';
      const position = parent.dataset.position ?? 'top';
      const positionEnd = parent.dataset.positionend ?? 'bottom';
      const mark = parent.dataset.mark === 'true';
      const y = parent.dataset.y ?? '100';
      const x = parent.dataset.x ?? '0';
      const duration = parseFloat(parent.dataset.duration ?? '0.5');
    gsap.from(parent, {
        x: -x,
        y:y,
        opacity: 0,
        duration: duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: parent,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub:true,
          markers:mark
        }
      });
}