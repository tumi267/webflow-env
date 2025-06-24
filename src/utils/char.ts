export async function initCharAnimations(id: string) {
    try {
      // Dynamic imports with error handling
      const [gsap, ScrollTrigger, SplitText] = await Promise.all([
        import('gsap').then(m => m.gsap),
        import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
        import('gsap/SplitText').then(m => m.SplitText)
      ]);
  
      gsap.registerPlugin(ScrollTrigger, SplitText);
      
      const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`);

      

        // const el = document.getElementById(id);
        if (!el) {
          console.warn(`Element with ID "${id}" not found`);
          return;
        }
        // Parse dataset values with fallbacks
        const start = el.dataset.start ?? '0';
        const end = el.dataset.end ?? '100';
        const position = el.dataset.position ?? 'top';
        const positionEnd = el.dataset.positionend ?? 'bottom';
        const mark = el.dataset.mark === 'true';
        const y = el.dataset.y ?? '100';
        const x = el.dataset.x ?? '0';
        const duration = parseFloat(el.dataset.duration ?? '0.5');
        const stagger = parseFloat(el.dataset.stagger ?? '0.1');

        const split = new SplitText(el, { 
          type: 'chars',
          charsClass: `char-${id}` // Unique class for each instance
        });
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: `${position} ${start}%`,
            end: `${positionEnd} ${end}%`,
            scrub: true,
            markers:mark
          }
        });
  
        tl.from(split.chars, {
          autoAlpha: 0,
          y: y,
          x:x,
          duration: duration,
          stagger: stagger 
        });
  
    } catch (error) {
      console.error('Animation initialization failed:', error);
    }
  }