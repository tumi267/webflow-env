// width issue pannel jumps to blank
export async function horizontalScroll(id: string): Promise<void> {
  // Dynamically import GSAP and its plugins
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="horizontal"]`);
  const cleanups: (() => void)[] = [];

  elements.forEach((container) => {

  // Parse dataset values with fallbacks
  const start = container.dataset.start ?? '0';
  const position = container.dataset.position ?? 'top';
  const mark = container.dataset.mark === 'true';
  const y = container.dataset.y ?? '100';
  const x = container.dataset.x ?? '100';


  // Scope the panels to only those inside the container
  const panels = Array.from(container.querySelectorAll<HTMLElement>('.panel_horizontal'));
  const panelCount = panels.length;

  if (panelCount === 0) {
    console.warn('horizontalScroll: No .panel_horizontal elements found inside container.');
    return;
  }

  // Set the container's width to fit all panels horizontally
  gsap.set(container, {
    width: `${100 * panelCount}vw`
  });

  // Create the horizontal scroll animation
  gsap.to(panels, {
    xPercent: -x * (panelCount - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelCount - 1),
      start: `${position} ${start}`,
      // end: () => `+=${container.scrollWidth - window.innerWidth}`,
      markers: mark,
    },
  });
})
ScrollTrigger.refresh();
}
