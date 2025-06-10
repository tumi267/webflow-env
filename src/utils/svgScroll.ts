import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

export function svgScroll(id:string): void {
  gsap.set('.ball01', { x: -5, y: 0 ,autoAlpha: 1});

  // Pulses: start hidden & scaled down, then animate to visible + pulse
  const pulses = gsap.timeline();

  pulses.fromTo('.ball02, .text01', 
    { autoAlpha: 0, scale: 0 },
    { autoAlpha: 1, scale: 2, transformOrigin: 'center', ease: 'elastic(2.5, 1)' }, 0.2
  );
  pulses.fromTo('.ball03, .text02', 
    { autoAlpha: 0, scale: 0 },
    { autoAlpha: 1, scale: 2, transformOrigin: 'center', ease: 'elastic(2.5, 1)' }, 0.56
  );
  pulses.fromTo('.ball04, .text03', 
    { autoAlpha: 0, scale: 0 },
    { autoAlpha: 1, scale: 2, transformOrigin: 'center', ease: 'elastic(2.5, 1)' }, 1
  );

  const main = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      scrub: true,
      start: 'top center',
      end: '+=300%',
    
    }
  });

  main
    .from('.theLine', { drawSVG: 0,duration: 4 })
    .to('.ball01', {
      motionPath: {
        path: '.theLine',
        align: '.theLine',
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1
      },
      duration: 4
    }, 0)
    .add(pulses, 0);
}
