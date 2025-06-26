export async function zoom (id:string){
    // Dynamically import GSAP and its plugins
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(ScrollTrigger,SplitText)
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
    const amount = el.dataset.amount ?? '2';
    const duration = parseFloat(el.dataset.duration ?? '0.5');
    const children = el.querySelectorAll<HTMLElement>('*');
 
    gsap.fromTo(children,
    {
      scale: 1
    },
    {
      scale: amount,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: 0.5,
        markers:mark
      }
    }
  );
}