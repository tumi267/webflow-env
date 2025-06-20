export async function Pin(id:string,start:number,end:number,  
position:"top" | "center" | "bottom" | string = "top" ,
positionEnd:"top" | "center" | "bottom" | string = "top" ,
mark:boolean){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger)
    gsap.to(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          pin: true,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub:true,
          markers:mark
        }
      });
}