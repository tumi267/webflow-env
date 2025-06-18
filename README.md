# Scroll Animation Toolkit

![GSAP Powered](https://img.shields.io/badge/GSAP-Powered-green.svg)
![Webflow Ready](https://img.shields.io/badge/Webflow-Ready-blue.svg)

A comprehensive library for creating professional scroll-triggered animations using GSAP. Works in vanilla JS, frameworks, and Webflow.

## 🌟 Features
- **30+ Animation Types**: Text, media, 3D transforms
- **Cross-Platform**: Webflow, React, Vanilla JS
- **Optimized Performance**: 60fps animations
- **Debug Tools**: Visual scroll trigger markers
- **Mobile-Friendly**: Touch event support

## 🚀 Installation

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
