export async function fadeIn() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="fade"]`);

  elements.forEach((parent, index) => {
    const children = parent.querySelectorAll<HTMLElement>('> *'); // direct children only
    if (!children.length) return;

    // Parse dataset values
    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const duration = parseFloat(parent.dataset.duration ?? '0.5');

    // Set initial opacity to 0
    gsap.set(children, { opacity: 0 });

    // Create timeline with ScrollTrigger, no scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub:true,
        markers: mark,
        id: `fade-${index + 1}`,
      },
    });

    // Animate children opacity from 0 to 1 sequentially
    tl.to(children, {
      opacity: 1,
      duration,
      ease: 'power2.out',
      stagger: duration, // one after another
    });
  });

  ScrollTrigger.refresh();
}
