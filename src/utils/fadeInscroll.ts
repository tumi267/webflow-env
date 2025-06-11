import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function fadeInScroll(id:string){
    gsap.from(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        opacity: 0,
        duration: 1
      });
}