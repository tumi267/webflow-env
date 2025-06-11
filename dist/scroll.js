import {
  ScrollTrigger,
  gsapWithCSS
} from "./chunk-BVJFHCJQ.js";
import "./chunk-JCVR2ZN6.js";

// src/utils/fadeInscroll.ts
function fadeInScroll(id) {
  gsapWithCSS.from(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top 80%",
      end: "top top",
      scrub: true
    },
    opacity: 0,
    duration: 1
  });
}

// src/utils/pin-element-scroll.ts
function Pin(id) {
  gsapWithCSS.to(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      pin: true,
      start: "top top",
      end: "+=500",
      scrub: true
    }
  });
}

// src/utils/progress-bar-scroll.ts
function progressBar(id) {
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  if (!children.length)
    return;
  gsapWithCSS.to(children, {
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top 90%",
      end: "top 1%",
      scrub: 3
    },
    width: "100%"
  });
}

// src/utils/rotate-srcoll.ts
function rotateScroll(id) {
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  if (!children.length)
    return;
  gsapWithCSS.from(children, {
    scrollTrigger: {
      trigger: parent,
      start: "top 80%",
      end: "top top",
      scrub: true
    },
    rotation: 180,
    opacity: 0,
    duration: 1
    // stagger: 0.2, // optional: stagger effect
  });
}

// src/utils/scale-up-scroll.ts
function growScroll(id) {
  gsapWithCSS.from(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top 80%",
      end: "top top",
      scrub: true
    },
    scale: 0,
    duration: 1,
    ease: "back.out(1.7)"
  });
}

// src/utils/stagger-item-scroll.ts
function staggerItemScroll(id) {
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const items = parent.querySelectorAll("*");
  if (!items.length)
    return;
  gsapWithCSS.from(items, {
    scrollTrigger: {
      trigger: parent,
      start: "top 80%",
      end: "top center",
      scrub: true
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });
}

// src/utils/slide-in-left-scroll.ts
function slideInLeftScroll(id) {
  gsapWithCSS.from(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top 80%",
      end: "top top",
      scrub: true
    },
    x: -100,
    opacity: 0,
    duration: 0.8
  });
}

// src/utils/slide-in-right-scroll.ts
function slideInRightScroll(id) {
  gsapWithCSS.from(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top 80%",
      end: "top top",
      scrub: true
    },
    x: 100,
    opacity: 0,
    duration: 0.8
  });
}

// src/utils/toggle-scroll.ts
function toggleScroll(id) {
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      console.log("do something");
    },
    onLeaveBack: () => {
      console.log("do something else");
    }
  });
}

// src/utils/color-change-scroll.ts
function colorChange(id) {
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild;
  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }
  gsapWithCSS.to(child, {
    scrollTrigger: {
      trigger: parent,
      start: "top center",
      end: "bottom center",
      scrub: true
    },
    backgroundColor: "#4a00e0",
    color: "#ffffff"
  });
}

// src/scroll.ts
fadeInScroll("fade-element");
Pin("pin");
progressBar("progress-bar-scroll");
rotateScroll("rotate-scroll");
growScroll("scale-up-scroll");
staggerItemScroll("stagger-item-scroll");
slideInLeftScroll("slide-in-left-scroll");
slideInRightScroll("slide-in-right-scroll");
colorChange("color-change-scroll");
toggleScroll("toggle-element-scroll");
//# sourceMappingURL=scroll.js.map
