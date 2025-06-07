import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function initCharAnimations() {
   


    document.addEventListener('DOMContentLoaded', () => {
        // Create SplitText instances for all elements with line_animation class
        let char=SplitText.create(".header",{
            type:'chars'
          });
          
          let tl=gsap.timeline({defaults:{duration:1,autoAlpha:0,y:-100}})
          
          tl.from(char.chars,{stagger:0.05})
          
            // Cleanup function for resize events
            const onResize = () => char.revert();
            window.addEventListener('resize', onResize);

            // Optional: Add cleanup when component unmounts
            // (if using in a framework like React/Vue)
            return () => {
                window.removeEventListener('resize', onResize);
                char.revert();
            };
        })};