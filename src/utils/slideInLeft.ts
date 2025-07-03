export async function slideInLeft() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="slideLeft"]`);

  elements.forEach((parent, index) => {
    const children = Array.from(parent.children) as HTMLElement[]; // Direct children only
    if (!children.length) return;

    // Dataset values
    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const y = parseFloat(parent.dataset.y ?? '100');
    const x = parseFloat(parent.dataset.x ?? '0');
    const duration = parseFloat(parent.dataset.duration ?? '0.5');

    // Set initial state
    gsap.set(children, {
      x: -x,
      y: y,
    
    });

    // Timeline with one-after-another animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub:true,
        markers: mark,
        id: `slideLeft-${index + 1}`,
      },
    });

    tl.to(children, {
      x: 0,
      y: 0,
      
      duration,
      ease: 'power3.out',
      stagger: duration, // sequential effect
    });
  });

  ScrollTrigger.refresh();
}
