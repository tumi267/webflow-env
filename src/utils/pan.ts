

export async function pan() {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { SplitText } = await import('gsap/SplitText');
      
      const elements = document.querySelectorAll<HTMLElement>(`[data-animation="pan"]`);
      const cleanups: (() => void)[] = [];
    
      elements.forEach((el) => {

  const children = Array.from(el.children) as HTMLElement[];

  const intensityX = 30;
  const intensityY = 30;
  const duration = 0.5;

  const handleMouseMove = (e: MouseEvent) => {
    const bounds = el.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const deltaX = (e.clientX - centerX) / (bounds.width / 20);
    const deltaY = (e.clientY - centerY) / (bounds.height / 2);

    const targetX = deltaX * intensityX;
    const targetY = deltaY * intensityY;

    children.forEach((child) => {
      gsap.to(child, {
        x: targetX,
        y: targetY,
        duration: duration * 1.5,
        ease: 'power2.out',
      });
    });
  };

  el.addEventListener('mousemove', handleMouseMove);

  // Optional: reset on mouse leave
  el.addEventListener('mouseleave', () => {
    children.forEach((child) => {
      gsap.to(child, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    });
  });

  // Cleanup function
  return () => {
    el.removeEventListener('mousemove', handleMouseMove);
  };
})
ScrollTrigger.refresh();
}
