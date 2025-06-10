import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function zoom (id:String){
    gsap.fromTo(`#${id}`,
    {
      scale: 1
    },
    {
      scale: 1.3,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top center",
        end: "bottom 20%",
        scrub: 0.5,
      
      }
    }
  );
}