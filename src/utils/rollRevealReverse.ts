export async function rollRevealReverse() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll('[data-animation="rollReverse"]') as NodeListOf<HTMLElement>;

  elements.forEach((el) => {
    const children = el.querySelectorAll('*') as NodeListOf<HTMLElement>;
    if (!children.length) return;

    const start = el.dataset.start ?? '0';
    const end = el.dataset.end ?? '100';
    const position = el.dataset.position ?? 'top';
    const positionEnd = el.dataset.positionend ?? 'bottom';
    const mark = el.dataset.mark === 'true';
    const duration = parseFloat(el.dataset.duration ?? '0.5');

    // Set initial clipPath (revealed from bottom upward)
    gsap.set(children, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });

    tl.to(children, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration,
      ease: "power3.out",
      stagger: 0.1 // optional
    });
  });

  ScrollTrigger.refresh();
}
