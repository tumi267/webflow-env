// src/utils/char.ts
async function initCharAnimations(id) {
  try {
    const [gsap, ScrollTrigger, SplitText] = await Promise.all([
      import("./gsap-L2HCQACZ.mjs").then((m) => m.gsap),
      import("./ScrollTrigger-HIJSDX7Q.mjs").then((m) => m.ScrollTrigger),
      import("./SplitText-LUU4FCPQ.mjs").then((m) => m.SplitText)
    ]);
    gsap.registerPlugin(ScrollTrigger, SplitText);
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
    const y = el.dataset.y ?? "100";
    const x = el.dataset.x ?? "0";
    const duration = parseFloat(el.dataset.duration ?? "0.5");
    const stagger = parseFloat(el.dataset.stagger ?? "0.1");
    const split = new SplitText(el, {
      type: "chars",
      charsClass: `char-${id}`
      // Unique class for each instance
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
    tl.from(split.chars, {
      autoAlpha: 0,
      y,
      x,
      duration,
      stagger
    });
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

// src/utils/word.ts
async function initWordAnimations(id) {
  try {
    const { gsap } = await import("./gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const el = document.querySelector(`[data-id="${id}"]`);
    if (!el) {
      console.warn(`Element with data-id "${id}" not found`);
      return () => {
      };
    }
    const start = el.dataset.start ?? "0";
    const end = el.dataset.end ?? "100";
    const position = el.dataset.position ?? "top";
    const positionEnd = el.dataset.positionend ?? "bottom";
    const mark = el.dataset.mark === "true";
    const y = el.dataset.y ?? "100";
    const x = el.dataset.x ?? "0";
    const duration = parseFloat(el.dataset.duration ?? "0.5");
    const stagger = parseFloat(el.dataset.stagger ?? "0.1");
    const staggerseq = el.dataset.staggerseq ?? "start";
    const splitInstance = SplitText.create(el, {
      type: "words",
      wordsClass: `word-${id}`
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
    tl.from(splitInstance.words, {
      y,
      x,
      opacity: 0,
      rotation: () => gsap.utils.random(-80, 80),
      duration,
      ease: "back",
      stagger: {
        each: stagger,
        from: staggerseq
      }
    });
    return () => {
      tl.kill();
      splitInstance.revert();
      ScrollTrigger.getAll().forEach((instance) => {
        if (instance.trigger === el) {
          instance.kill();
        }
      });
    };
  } catch (error) {
    console.error("Word animation initialization failed:", error);
    return () => {
    };
  }
}

// src/utils/lineaniamtion.ts
async function initLineAnimations(id) {
  try {
    const { gsap } = await import("./gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const element = document.querySelector(`[data-id="${id}"]`);
    if (!element) {
      console.warn(`Element with data-id "${id}" not found`);
      return () => {
      };
    }
    const start = element.dataset.start ?? "0";
    const end = element.dataset.end ?? "100";
    const position = element.dataset.position ?? "top";
    const positionEnd = element.dataset.positionend ?? "bottom";
    const mark = element.dataset.mark === "true";
    const y = element.dataset.y ?? "100";
    const x = element.dataset.x ?? "0";
    const duration = parseFloat(element.dataset.duration ?? "0.5");
    const stagger = parseFloat(element.dataset.stagger ?? "0.1");
    const staggerseq = element.dataset.staggerseq ?? "start";
    const split = new SplitText(element, {
      type: "lines",
      linesClass: `line-${id}`
    });
    gsap.set(split.lines, {
      opacity: 0,
      y,
      // Start from their final y position (hidden)
      x
      // Start from their final x position (hidden)
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
        invalidateOnRefresh: true,
        onLeaveBack: () => {
          gsap.set(split.lines, { opacity: 0 });
        }
      }
    });
    tl.to(split.lines, {
      opacity: 1,
      y: 0,
      // Animate to 0 (normal position)
      x: 0,
      // Animate to 0 (normal position)
      duration,
      ease: "power3.out",
      stagger: {
        each: stagger,
        from: staggerseq
      }
    });
    return () => {
      tl.kill();
      split.revert();
      ScrollTrigger.getAll().forEach((instance) => {
        if (instance.trigger === element) {
          instance.kill();
        }
      });
    };
  } catch (error) {
    console.error("Line animation initialization failed:", error);
    return () => {
    };
  }
}

// src/utils/decode.ts
var CHARACTERS = "01";
var TextDecoder = class {
  constructor(el, gsap) {
    this.el = el;
    this.gsap = gsap;
    this.init();
  }
  originals = [];
  nodes = [];
  init() {
    const walker = document.createTreeWalker(this.el, NodeFilter.SHOW_TEXT, null);
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent?.trim()) {
        this.nodes.push(node);
        this.originals.push(node.textContent);
      }
    }
    this.scramble();
  }
  scramble() {
    this.nodes.forEach((node, i) => {
      const len = this.originals[i].length;
      node.textContent = Array.from(
        { length: len },
        () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
      ).join("");
    });
  }
  decode(duration = 2) {
    const obj = { progress: 0 };
    const total = this.originals.reduce((sum, text) => sum + text.length, 0);
    this.gsap.killTweensOf(obj);
    this.scramble();
    this.gsap.to(obj, {
      progress: total,
      duration,
      ease: "none",
      onUpdate: () => {
        let remaining = Math.floor(obj.progress);
        this.nodes.forEach((node, i) => {
          const original = this.originals[i];
          const len = original.length;
          const revealed = Math.min(remaining, len);
          node.textContent = original.slice(0, revealed) + Array.from(
            { length: len - revealed },
            () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          ).join("");
          remaining -= revealed;
        });
      },
      onComplete: () => {
        this.nodes.forEach((node, i) => {
          node.textContent = this.originals[i];
        });
      }
    });
  }
};
async function initDecodeAnimations(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function init() {
    document.querySelectorAll(`[data-id="${id}"]`).forEach((el) => {
      const decoder = new TextDecoder(el, gsap);
      const start = el.dataset.start ?? "50";
      const end = el.dataset.end ?? "30";
      const position = el.dataset.position ?? "top";
      const positionEnd = el.dataset.positionend ?? "bottom";
      const mark = el.dataset.mark === "true";
      ScrollTrigger.create({
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        onEnter: () => decoder.decode(3),
        onEnterBack: () => decoder.decode(2),
        onLeave: () => decoder.scramble(),
        // Encode again when leaving downward
        onLeaveBack: () => decoder.scramble(),
        markers: mark
        // Encode again when leaving upward
      });
    });
  }
}

// src/utils/textmask.ts
async function initLineMaskReveal(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const element = document.querySelector(`[data-id="${id}"]`);
  if (!element) {
    console.warn(`Element not found for selector: ${id}`);
    return;
  }
  const start = element.dataset.start ?? "0";
  const end = element.dataset.end ?? "100";
  const position = element.dataset.position ?? "top";
  const positionEnd = element.dataset.positionend ?? "bottom";
  const mark = element.dataset.mark === "true";
  const stagger = parseFloat(element.dataset.stagger ?? "0.1");
  const split = SplitText.create(element, {
    type: "lines",
    linesClass: "line"
  });
  gsap.set(split.lines, {
    yPercent: 100,
    opacity: 0
  });
  gsap.to(split.lines, {
    yPercent: 0,
    opacity: 1,
    ease: "power3.out",
    stagger,
    scrollTrigger: {
      trigger: element,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    }
  });
}

// src/utils/texttracker.ts
async function initTracking(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  const trackingText = document.querySelectorAll(`[data-id="${id}"]`);
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tiltX = mouseY / 10;
    const tiltY = mouseX / 15;
    gsap.to(trackingText, {
      rotationX: tiltX,
      rotationY: tiltY,
      transformPerspective: 1e3,
      // Adds 3D depth
      ease: "power2.out",
      duration: 0.5
    });
  });
  document.addEventListener("mouseleave", () => {
    gsap.to(trackingText, {
      rotationX: 0,
      rotationY: 0,
      duration: 1
    });
  });
}

export {
  initCharAnimations,
  initWordAnimations,
  initLineAnimations,
  initDecodeAnimations,
  initLineMaskReveal,
  initTracking
};
//# sourceMappingURL=chunk-NHWM2XRD.mjs.map
