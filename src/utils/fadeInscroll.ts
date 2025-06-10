import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function fadeInScroll(id:string){
    gsap.from(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        opacity: 0,
        duration: 1
      });
}