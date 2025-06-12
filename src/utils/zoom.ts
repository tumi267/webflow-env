export async function zoom (id:String,start:Number){
    // Dynamically import GSAP and its plugins
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
    gsap.fromTo(`#${id}`,
    {
      scale: 1
    },
    {
      scale: 1.3,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: `#${id}`,
        start: `top ${start}%`,
        end: "bottom 20%",
        scrub: 0.5,
      }
    }
  );
}