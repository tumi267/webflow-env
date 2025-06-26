import {
  initCharAnimations,
  initDecodeAnimations,
  initLineAnimations,
  initLineMaskReveal,
  initTracking,
  initWordAnimations
} from "./chunks/chunk-NHWM2XRD.mjs";
import {
  Pin,
  colorChange,
  progressBar,
  rotateScroll,
  staggerItemScroll,
  toggleScroll
} from "./chunks/chunk-NODKU6PD.mjs";
import {
  fadeIn,
  flipReveal,
  pan,
  rollReveal,
  rollRevealReverse,
  slideInLeft,
  slideInRight,
  zoom
} from "./chunks/chunk-OIT2O2EE.mjs";
import "./chunks/chunk-SUYWSG3L.mjs";

// src/utils/horizontalScroll.ts
async function horizontalScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const container = document.querySelector(`[data-id="${id}"]`);
  if (!container) {
    console.warn("horizontalScroll: container not found.");
    return;
  }
  const start = container.dataset.start ?? "0";
  const position = container.dataset.position ?? "top";
  const mark = container.dataset.mark === "true";
  const y = container.dataset.y ?? "100";
  const x = container.dataset.x ?? "100";
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
    xPercent: -x * (panelCount - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelCount - 1),
      start: `${position} ${start}`,
      end: () => `+=${container.scrollWidth - window.innerWidth}`,
      markers: mark
    }
  });
}

// src/utils/threepanelfadein.ts
async function threePanelFade(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) {
    console.warn(`Element with ID "${id}" not found`);
    return;
  }
  const start = el.dataset.start ?? "0";
  const end = el.dataset.end ?? "100";
  const position = el.dataset.position ?? "top";
  const mark = el.dataset.mark === "true";
  const y1 = el.dataset.y1 ?? "200";
  const x1 = el.dataset.x1 ?? "-200";
  const y2 = el.dataset.y2 ?? "200";
  const x2 = el.dataset.x2 ?? "-200";
  const y3 = el.dataset.y3 ?? "200";
  const x3 = el.dataset.x3 ?? "-200";
  const duration = parseFloat(el.dataset.duration ?? "2");
  const children = Array.from(el.children);
  if (children.length === 0)
    return;
  if (position.endsWith("px")) {
    gsap.set(el, {
      position: "relative",
      top: position
    });
  }
  const totalDuration = children.length * duration + 1;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `+=${totalDuration * 100}%`,
      // Percentage-based
      scrub: true,
      pin: true,
      markers: mark,
      pinSpacing: false,
      // Changed to true
      anticipatePin: 1,
      onRefresh: (self) => self.scroll()
      // Helps recalculate on resize
    }
  });
  const animations = [
    { y: y1, x: x1, opacity: 0 },
    { y: y2, x: x2, opacity: 0 },
    { y: y3, x: x3, opacity: 0 }
  ];
  children.forEach((child, index) => {
    const animationType = animations[index % animations.length];
    tl.from(child, {
      ...animationType,
      duration: 1,
      ease: "power2.out"
    }, index * duration);
  });
  return () => ScrollTrigger.getAll().forEach((st) => st.kill());
}

// src/utils/svgScroll.ts
async function svgScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { DrawSVGPlugin } = await import("./chunks/DrawSVGPlugin-ESCRFPMY.mjs");
  const { MotionPathPlugin } = await import("./chunks/MotionPathPlugin-6Z3F5HXQ.mjs");
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
  const parent = document.querySelector(`[data-id="${id}"]`);
  if (!parent) {
    console.warn(`Element with ID "${id}" not found`);
    return;
  }
  const start = parent.dataset.start ?? "0";
  const end = parent.dataset.end ?? "300";
  const position = parent.dataset.position ?? "top";
  const mark = parent.dataset.mark === "true";
  const mainline = parent.dataset.mainline ?? ".theLine";
  const mainChar = parent.dataset.mainChar ?? ".ball01";
  const duration = parseFloat(parent.dataset.duration ?? "4");
  const pluse = parent.dataset.pluse ?? "ball";
  const pluseTiming = parent.dataset.pluseTiming ?? "0.1";
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
      trigger: parent,
      scrub: true,
      start: `${position} ${start}`,
      end: `+=${end}%`,
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
      duration
    },
    0
  ).add(pulses, 0);
}

