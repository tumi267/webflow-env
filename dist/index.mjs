import {
  initCharAnimations,
  initDecodeAnimations,
  initLineAnimations,
  initLineMaskReveal,
  initTracking,
  initWordAnimations
} from "./chunks/chunk-CMLHQXFA.mjs";
import {
  Pin,
  colorChange,
  progressBar,
  rotateScroll,
  staggerItemScroll,
  toggleScroll
} from "./chunks/chunk-TSJF53LC.mjs";
import {
  fadeIn,
  flipReveal,
  pan,
  rollReveal,
  rollRevealReverse,
  slideInLeft,
  slideInRight,
  zoom
} from "./chunks/chunk-T3WK3O3V.mjs";
import "./chunks/chunk-SUYWSG3L.mjs";

// src/utils/horizontalScroll.ts
async function horizontalScroll(id, start, position = "top", mark) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const container = document.querySelector(`#${id}`);
  if (!container) {
    console.warn("horizontalScroll: container not found.");
    return;
  }
  const panels = Array.from(container.querySelectorAll(".panel_horizontal"));
  const panelCount = panels.length;
  if (panelCount === 0) {
    console.warn("horizontalScroll: No .panel_horizontal elements found inside container.");
    return;
  }
  gsap.set(container, {
    width: `${100 * panelCount}vw`
  });
  gsap.to(panels, {
    xPercent: -100 * (panelCount - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelCount - 1),
      start: `${position} ${start}px`,
      end: () => `+=${container.scrollWidth - window.innerWidth}`,
      markers: mark
    }
  });
}

// src/utils/threepanelfadein.ts
async function threePanelFade(id, start, panelSpeed, position = "top", mark) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const wrapper = document.getElementById(id);
  if (!wrapper) {
    console.warn(`Wrapper element not found: ${id}`);
    return;
  }
  const children = Array.from(wrapper.children);
  if (children.length === 0) {
    console.warn("No child elements found in wrapper");
    return;
  }
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: `${position} ${start}%`,
      end: `+=${children.length * 100}%`,
      scrub: true,
      pin: true,
      markers: mark
    }
  });
  const animations = [
    { y: 200, opacity: 0 },
    // bottom
    { x: -200, opacity: 0 },
    // left
    { x: 200, opacity: 0 }
    // right
  ];
  children.forEach((child, index) => {
    const animationType = animations[index % animations.length];
    tl.from(child, {
      ...animationType,
      duration: 1,
      ease: "power2.out"
    }, index * panelSpeed);
  });
  return () => ScrollTrigger.getAll().forEach((st) => st.kill());
}

// src/utils/svgScroll.ts
async function svgScroll(id, start, position = "top", mainline, mainChar, pluse, pluseTiming, mark) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { DrawSVGPlugin } = await import("./chunks/DrawSVGPlugin-ESCRFPMY.mjs");
  const { MotionPathPlugin } = await import("./chunks/MotionPathPlugin-6Z3F5HXQ.mjs");
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
  const parent = document.getElementById(id);
  if (!parent) {
    console.warn(`SVGScroll: Element with ID "${id}" not found`);
    return;
  }
  const elements = Array.from(parent.querySelectorAll("*[class]"));
  const classList = /* @__PURE__ */ new Set();
  elements.forEach((element) => {
    element.classList.forEach((className) => {
      if (className.trim())
        classList.add(className.trim());
    });
  });
  const mainLine = parent.querySelector(mainline);
  const mainCharacter = parent.querySelector(mainChar);
  if (!mainLine) {
    console.warn(`SVGScroll: Main line element (${mainline}) not found`);
    return;
  }
  if (!mainCharacter) {
    console.warn(`SVGScroll: Main character element (${mainChar}) not found`);
    return;
  }
  gsap.set(mainCharacter, { x: -5, y: 0, autoAlpha: 1 });
  const pulses = gsap.timeline();
  const pulseElements = elements.filter((el) => {
    const isBall = el.classList.toString().includes(`${pluse}`) && !el.classList.contains(mainChar.replace(".", ""));
    const isText = el.classList.toString().includes("text");
    return isBall || isText;
  });
  pulseElements.sort((a, b) => {
    const getTrailingNumber = (element) => {
      const classString = Array.from(element.classList).join(" ");
      const match = classString.match(/(\d+)(?!.*\d)/);
      return match ? parseInt(match[1], 10) : Infinity;
    };
    const aNum = getTrailingNumber(a);
    const bNum = getTrailingNumber(b);
    if (aNum === bNum) {
      return Array.from(a.parentNode?.children || []).indexOf(a) - Array.from(b.parentNode?.children || []).indexOf(b);
    }
    return aNum - bNum;
  });
  pulseElements.forEach((element, index) => {
    const delay = 0.2 + index * pluseTiming;
    pulses.fromTo(
      element,
      { autoAlpha: 0, scale: 0 },
      {
        autoAlpha: 1,
        scale: 2,
        transformOrigin: "center",
        ease: "elastic(2.5, 1)",
        duration: 0.8
      },
      delay
    );
  });
  const main = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      scrub: true,
      start: `${position} ${start}`,
      end: "+=300%",
      markers: mark
    }
  });
  main.from(mainLine, { drawSVG: 0, duration: 4 }).to(
    mainCharacter,
    {
      motionPath: {
        path: mainLine,
        align: mainLine,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1
      },
      duration: 4
    },
    0
  ).add(pulses, 0);
}

