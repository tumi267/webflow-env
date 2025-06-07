import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function fadeIn (){
    gsap.from(".fade_in", {
        opacity: 0,
        duration: 6,
        ease: "power2.out"
      });
}