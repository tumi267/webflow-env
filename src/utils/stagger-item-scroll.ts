export async function staggerItemScroll(id: string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" | string = "top" ,
  positionEnd:"top" | "center" | "bottom" | string = "top",
  mark:boolean) {
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
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers:mark,
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
  });
}