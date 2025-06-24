export async function initLineAnimations(id: string): Promise<() => void> {
  try {
    // Dynamic imports with proper typing
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const element = document.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!element) {
      console.warn(`Element with data-id "${id}" not found`);
      return () => {};
    }

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
      linesClass: `line-${id}`
    });

    // Initial hidden state
    gsap.set(split.lines, { 
      opacity: 0, 
      y: y,  // Start from their final y position (hidden)
      x: x    // Start from their final x position (hidden)
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
          // Reset to hidden state when scrolling back past start
          gsap.set(split.lines, { opacity: 0 });
        }
      }
    });

    // Animation sequence
    tl.to(split.lines, {
      opacity: 1,
      y: 0,    // Animate to 0 (normal position)
      x: 0,    // Animate to 0 (normal position)
      duration: duration,
      ease: 'power3.out',
      stagger: {
        each: stagger,
        from: staggerseq
      }
    });

    // Return cleanup function
    return () => {
      tl.kill();
      split.revert();
      ScrollTrigger.getAll().forEach(instance => {
        if (instance.trigger === element) {
          instance.kill();
        }
      });
    };

  } catch (error) {
    console.error('Line animation initialization failed:', error);
    return () => {};
  }
}
