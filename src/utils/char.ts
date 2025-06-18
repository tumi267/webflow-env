export async function initCharAnimations(id: string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" = "top" ,
  positionEnd:"top" | "center" | "bottom" = "top",
  mark:boolean) {
    try {
      // Dynamic imports with error handling
      const [gsap, ScrollTrigger, SplitText] = await Promise.all([
        import('gsap').then(m => m.gsap),
        import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
        import('gsap/SplitText').then(m => m.SplitText)
      ]);
  
      gsap.registerPlugin(ScrollTrigger, SplitText);
  
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Element with ID "${id}" not found`);
          return;
        }
  
        const split = new SplitText(element, { 
          type: 'chars',
          charsClass: `char-${id}` // Unique class for each instance
        });
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `${position} ${start}%`,
            end: `${positionEnd} ${end}%`,
            scrub: true,
            markers:mark
          }
        });
  
        tl.from(split.chars, {
          autoAlpha: 0,
          y: -100,
          duration: 1,
          stagger: 0.05 // Cleaner stagger syntax
        });
  
    } catch (error) {
      console.error('Animation initialization failed:', error);
    }
  }