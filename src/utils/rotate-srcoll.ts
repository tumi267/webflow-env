import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function rotateScroll(){
    gsap.from(".rotate", {
        scrollTrigger: {
          trigger: ".rotate",
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        rotation: 180,
        opacity: 0,
        duration: 1
      });
}