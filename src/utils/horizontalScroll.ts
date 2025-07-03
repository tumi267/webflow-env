import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export async function horizontalScroll(id: string): Promise<void> {
  // Optionally create ScrollSmoother only once
  if (!ScrollSmoother.get()) {
    ScrollSmoother.create({
      wrapper: '[data-scroll-wrapper]',
      content: '[data-scroll-content]',
      smooth: 1.2,
      smoothTouch: 0.1,
      effects: '[data-animation="smooth"]'
    });
  }

  const containers = document.querySelectorAll<HTMLElement>(`[data-animation="horizontal"]`);
  if (containers.length === 0) {
    console.warn('horizontalScroll: No horizontal scroll containers found.');
    return;
  }

  containers.forEach((container) => {
    const start = container.dataset.start ?? '0';
    const position = container.dataset.position ?? 'top';
    const mark = container.dataset.mark === 'true';
    const x = parseFloat(container.dataset.x ?? '100');

    // Panels inside container
    const panels = Array.from(container.querySelectorAll<HTMLElement>('.panel_horizontal'));
    const panelCount = panels.length;

    if (panelCount === 0) {
      console.warn('horizontalScroll: No .panel_horizontal elements found inside container.');
      return;
    }

    // Set container width to hold all panels horizontally
    gsap.set(container, {
      width: `${100 * panelCount}vw`
    });

    // Horizontal scroll animation with ScrollTrigger inside smooth scroller
    gsap.to(panels, {
      xPercent: -x * (panelCount - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (panelCount - 1),
        start: `${position} ${start}`,
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        markers: mark,
        invalidateOnRefresh: true, // Helps in recalculating on resize
      }
    });
  });

  ScrollTrigger.refresh();
}
