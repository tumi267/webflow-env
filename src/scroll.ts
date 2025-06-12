
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

// scroll aniamtion
// fadein scroll
// fadeInScroll('fade-element')
// pin element scroll
Pin('pin',5,-300)
// progress bar
progressBar('progress-bar-scroll',20)
// rotate scroll
rotateScroll('rotate-scroll',20)
// scale up on scroll
// growScroll('scale-up-scroll')
// stager in
staggerItemScroll('stagger-item-scroll',10)
// slide in on scroll
// slideInLeftScroll('slide-in-left-scroll')
// slideInRightScroll('slide-in-right-scroll')
// change color on scroll
colorChange('color-change-scroll',10)
// function call on scroll
toggleScroll('toggle-element-scroll')
