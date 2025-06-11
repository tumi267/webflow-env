export async function initCharAnimations(id: string) {
    try {
      // Dynamic imports with error handling
      const [gsap, ScrollTrigger, SplitText] = await Promise.all([
        import('gsap').then(m => m.gsap),
        import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
        import('gsap/SplitText').then(m => m.SplitText)
      ]);
  
      gsap.registerPlugin(ScrollTrigger, SplitText);
  
      // Check if DOM is already loaded
      const domReady = document.readyState === 'complete' || 
                       document.readyState === 'interactive';
  
      const initAnimation = () => {
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
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
  
            invalidateOnRefresh: true
          }
        });
  
        tl.from(split.chars, {
          autoAlpha: 0,
          y: -100,
          duration: 1,
          stagger: 0.05 // Cleaner stagger syntax
        });
  
        // Cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === element) {
              trigger.kill();
            }
          });
          split.revert();
        };
      };
  
      // Handle both cases: DOM ready or not
      let cleanup: (() => void) | undefined;
      
      if (domReady) {
        cleanup = initAnimation();
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          cleanup = initAnimation();
        });
      }
  
      // Responsive cleanup
      const onResize = () => {
        cleanup?.();
        cleanup = initAnimation(); // Re-init after resize
      };
  
      const resizeObserver = new ResizeObserver(onResize);
      const element = document.getElementById(id);
      if (element) resizeObserver.observe(element);
  
      return () => {
        cleanup?.();
        resizeObserver.disconnect();
        window.removeEventListener('resize', onResize);
      };
  
    } catch (error) {
      console.error('Animation initialization failed:', error);
    }
  }