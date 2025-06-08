import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function horizontalScroll(): void {
  const container = document.querySelector('.container_horizontal') as HTMLElement | null;
  const panels = gsap.utils.toArray<HTMLElement>('.panel_horizontal');
  const panelCount = panels.length;

  if (!container || panelCount === 0) {
    console.warn('horizontalScroll: container or panels not found.');
    return;
  }

  // Set container width to accommodate all panels
  gsap.set(container, {
    width: `${100 * panelCount}vw`
  });

  // Create horizontal scroll animation
  gsap.to(panels, {
    xPercent: -100 * (panelCount ),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      
      pin: true,
      scrub: 1,
      snap: 1 / (panelCount ),
      end: () => "+=" + (container.scrollWidth - window.innerWidth),
     
    }
  });
}
