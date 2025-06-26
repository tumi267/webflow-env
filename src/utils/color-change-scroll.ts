

export async function colorChange() {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
     gsap.registerPlugin(ScrollTrigger)
     const elements = document.querySelectorAll<HTMLElement>(`[data-animation="color"]`);
     const cleanups: (() => void)[] = [];
   
     elements.forEach((el) => {
     // Parse dataset values with fallbacks
     const start = el.dataset.start ?? '0';
     const end = el.dataset.end ?? '100';
     const position = el.dataset.position ?? 'top';
     const positionEnd = el.dataset.positionend ?? 'bottom';
     const mark = el.dataset.mark === 'true';
     const colorto = el.dataset.colorto ?? '"#4a00e0"';
     const textcolorto  = el.dataset.textcolorto  ?? "#FFFF00";
     const child = el?.firstElementChild as HTMLElement | null;

  if (!el || !child) {
    console.warn(`colorChange: Missing parent or child `);
    return;
  }

  gsap.to(child, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers:mark
    },
    backgroundColor:colorto,
    color:textcolorto
  });
})
}
