export async function rollReveal() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll('[data-animation="roll"]') as NodeListOf<HTMLElement>;

  elements.forEach((el) => {
    const children = el.querySelectorAll('*') as NodeListOf<HTMLElement>;
    if (!children.length) return;

    const start = el.dataset.start ?? '0';
    const end = el.dataset.end ?? '100';
    const position = el.dataset.position ?? 'top';
    const positionEnd = el.dataset.positionend ?? 'bottom';
    const mark = el.dataset.mark === 'true';
    const duration = parseFloat(el.dataset.duration ?? '0.5');

    // Set initial clipPath for each child
    gsap.set(children, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    });

    // Animate each child in timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
      }
    });

    tl.to(children, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration,
      ease: "power3.out",
      stagger: 0.1, // Optional: animate each child with a delay
    });
  });

  ScrollTrigger.refresh();
}
