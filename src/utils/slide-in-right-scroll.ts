import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function slideInRightScroll(){
    gsap.from(".slide-in-right", {
        scrollTrigger: {
          trigger: ".slide-in-right",
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        x: 100,
        opacity: 0,
        duration: 0.8
      });
}