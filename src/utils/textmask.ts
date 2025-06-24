export async function initLineMaskReveal(id:string) {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { SplitText } = await import('gsap/SplitText');

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const element = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
  if (!element) {
    console.warn(`Element not found for selector: ${id}`);
    return;
  }
  const start = element.dataset.start ?? '0';
  const end = element.dataset.end ?? '100';
  const position = element.dataset.position ?? 'top';
  const positionEnd = element.dataset.positionend ?? 'bottom';
  const mark = element.dataset.mark === 'true';
  // const y = element.dataset.y ?? '100';
  // const x = element.dataset.x ?? '0';
  // const duration = parseFloat(element.dataset.duration ?? '0.5');
  const stagger = parseFloat(element.dataset.stagger ?? '0.1');
  // const staggerseq = (element.dataset.staggerseq as 'start' | 'end' | 'center' | 'edges') ?? 'start';

    // Split text into lines
    const split = SplitText.create(element, {
      type: 'lines',
      linesClass: 'line'
    });

    // Use GSAP to hide and position lines off-screen initially
    gsap.set(split.lines, {
      yPercent: 100,
      opacity: 0
    });

    // Animate each line upwards into view as user scrolls
    gsap.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      ease: 'power3.out',
      stagger: stagger,
      scrollTrigger: {
        trigger: element,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers:mark,
      }
    });
}
