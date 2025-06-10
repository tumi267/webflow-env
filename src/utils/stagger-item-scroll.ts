import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function staggerItemScroll(id: string) {
  const parent = document.getElementById(id);
  if (!parent) return;

  const items = parent.querySelectorAll<HTMLElement>('*'); 

  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
      end: 'top center',
      scrub: true,
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
  });
}