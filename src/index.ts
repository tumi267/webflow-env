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
import { rollReveal } from '$utils/rollReveal';
import { rollRevealReverse } from '$utils/rollRevealReverse';
import { fadeIn } from '$utils/fadeIn';
import { flipReveal } from '$utils/flipReveal';
import { pan } from '$utils/pan';
import { slideInLeft } from '$utils/slideInLeft';
import { slideInRight } from '$utils/slideInRight';
import { zoom } from '$utils/zoom';
import { fadeInScroll } from '$utils/fadeInscroll';
import { Pin } from '$utils/pin-element-scroll';
import { progressBar } from '$utils/progress-bar-scroll';
import { rotateScroll } from '$utils/rotate-srcoll';
import { growScroll } from '$utils/scale-up-scroll';
import { staggerItemScroll } from '$utils/stagger-item-scroll';
import { slideInLeftScroll } from '$utils/slide-in-left-scroll';
import { slideInRightScroll } from '$utils/slide-in-right-scroll';
import { toggleScroll } from '$utils/toggle-scroll';
import { colorChange } from '$utils/color-change-scroll';
import { horizontalScroll } from '$utils/horizontalScroll';
import { threePanelfade } from '$utils/threepanelfadein';
import { svgScroll } from '$utils/svgScroll';
import { Contextual } from '$utils/contextual';
import { videoScrub } from './utils/videoScrub';
import { vidOnSnap } from '$utils/vidOnSnap';

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

// text aniamtion
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

// image aniamtion
// roll reveal
rollReveal()
// roll reveal reverse
rollRevealReverse()
// fade in
fadeIn()
// flip reveal
flipReveal()
// pan
pan()
// slide in left
slideInLeft()
// slide in right
slideInRight()
// zoom
zoom()

// scroll aniamtion
// fadein scroll
fadeInScroll()
// pin element scroll
Pin()
// progress bar
progressBar()
// rotate scroll
rotateScroll()
// scale up on scroll
growScroll()
// stager in
staggerItemScroll()
// slide in on scroll
slideInLeftScroll()
slideInRightScroll()
// change color on scroll
colorChange()
// function call on scroll
toggleScroll()

// step based

// three panel fade in from differant directions
threePanelfade()
// svg follow the scroll
svgScroll()

// horizontal scroll
horizontalScroll()

// Contextual/popups
Contextual()
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
