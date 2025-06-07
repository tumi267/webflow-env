import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Pin(){
    gsap.to(".pin", {
        scrollTrigger: {
          trigger: ".pin",
          pin: true,
          start: "top top",
          end: "+=500",
          scrub:true
        }
      });
}