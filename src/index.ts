import { horizontalScroll } from '$utils/horizontalScroll';
import { threePanelFade } from '$utils/threepanelfadein';
import { svgScroll } from '$utils/svgScroll';
import { Contextual } from '$utils/contextual';
import { videoScrub } from './utils/videoScrub';
import { vidOnSnap } from '$utils/vidOnSnap';
import { initCharAnimations } from '$utils/char';
import { initWordAnimations } from '$utils/word';
import { initLineAnimations } from '$utils/lineaniamtion';
import { initDecodeAnimations } from '$utils/decode';
import { initLineMaskReveal } from '$utils/textmask';
import { initTracking } from '$utils/texttracker';
import { toggleScroll } from '$utils/toggle-scroll';
import { colorChange } from '$utils/color-change-scroll';
import { staggerItemScroll } from '$utils/stagger-item-scroll';
import { rotateScroll } from '$utils/rotate-srcoll';
import { progressBar } from '$utils/progress-bar-scroll';
import { Pin } from '$utils/pin-element-scroll';
import { zoom } from '$utils/zoom';
import { slideInRight } from '$utils/slideInRight';
import { slideInLeft } from '$utils/slideInLeft';
import { pan } from '$utils/pan';
import { flipReveal } from '$utils/flipReveal';
import { fadeIn } from '$utils/fadeIn';
import { rollRevealReverse } from '$utils/rollRevealReverse';
import { rollReveal } from '$utils/rollReveal';
import { gallery } from '$utils/gallery';
import { gallery2 } from '$utils/gallery2';
import { slideshow } from '$utils/slideShow';
import { parellex } from '$utils/parallex';
import { SmoothScroll } from '$utils/smoothScroll';



// Expose globally for plain <script> tag usage
(globalThis as any).gallery = gallery;
(globalThis as any).gallery2 = gallery2;
(globalThis as any).slideshow =slideshow;
(globalThis as any).initDecodeAnimations = initDecodeAnimations;
(globalThis as any).initLineAnimations = initLineAnimations;
(globalThis as any).initWordAnimations = initWordAnimations;
(globalThis as any).initCharAnimations = initCharAnimations;
(globalThis as any).initMaskAnimation = initLineMaskReveal;
(globalThis as any).initTracking = initTracking;
(globalThis as any).rollReveal = rollReveal;
(globalThis as any).rollRevealReverse = rollRevealReverse;
(globalThis as any).fadeIn = fadeIn;
(globalThis as any).flipReveal = flipReveal;
(globalThis as any).pan = pan;
(globalThis as any).slideInLeft = slideInLeft;
(globalThis as any).slideInRight = slideInRight;
(globalThis as any).zoom = zoom;

(globalThis as any).Pin = Pin;
(globalThis as any).progressBar = progressBar;
(globalThis as any).rotateScroll = rotateScroll;
(globalThis as any).growScroll = zoom;
(globalThis as any).staggerItemScroll = staggerItemScroll;

(globalThis as any).toggleScroll = toggleScroll;
(globalThis as any).colorChange = colorChange;
(globalThis as any).horizontalScroll = horizontalScroll;
(globalThis as any).threePanelfade = threePanelFade;
(globalThis as any).svgScroll = svgScroll;
(globalThis as any).Contextual = Contextual;
(globalThis as any).videoScrub = videoScrub;
(globalThis as any).vidOnSnap = vidOnSnap;


(globalThis as any).parellex=parellex;
(globalThis as any).SmoothScroll=SmoothScroll;
