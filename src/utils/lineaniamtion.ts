



export async function initLineAnimations(id:string) {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { SplitText } = await import('gsap/SplitText');
      
  document.addEventListener('DOMContentLoaded', () => {
    const split = SplitText.create(`#${id}`, {
      type: 'lines'
    });

    const lines = split.lines;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: true,
        
      }
    });

    lines.forEach((line, i) => {
      tl.from(line, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3"
      }, i * 0.25); // manual stagger
    });

    // Cleanup function for resize
    const onResize = () => split.revert();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      split.revert();
    };
  });
}
