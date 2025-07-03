export async function flipReveal() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll(`[data-animation="flip"]`) as NodeListOf<HTMLElement>;

  elements.forEach((parent) => {
    const children = parent.querySelectorAll('*') as NodeListOf<HTMLElement>;
    if (!children.length) return;

    // Set up 3D perspective on the container
    gsap.set(parent, { transformPerspective: 2000 });

    // Set up children for 3D
    gsap.set(children, {
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      rotationY: 0, // Reset any previous transform
    });

    // Parse data attributes
    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const duration = parseFloat(parent.dataset.duration ?? '0.5');
    const num = parseFloat(parent.dataset.num ?? '1');

    // Determine final rotation (absolute if num is 1, relative otherwise)
    const rotation = num === 1 ? 360 : `+=${360 * num}`;

    // Create the scroll-triggered flip animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
      },
    });

    tl.to(children, {
      rotationY: rotation,
      stagger: 0.2,
      duration,
      ease: "power2.out",
    });
  });

  ScrollTrigger.refresh();
}
