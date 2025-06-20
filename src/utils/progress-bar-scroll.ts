
export async function progressBar(id:string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" | string = "top" ,
  positionEnd:"top" | "center" | "bottom" | string = "top",
  mark:boolean){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

  const parent = document.getElementById(id);
  if (!parent) return;

  const children = parent.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;
    gsap.to(children, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub: 3,
          markers:mark
        },
        width: "100%"
      });
}