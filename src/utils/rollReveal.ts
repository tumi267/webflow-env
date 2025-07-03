export async function rollReveal() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll('[data-animation="roll"]') as NodeListOf<HTMLElement>;

  elements.forEach((parent) => {
    const children = parent.querySelectorAll('*') as NodeListOf<HTMLElement>;
    if (!children.length) return;

    const start = parent.dataset.start ?? '50';
    const end = parent.dataset.end ?? '0';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'top';
    const mark = parent.dataset.mark === 'true';
    const duration = parseFloat(parent.dataset.duration ?? '0.5');

    // Set initial styles
    gsap.set(parent, { transformPerspective: 1000 });
    gsap.set(children, {
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    });

    // Timeline (not scrubbed) — runs once on trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub:true,
        markers: mark,
      },
    });

    // Animate one child after the next
    tl.to(children, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration,
      ease: 'power3.out',
      stagger: duration, // one full duration between each child
    });
  });

  ScrollTrigger.refresh();
}
