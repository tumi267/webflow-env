import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function staggerItemScroll(){
    gsap.from(".stagger-item", {
        scrollTrigger: {
          trigger: ".stagger-container",
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
      });
}