// src/utils/contextual.ts
async function Contextual(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) {
    console.warn(`Element with ID "${id}" not found`);
    return;
  }
  const start = el.dataset.start ?? "0";
  const end = el.dataset.end ?? "100";
  const position = el.dataset.position ?? "top";
  const positionEnd = el.dataset.positionend ?? "bottom";
  const mark = el.dataset.mark === "true";
  ScrollTrigger.create({
    trigger: el,
    start: `${position} ${start}%`,
    end: `${positionEnd} ${end}`,
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

// src/utils/gallery.ts
async function gallery(id, start, end, position = "top", positionEnd = "top", effectStart, effectEnd, mark) {
  try {
    const [gsap, ScrollTrigger, SplitText] = await Promise.all([
      import("./chunks/gsap-L2HCQACZ.mjs").then((m) => m.gsap),
      import("./chunks/ScrollTrigger-HIJSDX7Q.mjs").then((m) => m.ScrollTrigger),
      import("./chunks/SplitText-LUU4FCPQ.mjs").then((m) => m.SplitText)
    ]);
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const parent = document.getElementById(id);
    if (!parent) {
      console.warn(`Element with ID "${id}" not found`);
      return;
    }
    const layers = Array.from(parent.children);
    const total = layers.length;
    ScrollTrigger.create({
      trigger: parent,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      pin: true,
      markers: mark
    });
    const unit = 100 / total;
    layers.forEach((el, i) => {
      const isEven = i % 2 === 0;
      const fromX = isEven ? -50 : 50;
      const exitX = isEven ? -10 : 10;
      const progress = i / (total - 1 || 1);
      const yOffset = -40;
      const z = total - i;
      const viewportHeight = window.innerHeight;
      const elHeight = el.getBoundingClientRect().height;
      const verticalOffset = (viewportHeight - elHeight) / 2;
      gsap.set(el, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        y: verticalOffset,
        zIndex: z
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: `top+=${i * unit}% ${effectStart}%`,
          end: `top+=${(i + 1) * unit}% ${effectEnd}%`,
          scrub: true,
          markers: mark
        }
      });
      tl.fromTo(
        el,
        {
          opacity: 0,
          scale: 1,
          xPercent: fromX
        },
        {
          opacity: 1,
          scale: 1.2,
          xPercent: 0,
          ease: "none"
        }
      ).to(el, {
        opacity: 0,
        scale: 1.4,
        yPercent: yOffset,
        xPercent: exitX,
        ease: "none"
      });
    });
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

// src/utils/gallery2.ts
async function gallery2(id, start, end, position = "top", positionEnd = "top", effectStart, effectEnd, effposition = "top", effpositionEnd = "top", overlapRatio = 0.33, mark = false, markcontatin = false) {
  try {
    const [gsap, ScrollTrigger] = await Promise.all([
      import("./chunks/gsap-L2HCQACZ.mjs").then((m) => m.gsap),
      import("./chunks/ScrollTrigger-HIJSDX7Q.mjs").then((m) => m.ScrollTrigger)
    ]);
    gsap.registerPlugin(ScrollTrigger);
    const parent = document.getElementById(id);
    if (!parent) {
      console.warn(`Element with ID "${id}" not found`);
      return;
    }
    const layers = Array.from(parent.children);
    const total = layers.length;
    ScrollTrigger.create({
      trigger: parent,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      pin: true,
      markers: markcontatin
    });
    const unit = 100 / total;
    const overlapOffset = unit * overlapRatio;
    layers.forEach((el, i) => {
      const sideXPercent = i % 2 === 0 ? -30 : 30;
      const z = 100 - i;
      const vh = window.innerHeight;
      const h = el.getBoundingClientRect().height;
      const yOffset = (vh - h) / 2;
      gsap.set(el, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        y: yOffset,
        zIndex: z,
        xPercent: sideXPercent
        // Set fixed horizontal start position
      });
      const sectionStart = `${effposition}+=${i * overlapOffset}% ${effectStart}%`;
      const sectionEnd = `${effpositionEnd}+=${(i + 1) * overlapOffset}% ${effectEnd}%`;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: sectionStart,
          end: sectionEnd,
          scrub: true,
          markers: mark
        }
      });
      tl.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.1,
          yPercent: 0
          // xPercent is fixed by gsap.set above
        },
        {
          opacity: 1,
          scale: 0.5,
          ease: "power2.out",
          duration: 0.4
          // xPercent stays fixed here
        }
      );
      tl.to(
        el,
        {
          opacity: 0,
          scale: 1,
          yPercent: -30,
          ease: "power1.inOut",
          duration: 0.2
          // xPercent stays fixed here too
        },
        ">0"
      );
    });
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

