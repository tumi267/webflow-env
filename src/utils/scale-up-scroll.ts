import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function growScroll(id:string){
    gsap.from(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        scale: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
}