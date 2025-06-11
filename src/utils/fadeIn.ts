
export async function fadeIn (id:string){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
    gsap.from(`#${id}`, {
        opacity: 0,
        duration: 6,
        ease: "power2.out",
        scrollTrigger: {
        trigger: `#${id}`, // Element that triggers the animation
        start: "top center",   // When the top of `.fade_in` hits 80% of the viewport
        end: "bottom 20%",     // When the top of `.fade_in` hits 20% of the viewport
        scrub:true,
        
      }
      });
}