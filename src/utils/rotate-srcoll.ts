export async function rotateScroll() {
  // Load GSAP and ScrollTrigger
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll('[data-animation="rotate"]') as NodeListOf<HTMLElement>;;
  if (!elements.length) {
    console.warn('⚠️ No elements found for [data-animation="rotate"]');
    return;
  }

  elements.forEach((el, index) => {
    // Get dataset config
    const start = el.dataset.start ?? '0';
    const end = el.dataset.end ?? '100';
    const position = el.dataset.position ?? 'top';
    const positionEnd = el.dataset.positionend ?? 'bottom';
    const mark = el.dataset.mark === 'true';
    const amount = parseFloat(el.dataset.amount ?? '720');
    const duration = parseFloat(el.dataset.duration ?? '0.5');

    const children = el.querySelectorAll('*');

    if (!children.length) return;

    // Animate each child individually
    children.forEach((child) => {
      
      gsap.fromTo(
        child,
        { rotation: 0 },
        {
          rotation: amount,
          duration: duration,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: `${position} ${start}%`,
            end: `${positionEnd} ${end}%`,
            scrub: true,
            markers: mark,
            id: `rotate-${index + 1}`,
          },
        }
      );
    });
  });

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300); // Give Webflow time to render everything
}
