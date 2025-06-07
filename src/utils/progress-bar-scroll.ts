import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function progressBar(){
    gsap.to(".progress-bar", {
        scrollTrigger: {
          trigger: ".progress-container",
          start: "top 90%",
          end: "top 1%",
          scrub: 3,
        },
        width: "100%"
      });
}