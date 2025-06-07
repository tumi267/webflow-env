import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slideInLeft } from './slideInLeft';

export function slideInLeftScroll(){
    gsap.from(".slide-in-left", {
        scrollTrigger: {
          trigger: ".slide-in-left",
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        x: -100,
        opacity: 0,
        duration: 0.8
      });
}