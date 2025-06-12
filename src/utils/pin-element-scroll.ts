export async function Pin(id:string,start:number,end:number){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
    gsap.to(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          pin: true,
          start: `top top`,
          end: `bottom ${end}%`,
          scrub:true,

        }
      });
}