import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function zoom (){
    gsap.fromTo(".zoom",
    {
      scale: 1
    },
    {
      scale: 1.3,
      duration: 2,
      ease: "power2.out"
    }
  );
}