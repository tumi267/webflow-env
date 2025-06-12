
import { initDecodeAnimations } from '$utils/decode';
import { initLineAnimations } from '$utils/lineaniamtion';
import { initWordAnimations } from '$utils/word';
import { initCharAnimations } from '$utils/char';
import { initLineMaskReveal} from '$utils/textmask';
import { initTracking } from '$utils/texttracker';


// // text aniamtion
// // char animation
initCharAnimations('header')
// //word aniamtion
initWordAnimations('sub_header')
// // lineaniamtion
initLineAnimations('line_amination')
// decode text
initDecodeAnimations()
// // text mask
initLineMaskReveal()
// // mouse tracking 
initTracking()