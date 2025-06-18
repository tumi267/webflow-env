

export async function flipReveal (id:string,
  start:number,
  end:number,
  rotations:number,
  position:"top" | "center" | "bottom" = "top" ,
  positionEnd:"top" | "center" | "bottom" = "top",
  mark:boolean){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
      if (!parent) return;
    
      const children = parent.querySelectorAll<HTMLElement>('*'); // Animate children
    
      // Add perspective to parent for 3D rotation
      gsap.set(parent, { transformPerspective: 2000 });
    
      const tl = gsap.timeline({
      scrollTrigger: {
      trigger: parent,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      toggleActions: "play none none none",
      scrub:true,
      markers:mark
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
          rotationY: `+=2${rotations}`,
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      }

}