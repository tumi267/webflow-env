export async function threePanelFade(
    id: string,
    start: number,
    panelSpeed: number,
    position: "top" | "center" | "bottom" | string = "top",
    mark: boolean
  ) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
  
    const wrapper = document.getElementById(id);
    if (!wrapper) return;
  
    const children = Array.from(wrapper.children);
    if (children.length === 0) return;
  
    // Set initial position
    if (position.endsWith('px')) {
      gsap.set(wrapper, {
        position: 'relative',
        top: position,
      });
    }
  
    // Calculate total animation duration
    const totalDuration = children.length * panelSpeed + 1; // Base + stagger
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: position.endsWith('px') ? `top top` : `${position} ${start}%`,
        end: position.endsWith('px')
          ? `+=${totalDuration * 100}px` // Pixel-based scroll distance
          : `+=${totalDuration * 100}%`, // Percentage-based
        scrub: true,
        pin: true,
        markers: mark,
        pinSpacing:false, // Changed to true
        anticipatePin: 1,
        onRefresh: self => self.scroll(), // Helps recalculate on resize
      }
    });
  
    const animations = [
      { y: 200, opacity: 0 },
      { x: -200, opacity: 0 },
      { x: 200, opacity: 0 }
    ];
  
    children.forEach((child, index) => {
      const animationType = animations[index % animations.length];
      tl.from(child, {
        ...animationType,
        duration: 1,
        ease: "power2.out"
      }, index * panelSpeed);
    });
  
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }