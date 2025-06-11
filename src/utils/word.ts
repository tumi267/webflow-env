export async function initWordAnimations(id: string): Promise<() => void> {
    try {
      // Dynamic imports with proper typing
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { SplitText } = await import('gsap/SplitText') as typeof import('gsap/SplitText') & {
        create: (target: gsap.DOMTarget, vars?: SplitText.Vars) => SplitText;
      };
  
      // Register plugins
      gsap.registerPlugin(ScrollTrigger, SplitText);
  
      let splitInstance: SplitText | null = null;
      let scrollTriggerInstance: ScrollTrigger | null = null;
      const cleanupFns: (() => void)[] = [];
  
      const init = () => {
        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Element #${id} not found`);
          return;
        }

        // Create SplitText instance
        splitInstance = SplitText.create(element, {
          type: 'words',
          wordsClass: `word-${id}`
        });
  
        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
            markers: false,
            invalidateOnRefresh: true
          }
        });
  
        // Store ScrollTrigger reference
        scrollTriggerInstance = tl.scrollTrigger as ScrollTrigger;
  
        // Animation setup
        tl.from(splitInstance.words, {
          y: -100,
          opacity: 0,
          rotation: () => gsap.utils.random(-80, 80),
          duration: 0.7,
          ease: 'back',
          stagger: {
            each: 0.15,
            from: 'random'
          }
        });
  
        // Throttled resize handler
        const onResize = () => {
          splitInstance?.revert();
          scrollTriggerInstance?.refresh();
          init();
        };
  
        const throttledResize = gsap.utils.throttle(onResize, 200);
        const resizeObserver = new ResizeObserver(throttledResize);
        resizeObserver.observe(element);
        cleanupFns.push(() => resizeObserver.disconnect());
  
        return () => {
          splitInstance?.revert();
          scrollTriggerInstance?.kill();
        };
      };
  
      // Handle DOM ready state
      if (document.readyState === 'complete') {
        const animationCleanup = init();
        if (animationCleanup) cleanupFns.push(animationCleanup);
      } else {
        const domLoadedHandler = () => {
          const animationCleanup = init();
          if (animationCleanup) cleanupFns.push(animationCleanup);
        };
        document.addEventListener('DOMContentLoaded', domLoadedHandler);
        cleanupFns.push(() => {
          document.removeEventListener('DOMContentLoaded', domLoadedHandler);
        });
      }
  
      // Return comprehensive cleanup function
      return () => {
        cleanupFns.forEach(fn => fn());
      };
  
    } catch (error) {
      console.error('Word animation initialization failed:', error);
      return () => {}; // Return no-op function if initialization fails
    }
  }