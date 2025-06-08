import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Contextual(){
    ScrollTrigger.create({
        trigger: ".Contextual",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            const element = document.getElementsByClassName('Contextual') as HTMLCollectionOf<HTMLElement>;
            element[0].style.display = 'block';
        },
        onLeaveBack: () => {const element = document.getElementsByClassName('Contextual') as HTMLCollectionOf<HTMLElement>;
        element[0].style.display = 'none';}
      });
}