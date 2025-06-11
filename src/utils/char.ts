import { gsap, ScrollTrigger } from '$utils/gsap-core';
import { SplitText } from 'gsap/SplitText';


export function initCharAnimations(id: string) {
   
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
          }, i * 0.05); // Manual stagger by offsetting start time
        });
    
        // Revert on resize (optional)
        const onResize = () => split.revert();
        window.addEventListener('resize', onResize);
      });
    }