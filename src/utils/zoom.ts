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
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".zoom",
        start: "top center",
        end: "bottom 20%",
        scrub: 0.5,
        markers: false // Enable for debugging
      }
    }
  );
}