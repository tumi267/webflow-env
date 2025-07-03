export async function fadeIn() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="fade"]`);

  elements.forEach((parent, index) => {
    const children = Array.from(parent.children) as HTMLElement[]; // ✅ Fix here
    if (!children.length) return;

    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const duration = parseFloat(parent.dataset.duration ?? '0.5');

    gsap.set(children, { opacity: 0 });

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

    tl.to(children, {
      opacity: 1,
      duration,
      ease: 'power2.out',
      stagger: duration,
    });
  });

  ScrollTrigger.refresh();
}
