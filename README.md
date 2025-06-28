# GSAP Scroll Animations Documentation

This repository contains a collection of scroll-triggered animations built with [GSAP](https://greensock.com/gsap/) and [ScrollTrigger](https://greensock.com/scrolltrigger/). Each animation is controlled by data attributes on the HTML elements, allowing easy customization without touching the JavaScript.

---

## Table of Contents

1. [General Usage](#general-usage)  
2. [Animations Overview](#animations-overview)  
3. [Animation Details & Examples](#animation-details--examples)  
    - [Character Animation](#character-animation-data-animationchar)  
    - [Word Animation](#word-animation-data-animationword)  
    - [Decode Animation](#decode-animation-data-animationdecode)  
    - [Line Animation](#line-animation-data-animationline)  
    - [Mouse Over Tracker](#mouse-over-tracker-data-animationtracker)  
    - [Mask Animation](#mask-animation-data-animationmask)  
    - [Roll Reveal](#roll-reveal-data-animationroll)  
    - [Roll Reveal Reverse](#roll-reveal-reverse-data-animationrollreverse)  
    - [Flip Element](#flip-element-data-animationflip)  
    - [Slide In Left](#slide-in-left-data-animationslideleft)  
    - [Slide In Right](#slide-in-right-data-animationslideright)  
    - [Fade](#fade-data-animationfade)  
    - [Zoom](#zoom-data-animationzoom)  
    - [Pan](#pan-data-animationpan)  
    - [Rotate](#rotate-data-animationrotate)  
    - [Stagger](#stagger-data-animationstagger)  
    - [Pin](#pin-data-animationpin)  
    - [Color Change](#color-change-data-animationcolor)  
    - [Progress Bar](#progress-bar-data-animationprogress)  
    - [Popup](#popup-data-animationpopup)  
    - [Three Panel Animation](#three-panel-animation-data-animationthreepanel)  
    - [SVG Animation](#svg-animation-data-animationsvg)  
    - [Horizontal Scroll](#horizontal-scroll-data-animationhorizontal)  
    - [Parallax Scroll](#parallax-scroll-data-animationperallex)  
    - [Slide Show](#slide-show-data-animationslideshow)  
    - [Gallery 2](#gallery-2-data-animationgallery2)  

---

## General Usage

- Add a container element (e.g., `<div>`) with a `data-animation` attribute specifying the animation type.
- Customize behavior via `data-` attributes (e.g., `data-start`, `data-end`, `data-duration`).
- Initialize animations in your JS by importing and calling the corresponding init functions.
- Use `data-mark="true"` during development to show ScrollTrigger debug markers.
- Positions (`data-position`, `data-positionEnd`) support CSS units or keywords like `%`, `px`, `top`, `center`, `bottom`.

---

## Animations Overview

| Animation Name | data-animation Value | Description                     |
|----------------|---------------------|---------------------------------|
| Character Animation  | `char`             | Animate individual characters   |
| Word Animation       | `word`             | Animate individual words        |
| Decode Animation     | `decode`           | Matrix-style decode text effect |
| Line Animation       | `line`             | Animate lines of text           |
| Mouse Over Tracker   | `tracker`          | Mouse tracking tilt effect      |
| Mask Animation       | `mask`             | Text mask reveal                |
| Roll Reveal          | `roll`             | Roll reveal effect              |
| Roll Reveal Reverse  | `rollReverse`      | Roll reveal reverse effect      |
| Flip Element         | `flip`             | Repeated flip with wobble       |
| Slide In Left        | `slideLeft`        | Slide in from left              |
| Slide In Right       | `slideRight`       | Slide in from right             |
| Fade                 | `fade`             | Fade in                        |
| Zoom                 | `zoom`             | Zoom in/out                    |
| Pan                  | `pan`              | Pan element                    |
| Rotate               | `rotate`           | Rotate elements                |
| Stagger              | `stagger`          | Stagger child element animations|
| Pin                  | `pin`              | Pin element on scroll          |
| Color Change         | `color`            | Change background/text color   |
| Progress Bar         | `progress`         | Progress bar movement          |
| Popup                | `popup`            | Popup reveal                  |
| Three Panel Animation| `threePanel`       | Animates three children panels |
| SVG Animation        | `svg`              | SVG path and element animation |
| Horizontal Scroll    | `horizontal`       | Horizontal scroll animation    |
| Parallax Scroll      | `perallex`         | Parallax scroll effect         |
| Slide Show           | `slideShow`        | Manual slideshow               |
| Gallery 2            | `gallery2`         | Complex gallery reveal         |

---

## Animation Details & Examples

### Character Animation (`data-animation="char"`)

Animate each character independently.

**Attributes:**

- `data-start`: ScrollTrigger start (e.g. `'50'` or `'50%'`)
- `data-end`: ScrollTrigger end
- `data-position`: Start trigger position (`top`, `center`, etc)
- `data-positionEnd`: End trigger position
- `data-mark`: Show ScrollTrigger markers (`true` or `false`)
- `data-x`, `data-y`: Initial offsets in px
- `data-duration`: Animation duration per character (seconds)
- `data-stagger`: Delay between characters (seconds)

**Example:**

```html
<div id="header"
  data-animation="char"
  data-start="50"
  data-end="30"
  data-position="top"
  data-positionEnd="top"
  data-mark="false"
  data-x="0"
  data-y="0"
  data-duration="1"
  data-stagger="0.1"
>
  Animate this header text by character
</div>
Word Animation (data-animation="word")
Animate words individually with staggered fade and position.

Attributes:

Same as char animation plus:

data-staggerseq: Stagger sequence (start, end, center, edges)

Example:

html
Copy
Edit
<div id="sub_header"
  data-animation="word"
  data-start="40"
  data-end="20"
  data-position="top"
  data-positionEnd="top"
  data-mark="false"
  data-x="-100"
  data-y="-100"
  data-duration="0.7"
  data-stagger="0.15"
  data-staggerseq="start"
>
  Animate words individually
</div>
Decode Animation (data-animation="decode")
Matrix-style text scramble effect.

Attributes:

data-mark, data-start, data-end, data-position, data-positionEnd

Example:

html
Copy
Edit
<div id="decode"
  data-animation="decode"
  data-mark="false"
  data-start="50"
  data-end="10"
  data-position="top"
  data-positionEnd="top"
>
  Decoding effect text
</div>
Line Animation (data-animation="line")
Animate text line by line with stagger and offsets.

Attributes:

data-start, data-end, data-position, data-positionEnd, data-mark

data-x, data-y: Offsets

data-duration, data-stagger, data-staggerseq

Example:

html
Copy
Edit
<div id="line_animation"
  data-animation="line"
  data-start="80"
  data-end="60"
  data-position="center"
  data-positionEnd="center"
  data-mark="false"
  data-x="-500"
  data-y="0"
  data-duration="0.7"
  data-stagger="0.15"
  data-staggerseq="start"
>
  Line animation text here
</div>
Mouse Over Tracker (data-animation="tracker")
3D tilt effect tracking mouse movement.

Attributes:

data-id (optional identifier)

Example:

html
Copy
Edit
<div id="tracking_text"
  data-animation="tracker"
  data-id="4"
>
  Tilt effect on mouse movement
</div>
Mask Animation (data-animation="mask")
Reveal lines of text with mask effect on scroll.

Attributes:

data-start, data-end, data-position, data-positionEnd, data-mark, data-stagger

Example:

html
Copy
Edit
<div id="line_animation_mask"
  data-animation="mask"
  data-start="60"
  data-end="40"
  data-position="center"
  data-positionEnd="center"
  data-mark="false"
  data-stagger="0.15"
>
  Mask reveal text
</div>
Roll Reveal (data-animation="roll")
Roll element into view.

Attributes:

data-start, data-end, data-position, data-positionEnd, data-mark, data-duration

Example:

html
Copy
Edit
<div id="roll_reveal"
  data-animation="roll"
  data-start="40%"
  data-end="20%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="2"
>
  Roll reveal content
</div>
Roll Reveal Reverse (data-animation="rollReverse")
Reverse direction of roll reveal.

Example:

html
Copy
Edit
<div id="roll_reveal_reverse"
  data-animation="rollReverse"
  data-start="40%"
  data-end="20%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="2"
>
  Roll reverse content
</div>
Flip Element (data-animation="flip")
Flip element repeatedly with wobble.

Attributes:

data-start, data-end, data-position, data-positionEnd

data-mark, data-duration, data-wobble, data-num

Example:

html
Copy
Edit
<div id="flip_reveal"
  data-animation="flip"
  data-start="40%"
  data-end="20%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="2"
  data-wobble="6"
  data-num="6"
>
  Flip me repeatedly
</div>
Slide In Left (data-animation="slideLeft")
Slide element from left.

Attributes:

data-start, data-end, data-position, data-positionEnd, data-mark

data-duration, data-x, data-y

Example:

html
Copy
Edit
<div id="slide_in_left"
  data-animation="slideLeft"
  data-start="40%"
  data-end="20%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="2"
  data-x="100"
  data-y="0"
>
  Slide in from left content
</div>
Slide In Right (data-animation="slideRight")
Slide element from right.

Example:

html
Copy
Edit
<div id="slide_in_right"
  data-animation="slideRight"
  data-start="40%"
  data-end="20%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="2"
  data-x="1000"
  data-y="0"
>
  Slide in from right content
</div>
Fade (data-animation="fade")
Fade element in.

Example:

html
Copy
Edit
<div id="fade_in"
  data-animation="fade"
  data-start="40%"
  data-end="10%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="2"
>
  Fade in content
</div>
Zoom (data-animation="zoom")
Zoom element in/out.

Attributes:

data-amount controls scale factor.

Example:

html
Copy
Edit
<div id="zoom"
  data-animation="zoom"
  data-start="50%"
  data-end="20%"
  data-position="300px"
  data-positionEnd="300px"
  data-mark="false"
  data-duration="2"
  data-amount="1.5"
>
  Zoom me
</div>
Pan (data-animation="pan")
Pan element on scroll.

No specific attributes needed in example.

Rotate (data-animation="rotate")
Rotate element by degrees.

Attributes:

data-amount degrees of rotation.

Example:

html
Copy
Edit
<div id="rotate-scroll"
  data-animation="rotate"
  data-start="40%"
  data-end="20%"
  data-position="300px"
  data-positionEnd="300px"
  data-mark="false"
  data-duration="2"
  data-amount="360"
>
  Rotate me
</div>
Stagger (data-animation="stagger")
Stagger movement of child elements.

Attributes:

data-x, data-y for offset.

Example:

html
Copy
Edit
<div id="stagger-item-scroll"
  data-animation="stagger"
  data-start="60%"
  data-end="30%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="1"
  data-x="50"
  data-y="50"
>
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</div>
Pin (data-animation="pin")
Pin element during scroll between start and end.

Example:

html
Copy
Edit
<div id="pin"
  data-animation="pin"
  data-start="50"
  data-end="0"
  data-position="350px"
  data-positionEnd="350px"
  data-mark="false"
>
  Pinned content
</div>
Color Change (data-animation="color")
Change background and text color on scroll.

Attributes:

data-colorto: target background color

data-textcolorto: target text color

Example:

html
Copy
Edit
<div id="color-change-scroll"
  data-animation="color"
  data-start="60%"
  data-end="30%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="1"
  data-colorto="#4a00e0"
  data-textcolorto="#FFFF00"
>
  Color change content
</div>
Progress Bar (data-animation="progress")
Horizontal progress bar animation on scroll.

Attributes:

data-x, data-y: offsets

Example:

html
Copy
Edit
<div id="progress-bar-scroll"
  data-animation="progress"
  data-start="100%"
  data-end="10%"
  data-position="500px"
  data-positionEnd="500px"
  data-mark="false"
  data-duration="1"
  data-x="100"
  data-y="0"
>
  Progress bar content
</div>
Popup (data-animation="popup")
Popup reveal effect.

Three Panel Animation (data-animation="threePanel")
Animate up to 3 child panels with offsets.

Attributes:

data-x1, data-y1: offsets for first child

data-x2, data-y2: second child

data-x3, data-y3: third child

Example:

html
Copy
Edit
<div id="panel-wrapper"
  data-animation="threePanel"
  data-start="50%"
  data-end="100"
  data-position="375px"
  data-positionEnd="top"
  data-duration="0.5"
  data-mark="false"
  data-x1="-200"
  data-y1="200"
  data-x2="100"
  data-y2="200"
  data-x3="300"
  data-y3="-100"
>
  <div>Panel 1</div>
  <div>Panel 2</div>
  <div>Panel 3</div>
</div>
SVG Animation (data-animation="svg")
Animate SVG lines and pulsing elements.

Attributes:

data-mainline: selector for main SVG line

data-mainChar: selector for main character

data-pluse: pulsing elements selector

data-pluseTiming: pulse interval

Horizontal Scroll (data-animation="horizontal")
Horizontal scroll animation.

Parallax Scroll (data-animation="perallex")
Parallax multiple child elements with custom offsets and durations.

Slide Show (data-animation="slideShow")
Manual slideshow controlled by external buttons.

Gallery 2 (data-animation="gallery2")
Complex gallery reveal with overlapping scroll triggers.

Initialization Example (JavaScript)
js
Copy
Edit
import {
  initCharAnimations,
  initWordAnimations,
  initDecodeAnimations,
  initLineAnimations,
  initTracking,
  initMaskReveal,
  initRollReveal,
  initRollReverse,
  initFlipAnimation,
  initSlideLeft,
  initSlideRight,
  initFade,
  initZoom,
  initPan,
  initRotate,
  initStagger,
  initPin,
  initColorChange,
  initProgressBar,
  initPopup,
  initThreePanel,
  initSVGAnimation,
  initHorizontalScroll,
  initParallax,
  initSlideShow,
  initGallery2,
} from './animations';

async function initAllAnimations() {
  await Promise.all([
    initCharAnimations(),
    initWordAnimations(),
    initDecodeAnimations(),
    initLineAnimations(),
    initTracking(),
    initMaskReveal(),
    initRollReveal(),
    initRollReverse(),
    initFlipAnimation(),
    initSlideLeft(),
    initSlideRight(),
    initFade(),
    initZoom(),
    initPan(),
    initRotate(),
    initStagger(),
    initPin(),
    initColorChange(),
    initProgressBar(),
    initPopup(),
    initThreePanel(),
    initSVGAnimation(),
    initHorizontalScroll(),
    initParallax(),
    initSlideShow(),
    initGallery2(),
  ]);
}

document.addEventListener('DOMContentLoaded', initAllAnimations);
Notes
For development, set data-mark="true" on any element to show ScrollTrigger debug markers.

Positions accept CSS units (px, %) or keywords like top, center, bottom.

Customize animation timing and offsets via data attributes for flexible control.

Make sure GSAP and ScrollTrigger are loaded before initializing animations.



### CDN (Webflow/Vanilla JS)
```html
<!-- will change when push to npm -->
<script defer type="module" src="https://tumi267.github.io/webflow-env/dist/index.mjs"></script>

NPM (Frameworks)
bash
npm install scroll-anim-toolkit
🎨 Animation Catalog
1. Text Animations
javascript
// Character-by-character reveal
initCharAnimations('header', 50, 30, 'top', 'top', false);

// Word-by-word animation
initWordAnimations('sub_header', 40, 20, 'top', 'top', false);

// Line-by-line mask reveal
initLineAnimations('text-block', 30, -10, 'top', 'top', false);

// Binary decode effect
initDecodeAnimations('code-element', 30, 10, 'top', 'top', false);

// Text tracking (mouse follow)
initTracking('interactive-text');
2. Media Animations
javascript
// Image gallery with parallax
gallery('gallery-container', 10, 90, 'top', 'bottom', 20, 80, false);

// Video scrubbing
vidOnSnap(0, false); // Auto-detects .vid2 elements

// Controlled slideshow
const mySlideshow = await slideshow("slideshow-container");
document.getElementById("next").addEventListener("click", () => mySlideshow.next());
3. Scroll Transitions
javascript
// Classic fade-in
fadeIn('section', 80, 20, 'top', 'center', false);

// 3D card flip
flipReveal('product-card', 50, 20, 3, 'center', 'top', false);

// Horizontal scrolling
horizontalScroll('fullpage-section', 10, 'top', false);

// Zoom effect
zoom('hero-image', 30, 0, 2, 'center', 'center', false);
4. Advanced Effects
javascript
// SVG path drawing
svgScroll('svg-container', 50, 'top', '.main-path', '.cursor', '.pulse', 0.1, false);

// Three-panel storytelling
threePanelFade('story-section', 0, 2, 'bottom', false);

// Dynamic color changes
colorChange('theme-switcher', 30, 0, 'bottom', 'bottom', "#4a00e0", "#FFFF00", false);
📚 Complete API Reference
Core Parameters
Parameter	Type	Description	Default
id	string	Target element ID	Required
start	number	Trigger start position (viewport %)	Required
end	number	Trigger end position (viewport %)	start + 100
position	string	Element anchor (top/center/bottom)	'top'
markers	boolean	Show debug guides	false
Special Components
Slideshow Controller

javascript
const slides = await slideshow("container");
slides.next(); // Methods: next(), prev(), goTo(index)
Progress Bar

javascript
progressBar('status-bar', 30, 0, 'bottom', 'bottom', false);
Staggered Items

javascript
staggerItemScroll('feature-list', 20, -20, 'bottom', 'bottom', false);
⚠️ Troubleshooting Guide
Common Issues
Horizontal Scroll Not Working

css
/* Required CSS for container */
#container_horizontal {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
}
Mobile Touch Problems

javascript
// Disable complex effects on mobile
if (window.innerWidth > 768) {
  pan('parallax-element');
  initTracking('interactive-text');
}
Video Scrubbing Issues

html
<!-- Required video attributes -->
<video class="vid2" playsinline webkit-playsinline muted loop>
  <source src="video.mp4" type="video/mp4">
</video>
Debugging Tips
Set markers: true to visualize trigger points

Check browser console for GSAP errors

Verify elements exist before initialization:

javascript
if (!document.getElementById('my-element')) {
  console.error('Element not found!');
}
🌐 Webflow Implementation
Add IDs to target elements in Webflow

Insert this in Page Settings > Custom Code:

html
<script>
  window.addEventListener('load', () => {
    fadeIn('hero-section', 80, 20, 'top', 'center', false);
    initCharAnimations('headline', 50, 30, 'top', 'top', false);
  });
</script>
📦 Build Customization
Tree-Shaking (For Developers)
Import only what you need:

javascript
import { fadeIn, initCharAnimations } from 'scroll-anim-toolkit';
Webflow Bundle
Pre-configured bundle available at:

text
<!-- change with npm link -->
https://tumi267.github.io/webflow-env/dist/webflow-bundle.js
🔧 Full Method List
Category	Methods
Text	initCharAnimations, initWordAnimations, initLineAnimations, initDecodeAnimations, initLineMaskReveal, initTracking
Media	gallery, gallery2, videoScrub, vidOnSnap, slideshow
Transitions	fadeIn, slideInLeft, slideInRight, rollReveal, flipReveal, zoom, threePanelFade
Navigation	horizontalScroll, progressBar, Pin
Utilities	colorChange, toggleScroll, pan, rotateScroll, staggerItemScroll

Complete Guide to Using Every Animation in the Scroll Animation Toolkit
This guide explains every animation type in detail, with copy-paste examples you can use immediately.

📜 Table of Contents
Text Animations

Character Reveal

Word-by-Word

Line-by-Line

Binary Decode

Text Tracking (Mouse Follow)

Media Animations

Image Galleries

Video Scrubbing

Slideshow Controls

Scroll Transitions

Fade In/Out

Slide In (Left/Right)

3D Flip

Horizontal Scroll

Zoom Effects

Advanced Effects

SVG Path Drawing

Three-Panel Storytelling

Dynamic Color Changes

Staggered Items

Troubleshooting

🔤 Text Animations
1. initCharAnimations() - Character-by-Character Reveal
Effect: Letters fade and slide in one by one.
Best for: Headlines, callouts.

javascript
initCharAnimations(
  'your-element-id', // Target element ID
  50, // Start scroll position (% of viewport)
  30, // End scroll position (% of viewport)
  'top', // Where animation starts ('top'/'center'/'bottom')
  'top', // Where animation ends
  false // Show debug markers? (true/false)
);
2. initWordAnimations() - Word-by-Word Animation
Effect: Words fly in with rotation.
Best for: Paragraphs, quotes.

javascript
initWordAnimations(
  'your-text-id',
  40, 20, 'top', 'top', false
);
3. initLineAnimations() - Line-by-Line Mask Reveal
Effect: Text lines animate in sequentially.
Best for: Long-form content.

javascript
initLineAnimations(
  'your-text-block',
  30, -10, 'top', 'top', false
);
4. initDecodeAnimations() - Binary Decode Effect
Effect: Text "decodes" from random characters.
Best for: Tech/cyberpunk themes.

javascript
initDecodeAnimations(
  'your-element',
  30, 10, 'top', 'top', false
);
5. initTracking() - Mouse-Follow Text Tilt
Effect: Text tilts based on mouse movement.
Best for: Interactive headers.

javascript
initTracking('your-text-id');
🖼 Media Animations
1. gallery() - Parallax Image Gallery
Effect: Images stack and scroll with depth.

javascript
gallery(
  'gallery-container',
  10, 90, 'top', 'bottom', // Scroll range
  20, 80, // Effect start/end (%)
  false // Debug markers
);
2. vidOnSnap() - Scroll-Controlled Video
Effect: Video scrubs with scroll position.

Required HTML:

html
<video class="vid2" playsinline muted loop>
  <source src="video.mp4">
</video>
JavaScript:

javascript
vidOnSnap(
  0, // Start position (%)
  false // Debug markers
);
3. slideshow() - Controlled Slideshow
Effect: Manual navigation between slides.

javascript
const mySlideshow = await slideshow("slideshow-container");

// Add buttons
document.getElementById("next").addEventListener("click", () => mySlideshow.next());
document.getElementById("prev").addEventListener("click", () => mySlideshow.prev());

// Jump to slide 2
mySlideshow.goTo(1);
🔄 Scroll Transitions
1. fadeIn() - Classic Fade
Effect: Smooth opacity transition.

javascript
fadeIn(
  'your-element',
  80, 20, 'top', 'center', false
);
2. slideInLeft() / slideInRight()
Effect: Slides element from left/right.

javascript
slideInLeft(
  'your-element',
  50, 0, 100, // Start, end, distance (px)
  'bottom', 'bottom', false
);
3. flipReveal() - 3D Card Flip
Effect: Element flips like a card.

javascript
flipReveal(
  'card-element',
  50, 20, 3, // Start, end, rotations
  'center', 'top', false
);
4. horizontalScroll() - Full-Page Horizontal Scroll
Effect: Scroll horizontally instead of vertically.

Required CSS:

css
#your-container {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
JavaScript:

javascript
horizontalScroll(
  'scroll-section',
  10, 'top', false
);
5. zoom() - Scale Effect
Effect: Element zooms in/out on scroll.

javascript
zoom(
  'your-image',
  30, 0, 2, // Start, end, scale amount
  'center', 'center', false
);
🎛 Advanced Effects
1. svgScroll() - SVG Path Drawing
Effect: SVG path animates as you scroll.

javascript
svgScroll(
  'svg-container',
  50, 'top', // Start position
  '.theLine', // SVG path selector
  '.ball01', // Moving element
  '.pulse', // Elements that pulse
  0.1, // Timing between pulses
  false // Debug
);
2. threePanelFade() - Storytelling Panels
Effect: Three panels animate sequentially.

javascript
threePanelFade(
  'story-section',
  0, 2, // Start, speed
  'bottom', false
);
3. colorChange() - Dynamic Color Shift
Effect: Background/text color transitions.

javascript
colorChange(
  'your-element',
  30, 0, 'bottom', 'bottom',
  "#4a00e0", // From color
  "#FFFF00", // To color
  false
);
⚠️ Troubleshooting
Common Issues & Fixes
Problem	Solution
Animations not working	Check console.log for missing IDs
Horizontal scroll broken	Add required CSS (see above)
Video not scrubbing	Ensure playsinline muted loop attributes
Mobile jankiness	Wrap in if (window.innerWidth > 768)
