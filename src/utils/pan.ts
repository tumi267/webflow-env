import { gsap, ScrollTrigger } from '$utils/gsap-core';

export function pan(id:string) {
  const container = document.querySelector(`#${id}`) as HTMLElement;
  if (!container) return;

  const children = Array.from(container.children) as HTMLElement[];

  const intensityX = 30;
  const intensityY = 30;
  const duration = 0.5;

  const handleMouseMove = (e: MouseEvent) => {
    const bounds = container.getBoundingClientRect();
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

  container.addEventListener('mousemove', handleMouseMove);

  // Optional: reset on mouse leave
  container.addEventListener('mouseleave', () => {
    children.forEach((child) => {
      gsap.to(child, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    });
  });

  // Cleanup function
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
  };
}
