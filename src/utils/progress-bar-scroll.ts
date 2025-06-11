import { gsap, ScrollTrigger } from '$utils/gsap-core';
export function progressBar(id:string){
  const parent = document.getElementById(id);
  if (!parent) return;

  const children = parent.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;
    gsap.to(children, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top 90%",
          end: "top 1%",
          scrub: 3,
        },
        width: "100%"
      });
}