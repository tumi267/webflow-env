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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);
// text aniamtion
// char animation
initCharAnimations('header')
//word aniamtion
initWordAnimations('sub_header')
// lineaniamtion
initLineAnimations('line_amination')
// decode text
initDecodeAnimations()
// text mask
initMaskAnimation()
// mouse tracking 
initTracking()