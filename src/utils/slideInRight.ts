export async function slideInRight() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="slideRight"]`);

  elements.forEach((parent, index) => {
    const children = Array.from(parent.children) as HTMLElement[];// direct children
    if (!children.length) return;

    const start = parent.dataset.start ?? '0';
    const end = parent.dataset.end ?? '100';
    const position = parent.dataset.position ?? 'top';
    const positionEnd = parent.dataset.positionend ?? 'bottom';
    const mark = parent.dataset.mark === 'true';
    const y = parseFloat(parent.dataset.y ?? '0');
    const x = parseFloat(parent.dataset.x ?? '1000');
    const duration = parseFloat(parent.dataset.duration ?? '0.5');

    // Set initial state for children — slide in from right
    gsap.set(children, {
      x: x,
      y: y,
     
    });

    // Create a timeline with scrollTrigger (no scrub, play once)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub:true,
        markers: mark,
        id: `slideRight-${index + 1}`,
      },
    });

    // Animate children sequentially into place
    tl.to(children, {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      ease: 'power3.out',
      stagger: duration,
    });
  });

  ScrollTrigger.refresh();
}
