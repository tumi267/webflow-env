import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function threePanelfade(){
    const panels = document.querySelectorAll('.panel')

let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".panel-wrapper",     // wrap all your panels in a parent
      start: "top top",
      end: `+=${panels.length*100}%`,                 // 100% per panel (adjust if you add/remove panels)
      scrub: true,
      pin: true,
    }
  });
  
  // Panel 1 - from bottom
  tl.from(".from-bottom", {
    y: 200,
    opacity: 0,
    duration: 0.5
  })
  
  // Panel 2 - from left
  .from(".from-left", {
    x: -200,
    opacity: 0,
    duration: 0.5
  })
  
  // Panel 3 - from right
  .from(".from-right", {
    x: 200,
    opacity: 0,
    duration: 0.5
  });
}