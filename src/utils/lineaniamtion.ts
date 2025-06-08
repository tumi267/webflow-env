import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function initLineAnimations() {
    document.addEventListener('DOMContentLoaded', () => {
        // Create SplitText instances for all elements with line_animation class
        let line=SplitText.create('.line_amination',{
            type:'lines'
          })
          gsap.from(line.lines,
            {
                rotationX: -100,
                transformOrigin: "50% 50% -160px",
                opacity: 0,
                duration: 0.8, 
                ease: "power3",
                stagger: 0.25
              }
          );
            // Cleanup function for resize events
            const onResize = () => line.revert();
            window.addEventListener('resize', onResize);

            // Optional: Add cleanup when component unmounts
            // (if using in a framework like React/Vue)
            return () => {
                window.removeEventListener('resize', onResize);
                line.revert();
            };
        })};