import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScroll() {
  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="smooth"]`);

  // Set defaults
  let smooth = 1.2;
  let smoothTouch = 0.1;

  // Optional: Override defaults if first element has data attributes
  if (elements.length) {
    const first = elements[0];
    if (first.dataset.speed) smooth = parseFloat(first.dataset.speed);
    if (first.dataset.lag) smoothTouch = parseFloat(first.dataset.lag);
  }

  ScrollSmoother.create({
    wrapper: '[data-scroll-wrapper]',
    content: '[data-scroll-content]',
    smooth,
    smoothTouch,
    effects: '[data-animation="smooth"]'
  });
}
