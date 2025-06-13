// src/utils/toggle-scroll.ts
async function toggleScroll(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
async function colorChange(id, start) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild;
  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }
  gsap.to(child, {
    scrollTrigger: {
      trigger: parent,
      start: `top ${start}%`,
      end: "bottom top",
      scrub: true
    },
    backgroundColor: "#4a00e0",
    color: "#ffffff"
  });
}

// src/utils/stagger-item-scroll.ts
async function staggerItemScroll(id, start) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
      start: `top ${start}%`,
      end: "bottom 10%",
      scrub: true
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });
}

// src/utils/rotate-srcoll.ts
async function rotateScroll(id, start) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
      start: `top ${start}%`,
      end: "bottom -10%",
      scrub: true
      // markers:true,
    },
    rotation: 180,
    opacity: 0,
    duration: 1
    // stagger: 0.2, // optional: stagger effect
  });
}

// src/utils/progress-bar-scroll.ts
async function progressBar(id, start) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
      start: `top ${start}%`,
      end: "top top",
      scrub: 3
    },
    width: "100%"
  });
}

// src/utils/pin-element-scroll.ts
async function Pin(id, start, end) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.to(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      pin: true,
      start: `top top`,
      end: `bottom ${end}%`,
      scrub: true
    }
  });
}

export {
  toggleScroll,
  colorChange,
  staggerItemScroll,
  rotateScroll,
  progressBar,
  Pin
};
//# sourceMappingURL=chunk-XJ5VVBMW.mjs.map
