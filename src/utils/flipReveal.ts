export async function flipReveal (){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const elements = document.querySelectorAll(`[data-animation="flip"]`) as NodeListOf<HTMLElement>;;
      const cleanups: (() => void)[] = [];
    
      elements.forEach((parent) => {

        const children = parent.querySelectorAll('*');
        const hasChildren = children.length > 0;
        const target = hasChildren ? children : parent; // ← key line

      // Add perspective to parent for 3D rotation
      gsap.set(parent, { transformPerspective: 2000 });

      const start = parent.dataset.start ?? '0';
      const end = parent.dataset.end ?? '100';
      const position = parent.dataset.position ?? 'top';
      const positionEnd = parent.dataset.positionend ?? 'bottom';
      const mark = parent.dataset.mark === 'true';
      const duration = parseFloat(parent.dataset.duration ?? '0.5');
      const wobble =parent.dataset.wobble??'6'
      const num = parent.dataset.num??'6';
console.log('working')

      const tl = gsap.timeline({
      scrollTrigger: {
      trigger: target,
      start: `top ${start}%`,
      end: `bottom ${end}%`,
      toggleActions: "play none none none",
      scrub:true,
      id: 'flip' ,
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