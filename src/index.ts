import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'John Doe';
  greetUser(name);
});

import { gsap } from 'gsap';
const tl = gsap.timeline();

tl.to('.slice', {
  xPercent: -100,
  duration: 1,
  stagger: {
    each: 0.1,
    from: 'center',
  },
  repeat: -1,
  repeatDelay: 1,
  yoyo: true,
  ease: 'expo.out',
});
gsap.from('.image3', {
  repeat: -1,
  y: -200,
  ease: 'sine.inOut',
  stagger: {
    each: 0.1,
    from: 'end',
  },
});
