export async function initWordAnimations(): Promise<() => void> {
  try {
    // Dynamic imports with proper typing
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText') as typeof import('gsap/SplitText') & {
      create: (target: gsap.DOMTarget, vars?: SplitText.Vars) => SplitText;
    };

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const elements = document.querySelectorAll<HTMLElement>(`[data-animation="word"]`);
    const cleanups: (() => void)[] = [];

    elements.forEach((el) => {
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
      const staggerseq = (el.dataset.staggerseq as 'start' | 'end' | 'center' | 'edges') ?? 'start';

      // Create SplitText instance
      const splitInstance = SplitText.create(el, {
        type: 'words',
        wordsClass: `word-${el.dataset.id || Math.random().toString(36).substring(2, 9)}`
      });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub: true,
          markers: mark,
        }
      });

      // Animation setup
      tl.from(splitInstance.words, {
        y,
        x,
        opacity: 0,
        
        duration,
        ease: 'power1.out',
        stagger: {
          each: stagger,
          from: staggerseq
        }
      });

      // Store cleanup function
      cleanups.push(() => {
        tl.kill();
        splitInstance.revert();
        ScrollTrigger.getAll().forEach(instance => {
          if (instance.trigger === el) {
            instance.kill();
          }
        });
      });
    });
    ScrollTrigger.refresh();
    // Return combined cleanup function
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  } catch (error) {
    console.error('Word animation initialization failed:', error);
    return () => {};
  }
}