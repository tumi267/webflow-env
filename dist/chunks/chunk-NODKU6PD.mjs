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
async function colorChange(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
  const colorto = el.dataset.colorto ?? '"#4a00e0"';
  const textcolorto = el.dataset.textcolorto ?? "#FFFF00";
  const child = el?.firstElementChild;
  if (!el || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }
  gsap.to(child, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    },
    backgroundColor: colorto,
    color: textcolorto
  });
}

// src/utils/stagger-item-scroll.ts
async function staggerItemScroll(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
  const y = el.dataset.y ?? "50";
  const x = el.dataset.x ?? "0";
  const duration = parseFloat(el.dataset.duration ?? "0.5");
  const items = el.querySelectorAll("*");
  if (!items.length)
    return;
  gsap.from(items, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    },
    y,
    x,
    opacity: 0,
    duration,
    stagger: 0.2
  });
}

// src/utils/rotate-srcoll.ts
async function rotateScroll(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
  const amount = el.dataset.amount ?? "720";
  const duration = parseFloat(el.dataset.duration ?? "0.5");
  const children = el.querySelectorAll("*");
  if (!children.length)
    return;
  gsap.from(children, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    },
    rotation: amount,
    opacity: 0,
    duration
    // stagger: 0.2, // optional: stagger effect
  });
}

// src/utils/progress-bar-scroll.ts
async function progressBar(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
  const y = el.dataset.y ?? "0";
  const x = el.dataset.x ?? "0";
  const children = el.querySelectorAll("*");
  if (!children.length)
    return;
  gsap.to(children, {
    scrollTrigger: {
      trigger: el,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: 3,
      markers: mark
    },
    width: `${x}%`
    // height:`${y}%`,
  });
}

// src/utils/pin-element-scroll.ts
async function Pin(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
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
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      pin: true,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark,
      pinSpacing: false
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
//# sourceMappingURL=chunk-NODKU6PD.mjs.map
