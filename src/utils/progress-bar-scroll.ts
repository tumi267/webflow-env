// make option of top down
export async function progressBar(){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const elements = document.querySelectorAll<HTMLElement>(`[data-animation="progress"]`);
      const cleanups: (() => void)[] = [];
    
      elements.forEach((el) => {
      // Parse dataset values with fallbacks
      const start = el.dataset.start ?? '0';
      const end = el.dataset.end ?? '100';
      const position = el.dataset.position ?? 'top';
      const positionEnd = el.dataset.positionend ?? 'bottom';
      const mark = el.dataset.mark === 'true';
      const y = el.dataset.y ?? '0';
      const x = el.dataset.x ?? '0';


  const children = el.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;
    gsap.to(children, {
        scrollTrigger: {
          trigger: el,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub: 3,
          markers:mark
        },
        width: `${x}%`,
        // height:`${y}%`,
      });
    })
}