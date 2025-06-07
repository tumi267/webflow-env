import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function growScroll(){
    gsap.from(".scale-up", {
        scrollTrigger: {
          trigger: ".scale-up",
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        scale: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
}