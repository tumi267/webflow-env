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
        start: "top 85%",
        end: "center center",
        scrub: 0.5,
        toggleActions: "play none none none",
        markers: false // Enable for debugging
      }
    }
  );
}