export async function flipReveal() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll(`[data-animation="flip"]`) as NodeListOf<HTMLElement>;

  elements.forEach((parent) => {
    const children = parent.querySelectorAll('*') as NodeListOf<HTMLElement>;
    if (!children.length) return;

    // Apply 3D perspective to parent container
    gsap.set(parent, { transformPerspective: 2000 });

    // Ensure children are 3D-enabled
    gsap.set(children, {
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
    });

    // Parse data attributes
    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const duration = parseFloat(parent.dataset.duration ?? '0.5');
    const wobble = parseFloat(parent.dataset.wobble ?? '6');
    const num = parseFloat(parent.dataset.num ?? '3');

    // Setup GSAP scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        toggleActions: "play none none none",
        scrub: true,
        markers: mark,
      },
    });

    tl.to(children, {
      rotationY: `+=${360 * num}`,
      stagger: 0.2,
      duration,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(children, {
          rotationY: `+=${2 * wobble}`,
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut",
        });
      },
    });
  });

  ScrollTrigger.refresh();
}
