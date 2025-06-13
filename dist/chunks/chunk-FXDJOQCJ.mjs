// src/utils/char.ts
async function initCharAnimations(id, start, mark) {
  try {
    const [gsap, ScrollTrigger, SplitText] = await Promise.all([
      import("./gsap-L2HCQACZ.mjs").then((m) => m.gsap),
      import("./ScrollTrigger-HIJSDX7Q.mjs").then((m) => m.ScrollTrigger),
      import("./SplitText-LUU4FCPQ.mjs").then((m) => m.SplitText)
    ]);
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID "${id}" not found`);
      return;
    }
    const split = new SplitText(element, {
      type: "chars",
      charsClass: `char-${id}`
      // Unique class for each instance
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${start}%`,
        end: "top 20%",
        scrub: true,
        markers: mark
      }
    });
    tl.from(split.chars, {
      autoAlpha: 0,
      y: -100,
      duration: 1,
      stagger: 0.05
      // Cleaner stagger syntax
    });
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

// src/utils/word.ts
async function initWordAnimations(id, start, mark) {
  try {
    const { gsap } = await import("./gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let splitInstance = null;
    let scrollTriggerInstance = null;
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element #${id} not found`);
    }
    splitInstance = SplitText.create(element, {
      type: "words",
      wordsClass: `word-${id}`
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${start}%`,
        end: "top 20%",
        scrub: true,
        markers: mark
      }
    });
    scrollTriggerInstance = tl.scrollTrigger;
    tl.from(splitInstance.words, {
      y: -100,
      opacity: 0,
      rotation: () => gsap.utils.random(-80, 80),
      duration: 0.7,
      ease: "back",
      stagger: {
        each: 0.15,
        from: "random"
      }
    });
  } catch (error) {
    console.error("Word animation initialization failed:", error);
    return () => {
    };
  }
}

// src/utils/lineaniamtion.ts
async function initLineAnimations(id, start, mark) {
  try {
    const { gsap } = await import("./gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element #${id} not found`);
      return () => {
      };
    }
    const split = SplitText.create(element, {
      type: "lines",
      linesClass: `line-${id}`
    });
    gsap.set(split.lines, { opacity: 0, y: 1e3 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${start}`,
        end: "bottom 10%",
        scrub: true,
        markers: mark,
        invalidateOnRefresh: true,
        onLeave: () => gsap.set(split.lines, { opacity: 0, y: 100 }),
        onLeaveBack: () => gsap.set(split.lines, { opacity: 0, y: 100 })
      }
    });
    tl.to(split.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: {
        each: 0.25,
        from: "start"
      }
    });
    return () => {
      tl.kill();
      split.revert();
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
async function initDecodeAnimations(id, start, mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function init() {
    document.querySelectorAll(`#${id}`).forEach((el) => {
      const decoder = new TextDecoder(el, gsap);
      ScrollTrigger.create({
        trigger: el,
        start: `top ${start}`,
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
async function initLineMaskReveal(id, start, mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const element = document.querySelector(`#${id}`);
  if (!element) {
    console.warn(`Element not found for selector: ${id}`);
    return;
  }
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
    stagger: 0.1,
    scrollTrigger: {
      trigger: element,
      start: `top ${start}%`,
      end: "bottom 20%",
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
  const trackingText = document.querySelector(`#${id}`);
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
//# sourceMappingURL=chunk-FXDJOQCJ.mjs.map
