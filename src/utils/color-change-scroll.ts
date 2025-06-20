

export async function colorChange(id: string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" | string = "top" ,
  positionEnd:"top" | "center" | "bottom" | string = "top",
  colorto:string,
  colorfrom:string,
  mark:boolean) {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
     gsap.registerPlugin(ScrollTrigger)
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild as HTMLElement | null;

  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }

  gsap.to(child, {
    scrollTrigger: {
      trigger: parent,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers:mark
    },
    backgroundColor:colorto ,
    color:colorfrom 
  });
}
