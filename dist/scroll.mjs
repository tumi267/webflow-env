import "./chunks/chunk-SUYWSG3L.mjs";

// src/utils/fadeInscroll.ts
async function fadeInScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function Pin(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.to(`#${id}`, {
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
async function progressBar(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  if (!children.length)
    return;
  gsap.to(children, {
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top 35%",
      end: "top 1%",
      scrub: 3
    },
    width: "100%"
  });
}

// src/utils/rotate-srcoll.ts
async function rotateScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  if (!children.length)
    return;
  gsap.from(children, {
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
async function growScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function staggerItemScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const items = parent.querySelectorAll("*");
  if (!items.length)
    return;
  gsap.from(items, {
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
async function slideInLeftScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function slideInRightScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function toggleScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
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
async function colorChange(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild;
  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }
  gsap.to(child, {
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
//# sourceMappingURL=scroll.mjs.map
