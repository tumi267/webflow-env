export async function Pin(id:string){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
    gsap.to(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          pin: true,
          start: "top top",
          end: "+=500",
          scrub:true
        }
      });
}