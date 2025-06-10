import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function slideInLeft (id:string){
    gsap.from(`#${id}`, {
        x: -300,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top center",
          end: "bottom 10%",
          scrub:true,
         
        }
      });
}