
export async function fadeIn (id:string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" = "top" ,
  positionEnd:"top" | "center" | "bottom" = "top",
  mark:boolean){
      // Dynamically import GSAP and its plugins
 
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    gsap.from(`#${id}`, {
        opacity: 0,
  
        ease: "power2.out",
        scrollTrigger: {
        trigger: `#${id}`, // Element that triggers the animation
        start: `${position} ${start}%`,   // When the top of `.fade_in` hits 80% of the viewport
        end: `${positionEnd} ${end}%`,     // When the top of `.fade_in` hits 20% of the viewport
        scrub:true,
        markers:mark
      }
      });
}