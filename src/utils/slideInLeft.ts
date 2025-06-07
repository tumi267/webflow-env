import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function slideInLeft (){
    gsap.from(".slide_in_left", {
        x: -300,
        opacity: 0,
        duration: 2,
        ease: "power3.out"
      });
}