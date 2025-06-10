import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initWordAnimations(id: string) {
  document.addEventListener('DOMContentLoaded', () => {
    const split = SplitText.create(`#${id}`, {
      type: 'words',
    });

    const words = split.words;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
      },
    });

    words.forEach((word, i) => {
      tl.from(word, {
        y: -100,
        opacity: 0,
        rotation: gsap.utils.random(-80, 80),
        duration: 0.7,
        ease: 'back',
      }, i * 0.15); // manually staggered start time
    });

    // Cleanup function on resize
    const onResize = () => split.revert();
    window.addEventListener('resize', onResize);

    // Optional: unmount cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      split.revert();
    };
  });
}
