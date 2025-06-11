export async function initLineAnimations(id: string): Promise<() => void> {
  try {
    // Dynamically import GSAP with proper typing
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText') as typeof import('gsap/SplitText') & {
      create: (target: gsap.DOMTarget, vars?: SplitText.Vars) => SplitText;
    };

    // Register plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let splitInstance: SplitText | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    const cleanupFns: (() => void)[] = [];

    const initAnimation = () => {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Element #${id} not found`);
        return;
      }

      // Create SplitText instance
      splitInstance = SplitText.create(element, {
        type: 'lines',
        linesClass: `line-${id}`
      });

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: true,
          markers: false, // Enable for debugging if needed
          invalidateOnRefresh: true
        }
      });

      scrollTrigger = tl.scrollTrigger as ScrollTrigger;

      // Animate lines with proper stagger
      tl.from(splitInstance.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3",
        stagger: {
          each: 0.25,
          from: "start"
        }
      });

      // Responsive handling using ResizeObserver
      const handleResize = () => {
        splitInstance?.revert();
        scrollTrigger?.refresh();
        initAnimation();
      };

      const resizeObserver = new ResizeObserver(
        gsap.utils.throttle(handleResize, 200)
      );
      resizeObserver.observe(element);
      cleanupFns.push(() => resizeObserver.disconnect());

      return () => {
        splitInstance?.revert();
        scrollTrigger?.kill();
      };
    };

    // Handle DOM ready state
    if (document.readyState === 'complete') {
      const animationCleanup = initAnimation();
      if (animationCleanup) cleanupFns.push(animationCleanup);
    } else {
      const domLoadedHandler = () => {
        const animationCleanup = initAnimation();
        if (animationCleanup) cleanupFns.push(animationCleanup);
      };
      document.addEventListener('DOMContentLoaded', domLoadedHandler);
      cleanupFns.push(() => {
        document.removeEventListener('DOMContentLoaded', domLoadedHandler);
      });
    }

    return () => cleanupFns.forEach(fn => fn());

  } catch (error) {
    console.error('Line animation initialization failed:', error);
    return () => {};
  }
}