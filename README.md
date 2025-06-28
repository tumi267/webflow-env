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
    - [Gallery]

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
| Gallery              | `gallery`          | Complex gallery reveal        |     

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


