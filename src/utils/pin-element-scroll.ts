import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function Pin(id:string){
    gsap.to(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          pin: true,
          start: "top top",
          end: "+=500",
          scrub:true
        }
      });
}