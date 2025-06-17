export async function slideInLeft (id:string,
  start:number,
  end:number,
  amount:number,
  position:"top" | "center" | "bottom" = "top" ,
  positionEnd:"top" | "center" | "bottom" = "top",
  mark:boolean
  ){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    gsap.from(`#${id}`, {
        x: -amount,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `#${id}`,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub:true,
          markers:mark
        }
      });
}