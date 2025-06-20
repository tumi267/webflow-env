// width issue pannel jumps to blank
export async function horizontalScroll(
  id: string,
  start: number,
  position: "top" | "center" | "bottom" | string = "top",
  mark: boolean
): Promise<void> {
  // Dynamically import GSAP and its plugins
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector<HTMLElement>(`#${id}`);
  if (!container) {
    console.warn('horizontalScroll: container not found.');
    return;
  }

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
    xPercent: -100 * (panelCount - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelCount - 1),
      start: `${position} ${start}px`,
      end: () => `+=${container.scrollWidth - window.innerWidth}`,
      markers: mark,
    },
  });
}
