export async function slideInRight (id:string){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    gsap.from(`#${id}`, {
        x: 300,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `#${id}`, // Element that triggers the animation
          start: "top center",          // When top hits 75% of viewport
          end: "bottom 10%",            // When top hits 25% of viewport
          scrub:true,
          
        }
      }); 
}