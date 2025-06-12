export async function initWordAnimations(id: string) {
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

        const element = document.getElementById(id);
        if (!element) {
          console.warn(`Element #${id} not found`);
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
            start: 'top center',
            end: 'top 20%',
            scrub: true,
            markers: false,

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
      
    } catch (error) {
      console.error('Word animation initialization failed:', error);
      return () => {}; // Return no-op function if initialization fails
    }
  }