// src/utils/contextual.ts
async function Contextual(id, start, mark) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: `top ${start}%`,
    end: "bottom top",
    markers: mark ? true : false,
    onEnter: (self) => {
      const element = self.trigger;
      element.style.display = "block";
    },
    onLeaveBack: (self) => {
      const element = self.trigger;
      element.style.display = "none";
    }
  });
}

// src/utils/videoScrub.ts
async function videoScrub() {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const vid = document.querySelector(".vid");
  if (!vid)
    return;
  vid.addEventListener("loadedmetadata", () => {
    let scrubbedTime = 0;
    ScrollTrigger.create({
      trigger: vid,
      start: "top top",
      end: `+=${vid.duration * 1500}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        scrubbedTime = vid.duration * self.progress;
      }
    });
    gsap.ticker.add(() => {
      if (!isNaN(scrubbedTime) && vid.readyState >= 2) {
        vid.currentTime += (scrubbedTime - vid.currentTime) * 1;
      }
    });
  });
}

// src/utils/vidOnSnap.ts
async function vidOnSnap(start, mark) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const vid = document.querySelector(".vid2");
  if (!vid)
    return;
  if (vid.readyState >= 2) {
    initScrub();
  } else {
    vid.addEventListener("loadedmetadata", initScrub, { once: true });
  }
  function initScrub() {
    const scrollDistance = vid.duration * 500;
    ScrollTrigger.create({
      trigger: vid,
      start: `top ${start}%`,
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: true,
      // Smooth scrubbing
      markers: mark,
      onUpdate: (self) => {
        if (vid.duration) {
          vid.currentTime = vid.duration * self.progress;
        }
      },
      onRefresh: () => vid.currentTime = 0
      // Reset on resize
    });
    ScrollTrigger.addEventListener("scrollEnd", () => {
      if (ScrollTrigger.isInViewport(vid)) {
        vid.play();
      } else {
        vid.pause();
      }
    });
  }
}

// src/index.ts
globalThis.initDecodeAnimations = initDecodeAnimations;
globalThis.initLineAnimations = initLineAnimations;
globalThis.initWordAnimations = initWordAnimations;
globalThis.initCharAnimations = initCharAnimations;
globalThis.initMaskAnimation = initLineMaskReveal;
globalThis.initTracking = initTracking;
globalThis.rollReveal = rollReveal;
globalThis.rollRevealReverse = rollRevealReverse;
globalThis.fadeIn = fadeIn;
globalThis.flipReveal = flipReveal;
globalThis.pan = pan;
globalThis.slideInLeft = slideInLeft;
globalThis.slideInRight = slideInRight;
globalThis.zoom = zoom;
globalThis.Pin = Pin;
globalThis.progressBar = progressBar;
globalThis.rotateScroll = rotateScroll;
globalThis.growScroll = zoom;
globalThis.staggerItemScroll = staggerItemScroll;
globalThis.toggleScroll = toggleScroll;
globalThis.colorChange = colorChange;
globalThis.horizontalScroll = horizontalScroll;
globalThis.threePanelfade = threePanelFade;
globalThis.svgScroll = svgScroll;
globalThis.Contextual = Contextual;
globalThis.videoScrub = videoScrub;
globalThis.vidOnSnap = vidOnSnap;
//# sourceMappingURL=index.mjs.map
