export async function flipReveal (){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const elements = document.querySelectorAll<HTMLElement>(`[data-animation="flip"]`);
      const cleanups: (() => void)[] = [];
    
      elements.forEach((parent) => {

      const children = parent.querySelectorAll<HTMLElement>('*'); // Animate children
    
      // Add perspective to parent for 3D rotation
      gsap.set(parent, { transformPerspective: 2000 });

      const start = parent.dataset.start ?? '0';
      const end = parent.dataset.end ?? '100';
      const position = parent.dataset.position ?? 'top';
      const positionEnd = parent.dataset.positionend ?? 'bottom';
      const mark = parent.dataset.mark === 'true';
      const duration = parseFloat(parent.dataset.duration ?? '0.5');
      const wobble =parent.dataset.wobble??'6'
      const num = parent.dataset.num??'3';


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
    
    tl.to(children, {
      rotationY: `+=${360 * num}`,
   
      stagger: 0.2,
      duration: duration,
      ease: "back.out(1.7)",
      transformPerspective: 2000,
      onComplete: addFinalWobble
    });
    function addFinalWobble() {
        gsap.to(children, {
          rotationY: `+=2${wobble}`,
  
          duration: 0.5,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      }
    })
    ScrollTrigger.refresh();
}