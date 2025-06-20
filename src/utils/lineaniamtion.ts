export async function initLineAnimations(id: string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" | string = "top" ,
  positionEnd:"top" | "center" | "bottom" | string = "top",
  mark:boolean) {
  try {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText') as typeof import('gsap/SplitText') & {
      SplitText: typeof import('gsap/SplitText').SplitText;
    };

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element #${id} not found`);
      return () => {};
    }

    const split = SplitText.create(element, {
      type: 'lines',
      linesClass: `line-${id}`
    });
    
    // Start hidden & below
    gsap.set(split.lines, { opacity: 0, y: 1000 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
        invalidateOnRefresh: true,
        onLeave: () => gsap.set(split.lines, { opacity: 0, y: 100 }),
        onLeaveBack: () => gsap.set(split.lines, { opacity: 0, y: 100 })
      }
    });
    
    tl.to(split.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: {
        each: 0.25,
        from: 'start'
      }
    });
    

    // Optional: Return a cleanup function
    return () => {
      tl.kill();
      split.revert();
    };

  } catch (error) {
    console.error('Line animation initialization failed:', error);
    return () => {};
  }
}
