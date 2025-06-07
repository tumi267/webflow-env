import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function fadeInScroll(){
    gsap.from(".fade-element", {
        scrollTrigger: {
          trigger: ".fade-element",
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        opacity: 0,
        duration: 1
      });
}