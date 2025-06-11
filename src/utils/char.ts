
export async function initCharAnimations(id: string) {
    // Dynamically import GSAP and its plugins
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
  
    gsap.registerPlugin(ScrollTrigger, SplitText);
  
    document.addEventListener('DOMContentLoaded', () => {
      const split = SplitText.create(`#${id}`, { type: 'chars' });
      const chars = split.chars;
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `#${id}`,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      });
  
      chars.forEach((char, i) => {
        tl.from(char, {
          autoAlpha: 0,
          y: -100,
          duration: 1,
        }, i * 0.05); // Stagger by start offset
      });
  
      const onResize = () => split.revert();
      window.addEventListener('resize', onResize);
    });
  }