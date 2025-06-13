export async function staggerItemScroll(id: string,start:number) {
      // Dynamically import GSAP and its plugins
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent) return;

  const items = parent.querySelectorAll<HTMLElement>('*'); 

  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: parent,
      start: `top ${start}%`,
      end: 'bottom 10%',
      scrub: true,
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
  });
}