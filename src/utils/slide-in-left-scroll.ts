import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function slideInLeftScroll(id:string){
    gsap.from(`#${id}`, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 80%",
          end:"top top",
          scrub:true
        },
        x: -100,
        opacity: 0,
        duration: 0.8
      });
}