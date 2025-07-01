export async function initLineAnimations(): Promise<() => void> {
  try {
    // Dynamic imports with proper typing
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText') as typeof import('gsap/SplitText') & {
      new (target: gsap.DOMTarget, vars?: SplitText.Vars): SplitText;
    };

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const elements = document.querySelectorAll<HTMLElement>(`[data-animation="line"]`);
    const cleanups: (() => void)[] = [];

    elements.forEach((element) => {
      // Parse dataset values with fallbacks and proper typing
      const start = element.dataset.start ?? '0';
      const end = element.dataset.end ?? '100';
      const position = element.dataset.position ?? 'top';
      const positionEnd = element.dataset.positionend ?? 'bottom';
      const mark = element.dataset.mark === 'true';
      const y = element.dataset.y ?? '100';
      const x = element.dataset.x ?? '0';
      const duration = parseFloat(element.dataset.duration ?? '0.5');
      const stagger = parseFloat(element.dataset.stagger ?? '0.1');
      const staggerseq = (element.dataset.staggerseq as 'start' | 'end' | 'center' | 'edges') ?? 'start';

      // Create SplitText instance
      const split = new SplitText(element, {
        type: 'lines',
        linesClass: `line-${Math.random().toString(36).substring(2, 7)}`
      });

      // Initial hidden state
      gsap.set(split.lines, { 
        
        y: y,
        x: x
      });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub: true,
          markers: mark,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            gsap.set(split.lines, { opacity: 0 });
          }
        }
      });

      // Animation sequence
      tl.to(split.lines, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: duration,
        ease: 'power3.out',
        stagger: {
          each: stagger,
          from: staggerseq
        }
      });

      // Store cleanup function
      cleanups.push(() => {
        tl.kill();
        split.revert();
        ScrollTrigger.getAll().forEach(instance => {
          if (instance.trigger === element) {
            instance.kill();
          }
        });
      });
    });

    // Return combined cleanup function
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  } catch (error) {
    console.error('Line animation initialization failed:', error);
    return () => {};
  }
}