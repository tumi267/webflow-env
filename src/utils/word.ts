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

    const el = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!el) {
      console.warn(`Element with data-id "${id}" not found`);
      return () => {};
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
    const staggerseq = (el.dataset.staggerseq as 'start' | 'end' | 'center' | 'edges') ?? 'start';

    // Create SplitText instance
    const splitInstance = SplitText.create(el, {
      type: 'words',
      wordsClass: `word-${id}`
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
      rotation: () => gsap.utils.random(-80, 80),
      duration,
      ease: 'back',
      stagger: {
        each: stagger,
        from: staggerseq
      }
    });

    // Return cleanup function
    return () => {
      tl.kill();
      splitInstance.revert();
      ScrollTrigger.getAll().forEach(instance => {
        if (instance.trigger === el) {
          instance.kill();
        }
      });
    };

  } catch (error) {
    console.error('Word animation initialization failed:', error);
    return () => {};
  }
}