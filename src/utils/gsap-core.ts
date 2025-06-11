export async function loadGsap() {
    const gsap = (await import('gsap')).gsap;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  
    gsap.registerPlugin(ScrollTrigger);
  
    return { gsap, ScrollTrigger };
  }