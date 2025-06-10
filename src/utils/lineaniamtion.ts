import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initLineAnimations(id:string) {
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
