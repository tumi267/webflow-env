export async function slideInLeft (id:string,start:number){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    gsap.from(`#${id}`, {
        x: -300,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `#${id}`,
          start: `top ${start}%`,
          end: "bottom 10%",
          scrub:true,
         
        }
      });
}