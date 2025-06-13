

export async function rotateScroll(id: string,start:number) {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent) return;

  const children = parent.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;

  gsap.from(children, {
    scrollTrigger: {
      trigger: parent,
      start: `top ${start}%`,
      end: "bottom -10%",
      scrub: true,
      // markers:true,
    },
    rotation: 180,
    opacity: 0,
    duration: 1,
    // stagger: 0.2, // optional: stagger effect
  });
}
