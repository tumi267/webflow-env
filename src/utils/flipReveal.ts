
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function flipReveal (id:string){
  const parent = document.getElementById(id);
      if (!parent) return;
    
      const children = parent.querySelectorAll<HTMLElement>('*'); // Animate children
    
      // Add perspective to parent for 3D rotation
      gsap.set(parent, { transformPerspective: 2000 });
    
      const tl = gsap.timeline({
      scrollTrigger: {
      trigger: parent,
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none none",
      
      scrub:true,
      }
    })
    let num = 3;
    tl.to(children, {
      rotationY: `+=${360 * num}`,
      stagger: 0.2,
      duration: 2,
      ease: "back.out(1.7)",
      transformPerspective: 2000,
      onComplete: addFinalWobble
    });
    function addFinalWobble() {
        gsap.to(children, {
          rotationY: "+=10",
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      }

}