
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function flipReveal (){
    let num = 3;
    gsap.to(".flip_reveal img", {
      rotationY: `+=${360 * num}`,
      stagger: 0.2,
      duration: 2,
      ease: "back.out(1.7)",
      transformPerspective: 2000,
      onComplete: addFinalWobble
    });
    function addFinalWobble() {
        gsap.to(".flip_reveal", {
          rotationY: "+=10",
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      }
}