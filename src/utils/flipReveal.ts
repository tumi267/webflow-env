
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function flipReveal (){
  const flipReveal = gsap.timeline({
    scrollTrigger: {
      trigger: ".flip_reveal",
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none none",
      markers: false, // Enable for debugging
      scrub:true,
      }
    })
    let num = 3;
    flipReveal.to(".flip_reveal img", {
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