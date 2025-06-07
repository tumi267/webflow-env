import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function colorChange(){
    gsap.to(".color-change", {
        scrollTrigger: {
          trigger: ".color-change",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
        backgroundColor: "#4a00e0",
        color: "#ffffff"
      });
}