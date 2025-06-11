import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function toggleScroll(id:string){
    ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {console.log('do something')},
        onLeaveBack: () => {console.log('do something else')}
      });
}