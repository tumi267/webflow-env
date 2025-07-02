export async function threePanelFade(id: string) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
  
    const elements = document.querySelectorAll<HTMLElement>(`[data-animation="threePanel"]`);
    const cleanups: (() => void)[] = [];
    elements.forEach((el) => {
    // Parse dataset values with fallbacks
    const start = el.dataset.start ?? '0';
    const end = el.dataset.end ?? '100';
    const position = el.dataset.position ?? 'top';

    const mark = el.dataset.mark === 'true';
    const y1 = el.dataset.y1 ?? '200';
    const x1 = el.dataset.x1 ?? '-200';
    const y2 = el.dataset.y2 ?? '200';
    const x2 = el.dataset.x2 ?? '-200';
    const y3 = el.dataset.y3 ?? '200';
    const x3 = el.dataset.x3 ?? '-200';
    const duration = parseFloat(el.dataset.duration ?? '2');
 
  
    const children = Array.from(el.children);
    if (children.length === 0) return;
  
    // Set initial position
    if (position.endsWith('px')) {
      gsap.set(el, {
        position: 'relative',
        top: position,
      });
    }
  
    // Calculate total animation duration
    const totalDuration = children.length * duration + 1; // Base + stagger
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start:  `${position} ${start}%`,
        end: `+=${totalDuration * 100}%`, // Percentage-based
        scrub: true,
        pin: true,
        markers: mark,
        pinSpacing:false, // Changed to true
        anticipatePin: 1,
        onRefresh: self => self.scroll(), // Helps recalculate on resize
      }
    });
  
    const animations = [
      { y: y1,x:x1, opacity: 0 },
      { y: y2,x:x2, opacity: 0 },
      { y: y3,x:x3,  opacity: 0 }
    ];
  
    children.forEach((child, index) => {
      const animationType = animations[index % animations.length];
      tl.from(child, {
        ...animationType,
        duration: 1,
        ease: "power2.out"
      }, index * duration);
    });
  
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  })
  ScrollTrigger.refresh();
  }