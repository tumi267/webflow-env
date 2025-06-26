export async function staggerItemScroll() {
      // Dynamically import GSAP and its plugins
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="stagger"]`);
  const cleanups: (() => void)[] = [];

  elements.forEach((el) => {
  // Parse dataset values with fallbacks
  const start = el.dataset.start ?? '0';
  const end = el.dataset.end ?? '100';
  const position = el.dataset.position ?? 'top';
  const positionEnd = el.dataset.positionend ?? 'bottom';
  const mark = el.dataset.mark === 'true';

  const y = el.dataset.y ?? '50';
  const x = el.dataset.x ?? '0';
  const duration = parseFloat(el.dataset.duration ?? '0.5');

  const items = el.querySelectorAll<HTMLElement>('*'); 

  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers:mark,
    },
    y: y,
    x:x,
    opacity: 0,
    duration: duration,
    stagger: 0.2,
  });
})
}