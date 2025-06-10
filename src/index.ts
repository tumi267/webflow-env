// import { greetUser } from '$utils/greet';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { horizontalScroll } from '$utils/horizontalScroll';
import { threePanelFade } from '$utils/threepanelfadein';
import { svgScroll } from '$utils/svgScroll';
import { Contextual } from '$utils/contextual';
import { videoScrub } from './utils/videoScrub';
import { vidOnSnap } from '$utils/vidOnSnap';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Expose globally for plain <script> tag usage
// (globalThis as any).initDecodeAnimations = initDecodeAnimations;
// (globalThis as any).initLineAnimations = initLineAnimations;
// (globalThis as any).initWordAnimations = initWordAnimations;
// (globalThis as any).initCharAnimations = initCharAnimations;
// (globalThis as any).initMaskAnimation = initMaskAnimation;
// (globalThis as any).initTracking = initTracking;
// (globalThis as any).rollReveal = rollReveal;
// (globalThis as any).rollRevealReverse = rollRevealReverse;
// (globalThis as any).fadeIn = fadeIn;
// (globalThis as any).flipReveal = flipReveal;
// (globalThis as any).pan = pan;
// (globalThis as any).slideInLeft = slideInLeft;
// (globalThis as any).slideInRight = slideInRight;
// (globalThis as any).zoom = zoom;
// (globalThis as any).fadeInScroll = fadeInScroll;
// (globalThis as any).Pin = Pin;
// (globalThis as any).progressBar = progressBar;
// (globalThis as any).rotateScroll = rotateScroll;
// (globalThis as any).growScroll = growScroll;
// (globalThis as any).staggerItemScroll = staggerItemScroll;
// (globalThis as any).slideInLeftScroll = slideInLeftScroll;
// (globalThis as any).slideInRightScroll = slideInRightScroll;
// (globalThis as any).toggleScroll = toggleScroll;
// (globalThis as any).colorChange = colorChange;
// (globalThis as any).horizontalScroll = horizontalScroll;
// (globalThis as any).threePanelfade = threePanelfade;
// (globalThis as any).svgScroll = svgScroll;
// (globalThis as any).Contextual = Contextual;
// (globalThis as any).videoScrub = videoScrub;
// (globalThis as any).vidOnSnap = vidOnSnap;


// step based

// three panel fade in from differant directions
threePanelFade('panel-wrapper')
// svg follow the scroll
svgScroll('svg_contain')

// horizontal scroll
horizontalScroll('container_horizontal')

// Contextual/popups
Contextual('Contextual')
// scrub video
videoScrub()
// play vid on snap
vidOnSnap()


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
