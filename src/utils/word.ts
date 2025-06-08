import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function initWordAnimations() {
    document.addEventListener('DOMContentLoaded', () => {
        // Create SplitText instances for all elements with line_animation class
        let word=SplitText.create('.sub_header',{
            type:'words'
          }) 
          const tl2 = gsap.timeline({defaults:{duration:1,autoAlpha:0,y:-100}});
              tl2.from(word.words,{y: -100,
                  opacity: 0,
                  rotation: "random(-80, 80)",
                  duration: 0.7, 
                  ease: "back",
                  stagger: 0.15})
            // Cleanup function for resize events
            const onResize = () => word.revert();
            window.addEventListener('resize', onResize);

            // Optional: Add cleanup when component unmounts
            // (if using in a framework like React/Vue)
            return () => {
                window.removeEventListener('resize', onResize);
                word.revert();
            };
        })};