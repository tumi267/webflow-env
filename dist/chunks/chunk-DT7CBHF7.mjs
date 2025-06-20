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
async function colorChange(id, start, end, position = "top", positionEnd = "top", colorto, colorfrom, mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild;
  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }
  gsap.to(child, {
    scrollTrigger: {
      trigger: parent,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    },
    backgroundColor: colorto,
    color: colorfrom
  });
}

// src/utils/stagger-item-scroll.ts
async function staggerItemScroll(id, start, end, position = "top", positionEnd = "top", mark) {
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
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2
  });
}

// src/utils/rotate-srcoll.ts
async function rotateScroll(id, start, end, amount, position = "top", positionEnd = "top", mark) {
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
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    },
    rotation: amount,
    opacity: 0,
    duration: 1
    // stagger: 0.2, // optional: stagger effect
  });
}

// src/utils/progress-bar-scroll.ts
async function progressBar(id, start, end, position = "top", positionEnd = "top", mark) {
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
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: 3,
      markers: mark
    },
    width: "100%"
  });
}

// src/utils/pin-element-scroll.ts
async function Pin(id, start, end, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(`#${id}`, {
    scrollTrigger: {
      trigger: `#${id}`,
      pin: true,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
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
//# sourceMappingURL=chunk-DT7CBHF7.mjs.map
