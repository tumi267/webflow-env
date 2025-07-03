export async function fadeIn() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="fade"]`);

  elements.forEach((parent, index) => {
    const children = Array.from(parent.children) as HTMLElement[];
    if (!children.length) return;

    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const fadeDuration = parseFloat(parent.dataset.duration ?? '0.5');

    // Set initial opacity
    gsap.set(children, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true, // ✅ smooth scroll control
        markers: true,
        id: `fade-${index + 1}`,
      },
    });

    // Manually stagger children over time portion of scroll
    const fadeStep = 1 / children.length; // percent of scroll per child

    children.forEach((child, i) => {
      tl.to(child, {
        opacity: 1,
        ease: 'none',
      }, i * fadeStep); // 👈 schedule each fade at increasing offsets
    });
  });

  ScrollTrigger.refresh();
}
