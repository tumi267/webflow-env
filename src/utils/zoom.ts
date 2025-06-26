export async function zoom (){
    // Dynamically import GSAP and its plugins
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(ScrollTrigger,SplitText)
    const elements = document.querySelectorAll<HTMLElement>(`[data-animation="zoom"]`);
    const cleanups: (() => void)[] = [];
  
    elements.forEach((el) => {
    
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
  })
}