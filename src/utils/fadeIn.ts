import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function fadeIn (){
    gsap.from(".fade_in", {
        opacity: 0,
        duration: 6,
        ease: "power2.out",
        scrollTrigger: {
        trigger: ".fade_in", // Element that triggers the animation
        start: "top 80%",   // When the top of `.fade_in` hits 80% of the viewport
        end: "top 20%",     // When the top of `.fade_in` hits 20% of the viewport
        toggleActions: "play none none none", // Play on enter, no other actions
        markers: true // Optional: Visual debugging (remove in production)
      }
      });
}