// src/utils/slideShow.ts
async function slideshow(id) {
  try {
    let showSlide2 = function(newIndex, direction) {
      if (newIndex === currentIndex)
        return;
      const currentSlide = slides[currentIndex];
      const nextSlide = slides[newIndex];
      gsap.to(currentSlide, {
        duration: 0.5,
        xPercent: -100 * direction,
        autoAlpha: 0,
        ease: "power1.inOut"
      });
      gsap.fromTo(
        nextSlide,
        { xPercent: 100 * direction, autoAlpha: 0 },
        {
          duration: 0.5,
          xPercent: 0,
          autoAlpha: 1,
          ease: "power1.inOut"
        }
      );
      currentIndex = newIndex;
    };
    var showSlide = showSlide2;
    const [gsap] = await Promise.all([
      import("./chunks/gsap-L2HCQACZ.mjs").then((m) => m.gsap)
    ]);
    const container = document.querySelector(`[data-id="${id}"]`);
    if (!container) {
      console.warn(`Container with id "${id}" not found`);
      return;
    }
    const slides = Array.from(container.children);
    if (slides.length === 0) {
      console.warn("No slides found inside container");
      return;
    }
    let currentIndex = 0;
    const total = slides.length;
    gsap.set(slides, { xPercent: 100, autoAlpha: 0 });
    gsap.set(slides[0], { xPercent: 0, autoAlpha: 1 });
    return {
      next() {
        showSlide2((currentIndex + 1) % total, 1);
      },
      prev() {
        showSlide2((currentIndex - 1 + total) % total, -1);
      },
      goTo(index) {
        if (index < 0 || index >= total) {
          console.warn("Slide index out of range");
          return;
        }
        const direction = index > currentIndex ? 1 : -1;
        showSlide2(index, direction);
      },
      getCurrentIndex() {
        return currentIndex;
      }
    };
  } catch (error) {
    console.error("GSAP slideshow init error:", error);
  }
}

// src/utils/parallex.ts
async function parellex(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const el = document.querySelector(`[data-id="${id}"]`);
  if (!el) {
    console.warn(`Element with ID "${id}" not found`);
    return;
  }
  const start = el.dataset.start ?? "0";
  const position = el.dataset.position ?? "top";
  const mark = el.dataset.mark === "true";
  const animi1x = el.dataset.animi1x ?? "100";
  const animi1y = el.dataset.animi1y ?? "0";
  const animi1dur = el.dataset.animi1dur ?? "3";
  const animi2x = el.dataset.animi2x ?? "-100";
  const animi2y = el.dataset.animi2y ?? "-200";
  const animi2dur = el.dataset.animi2dur ?? "2.5";
  const animi3x = el.dataset.animi3x ?? "50";
  const animi3y = el.dataset.animi3y ?? "-200";
  const animi3dur = el.dataset.animi3dur ?? "2";
  const children = Array.from(el.children);
  if (children.length < 3) {
    console.warn(`Container "${id}" must have at least 3 children`);
    return;
  }
  let tl = gsap.timeline();
  tl.to(children[0], { x: animi1x, y: animi1y, duration: animi1dur }, 0).to(children[1], { x: animi2x, y: animi2y, duration: animi2dur }, 0).to(children[2], { x: animi3x, y: animi3y, duration: animi3dur }, 0);
  ScrollTrigger.create({
    animation: tl,
    trigger: el,
    start: `${position} ${start}%`,
    end: `${el.scrollHeight * 1.5}px`,
    scrub: true,
    pin: true,
    pinSpacing: false,
    markers: mark
  });
}

// src/index.ts
globalThis.gallery = gallery;
globalThis.gallery2 = gallery2;
globalThis.slideshow = slideshow;
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
globalThis.parellex = parellex;
//# sourceMappingURL=index.mjs.map
