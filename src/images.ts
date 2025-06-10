// import { greetUser } from '$utils/greet';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { rollReveal } from '$utils/rollReveal';
import { rollRevealReverse } from '$utils/rollRevealReverse';
import { fadeIn } from '$utils/fadeIn';
import { flipReveal } from '$utils/flipReveal';
import { pan } from '$utils/pan';
import { slideInLeft } from '$utils/slideInLeft';
import { slideInRight } from '$utils/slideInRight';
import { zoom } from '$utils/zoom';

// image aniamtion
// roll reveal
rollReveal('roll_reveal')
// roll reveal reverse
rollRevealReverse('roll_reveal_revese')
// fade in
fadeIn('fade_in')
// flip reveal
flipReveal('flip_reveal')
// pan
pan('pan')
// slide in left
slideInLeft('slide_in_left')
// slide in right
slideInRight('slide_in_right')
// zoom
zoom('zoom')