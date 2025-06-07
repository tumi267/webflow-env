// import { greetUser } from '$utils/greet';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { initDecodeAnimations } from '$utils/decode';
import { initLineAnimations } from '$utils/lineaniamtion';
import { initWordAnimations } from '$utils/word';
import { initCharAnimations } from '$utils/char';
import { initMaskAnimation } from '$utils/textmask';
import { initTracking } from '$utils/texttracker';

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);


// char animation
initCharAnimations()
//word aniamtion
initWordAnimations()
// lineaniamtion
initLineAnimations()
// decode text
initDecodeAnimations()
// text mask
initMaskAnimation()
// mouse tracking 
initTracking()

// window.Webflow ||= [];
// window.Webflow.push(() => {
//   const name = 'John Doe';
//   greetUser(name);
// });




// tl.to('.slice', {
//   xPercent: -100,
//   duration: 1,
//   stagger: {
//     each: 0.1,
//     from: 'center',
//   },
//   repeat: -1,
//   repeatDelay: 1,
//   yoyo: true,
//   ease: 'expo.out',
// });
// gsap.from('.image3', {
//   repeat: -1,
//   y: -200,
//   ease: 'sine.inOut',
//   stagger: {
//     each: 0.1,
//     from: 'end',
//   },
// });
