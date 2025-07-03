export async function rotateScroll() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll('[data-animation="rotate"]') as NodeListOf<HTMLElement>;
  if (!elements.length) {
    console.warn('⚠️ No elements found for [data-animation="rotate"]');
    return;
  }

  elements.forEach((el, index) => {
    const start = el.dataset.start ?? '0';
    const end = el.dataset.end ?? '100';
    const position = el.dataset.position ?? 'top';
    const positionEnd = el.dataset.positionend ?? 'bottom';
    const mark = el.dataset.mark === 'true';
    const amount = parseFloat(el.dataset.amount ?? '720');
    const duration = parseFloat(el.dataset.duration ?? '0.5');

    const children = el.querySelectorAll('*') as NodeListOf<HTMLElement>;
    if (!children.length) return;

    // Reset rotation to 0
    gsap.set(children, { rotation: 0 });

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub:true,
        markers: mark,
        id: `rotate-${index + 1}`,
      },
    });

    // Animate children one after another
    tl.to(children, {
      rotation: amount,
      duration,
      ease: 'power1.out',
      stagger: duration, // one after the other
    });
  });

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);
}
