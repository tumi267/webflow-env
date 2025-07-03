

export async function colorChange() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="color"]`);

  elements.forEach((el, index) => {
    // Parse dataset values with fallbacks
    const start = el.dataset.start ?? '0';
    const end = el.dataset.end ?? '100';
    const position = el.dataset.position ?? 'top';
    const positionEnd = el.dataset.positionend ?? 'bottom';
    const mark = el.dataset.mark === 'true';
    const colorto = el.dataset.colorto ?? '#4a00e0';       // ✅ fixed
    const textcolorto = el.dataset.textcolorto ?? '#FFFF00';

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
        id: `color-${index + 1}`,
      },
      backgroundColor: colorto,
      color: textcolorto,
      ease: 'power1.out',
    });
  });

  ScrollTrigger.refresh();
}
