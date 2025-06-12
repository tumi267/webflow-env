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
rollReveal('roll_reveal',-5)
// roll reveal reverse
rollRevealReverse('roll_reveal_revese',0)
// fade in
fadeIn('fade_in',-5)
// flip reveal
flipReveal('flip_reveal',-5)
// pan
pan('pan')
// slide in left
slideInLeft('slide_in_left',-5)
// slide in right
slideInRight('slide_in_right',-5)
// zoom
zoom('zoom',20)