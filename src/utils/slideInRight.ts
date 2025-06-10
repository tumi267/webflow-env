import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function slideInRight (){
    gsap.from(".slide_in_right", {
        x: 300,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".slide_in_right", // Element that triggers the animation
          start: "top 75%",          // When top hits 75% of viewport
          end: "top 25%",            // When top hits 25% of viewport
          toggleActions: "play none none none", // Play once on enter
          markers: false             // Enable for debugging (set to true)
        }
      }); 
}