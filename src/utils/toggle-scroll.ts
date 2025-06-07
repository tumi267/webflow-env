import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function toggleScroll(){
    ScrollTrigger.create({
        trigger: ".toggle-element",
        start: "top center",
        end: "bottom center",
        onEnter: () => {console.log('do something')},
        onLeaveBack: () => {console.log('do something else')}
      });
}