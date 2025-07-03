// src/utils/char.ts
async function initCharAnimations() {
  try {
    const [gsap, ScrollTrigger, SplitText] = await Promise.all([
      import("./gsap-L2HCQACZ.mjs").then((m) => m.gsap),
      import("./ScrollTrigger-HIJSDX7Q.mjs").then((m) => m.ScrollTrigger),
      import("./SplitText-LUU4FCPQ.mjs").then((m) => m.SplitText)
    ]);
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const main = document.querySelectorAll(`[data-animation="char"]`);
    if (main) {
      const style = document.createElement("style");
      style.id = "char-animation-style";
      style.textContent = `
          [data-animation="char"] {
            word-break: break-word;
            overflow-wrap: break-word;
          }
          [data-animation="char"] .char {
            display: inline-block;
            word-break: break-word;
          }
        `;
      document.head.appendChild(style);
    }
    main.forEach((el) => {
      const start = el.dataset.start ?? "0";
      const end = el.dataset.end ?? "100";
      const position = el.dataset.position ?? "top";
      const positionEnd = el.dataset.positionend ?? "bottom";
      const mark = el.dataset.mark === "true";
      const y = el.dataset.y ?? "100";
      const x = el.dataset.x ?? "0";
      const duration = parseFloat(el.dataset.duration ?? "0.5");
      const stagger = parseFloat(el.dataset.stagger ?? "0.001");
      const split = new SplitText(el, {
        type: "chars",
        charsClass: `char-${el}`
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
        // autoAlpha: 0,
        opacity: 0,
        y,
        // use a visible offset
        x,
        stagger,
        ease: "none",
        duration,
        immediateRender: true
      });
    });
    ScrollTrigger.refresh();
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

// src/utils/word.ts
async function initWordAnimations() {
  try {
    const { gsap } = await import("./gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const elements = document.querySelectorAll(`[data-animation="word"]`);
    const cleanups = [];
    elements.forEach((el) => {
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
        wordsClass: `word-${el.dataset.id || Math.random().toString(36).substring(2, 9)}`
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
        duration,
        ease: "power1.out",
        stagger: {
          each: stagger,
          from: staggerseq
        }
      });
      cleanups.push(() => {
        tl.kill();
        splitInstance.revert();
        ScrollTrigger.getAll().forEach((instance) => {
          if (instance.trigger === el) {
            instance.kill();
          }
        });
      });
    });
    ScrollTrigger.refresh();
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  } catch (error) {
    console.error("Word animation initialization failed:", error);
    return () => {
    };
  }
}

// src/utils/lineaniamtion.ts
async function initLineAnimations() {
  try {
    const { gsap } = await import("./gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const elements = document.querySelectorAll(`[data-animation="line"]`);
    const cleanups = [];
    elements.forEach((element) => {
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
        linesClass: `line-${Math.random().toString(36).substring(2, 7)}`
      });
      gsap.set(split.lines, {
        y,
        x
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
        x: 0,
        duration,
        ease: "power3.out",
        stagger: {
          each: stagger,
          from: staggerseq
        }
      });
      cleanups.push(() => {
        tl.kill();
        split.revert();
        ScrollTrigger.getAll().forEach((instance) => {
          if (instance.trigger === element) {
            instance.kill();
          }
        });
      });
    });
    ScrollTrigger.refresh();
    return () => {
      cleanups.forEach((cleanup) => cleanup());
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
async function initDecodeAnimations() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function init() {
    const main = document.querySelectorAll(`[data-animation="decode"]`);
    main.forEach((el) => {
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
    ScrollTrigger.refresh();
  }
}

// src/utils/textmask.ts
async function initLineMaskReveal() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const elements = document.querySelectorAll(`[data-animation="mask"]`);
  elements.forEach((element) => {
    const start = element.dataset.start ?? "0";
    const end = element.dataset.end ?? "100";
    const position = element.dataset.position ?? "top";
    const positionEnd = element.dataset.positionend ?? "bottom";
    const mark = element.dataset.mark === "true";
    const stagger = parseFloat(element.dataset.stagger ?? "0.1");
    const direction = element.dataset.direction ?? "y";
    const maskColor = element.dataset.maskcolor ?? "#000";
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    const content = element.cloneNode(true);
    content.removeAttribute("data-animation");
    element.replaceWith(wrapper);
    wrapper.appendChild(content);
    const mask = document.createElement("div");
    mask.classList.add("mask_style");
    wrapper.appendChild(mask);
    const isHorizontal = direction === "x";
    Object.assign(mask.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: maskColor,
      transformOrigin: "left center",
      transform: "scaleX(1)",
      zIndex: "2",
      pointerEvents: "none"
    });
    gsap.to(mask, {
      ...isHorizontal ? { scaleX: 0 } : { scaleY: 0 },
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapper,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/texttracker.ts
async function initTracking() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  const main = document.querySelectorAll(`[data-animation="tracker"]`);
  main.forEach((trackingText) => {
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
//# sourceMappingURL=chunk-M4KXRB2P.mjs.map
