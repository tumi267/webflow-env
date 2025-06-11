import "./chunks/chunk-SUYWSG3L.mjs";

// src/utils/decode.ts
var CHARACTERS = "01";
var TextDecoder = class {
  originalTexts = [];
  textNodes = [];
  target;
  gsap;
  constructor(target, gsap) {
    this.target = target;
    this.gsap = gsap;
    this.initialize();
  }
  initialize() {
    const walker = document.createTreeWalker(
      this.target,
      NodeFilter.SHOW_TEXT,
      null
    );
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent?.trim()) {
        this.textNodes.push(node);
        this.originalTexts.push(node.textContent);
      }
    }
    this.scrambleAll();
  }
  scrambleAll() {
    this.textNodes.forEach((node, index) => {
      const length = this.originalTexts[index].length;
      node.textContent = Array(length).fill(0).map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join("");
    });
  }
  decode(duration = 2) {
    const obj = { progress: 0 };
    const totalLength = this.originalTexts.reduce((sum, text) => sum + text.length, 0);
    this.gsap.killTweensOf(obj);
    this.scrambleAll();
    this.gsap.to(obj, {
      progress: totalLength,
      duration,
      ease: "none",
      onUpdate: () => {
        let remainingChars = Math.floor(obj.progress);
        this.textNodes.forEach((node, index) => {
          const original = this.originalTexts[index];
          let result = "";
          const length = original.length;
          const revealCount = Math.min(remainingChars, length);
          for (let i = 0; i < length; i++) {
            if (i < revealCount) {
              result += original[i];
            } else {
              result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
          }
          node.textContent = result;
          remainingChars -= revealCount;
        });
      },
      onComplete: () => {
        this.textNodes.forEach((node, index) => {
          node.textContent = this.originalTexts[index];
        });
      }
    });
  }
};
async function initDecodeAnimations() {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".decode").forEach((element) => {
      const decoder = new TextDecoder(element, gsap);
      ScrollTrigger.create({
        trigger: element,
        start: "top 90%",
        onEnter: () => decoder.decode(3),
        onEnterBack: () => {
          decoder.decode(2);
        }
      });
    });
  });
}

// src/utils/lineaniamtion.ts
async function initLineAnimations(id) {
  try {
    const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./chunks/SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let splitInstance = null;
    let scrollTrigger = null;
    const cleanupFns = [];
    const initAnimation = () => {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Element #${id} not found`);
        return;
      }
      splitInstance = SplitText.create(element, {
        type: "lines",
        linesClass: `line-${id}`
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
          markers: false,
          // Enable for debugging if needed
          invalidateOnRefresh: true
        }
      });
      scrollTrigger = tl.scrollTrigger;
      tl.from(splitInstance.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3",
        stagger: {
          each: 0.25,
          from: "start"
        }
      });
      const handleResize = () => {
        splitInstance?.revert();
        scrollTrigger?.refresh();
        initAnimation();
      };
      const resizeObserver = new ResizeObserver(
        gsap.utils.throttle(handleResize, 200)
      );
      resizeObserver.observe(element);
      cleanupFns.push(() => resizeObserver.disconnect());
      return () => {
        splitInstance?.revert();
        scrollTrigger?.kill();
      };
    };
    if (document.readyState === "complete") {
      const animationCleanup = initAnimation();
      if (animationCleanup)
        cleanupFns.push(animationCleanup);
    } else {
      const domLoadedHandler = () => {
        const animationCleanup = initAnimation();
        if (animationCleanup)
          cleanupFns.push(animationCleanup);
      };
      document.addEventListener("DOMContentLoaded", domLoadedHandler);
      cleanupFns.push(() => {
        document.removeEventListener("DOMContentLoaded", domLoadedHandler);
      });
    }
    return () => cleanupFns.forEach((fn) => fn());
  } catch (error) {
    console.error("Line animation initialization failed:", error);
    return () => {
    };
  }
}

// src/utils/word.ts
async function initWordAnimations(id) {
  try {
    const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
    const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
    const { SplitText } = await import("./chunks/SplitText-LUU4FCPQ.mjs");
    gsap.registerPlugin(ScrollTrigger, SplitText);
    let splitInstance = null;
    let scrollTriggerInstance = null;
    const cleanupFns = [];
    const init = () => {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Element #${id} not found`);
        return;
      }
      splitInstance = SplitText.create(element, {
        type: "words",
        wordsClass: `word-${id}`
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          markers: false,
          invalidateOnRefresh: true
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
      const onResize = () => {
        splitInstance?.revert();
        scrollTriggerInstance?.refresh();
        init();
      };
      const throttledResize = gsap.utils.throttle(onResize, 200);
      const resizeObserver = new ResizeObserver(throttledResize);
      resizeObserver.observe(element);
      cleanupFns.push(() => resizeObserver.disconnect());
      return () => {
        splitInstance?.revert();
        scrollTriggerInstance?.kill();
      };
    };
    if (document.readyState === "complete") {
      const animationCleanup = init();
      if (animationCleanup)
        cleanupFns.push(animationCleanup);
    } else {
      const domLoadedHandler = () => {
        const animationCleanup = init();
        if (animationCleanup)
          cleanupFns.push(animationCleanup);
      };
      document.addEventListener("DOMContentLoaded", domLoadedHandler);
      cleanupFns.push(() => {
        document.removeEventListener("DOMContentLoaded", domLoadedHandler);
      });
    }
    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  } catch (error) {
    console.error("Word animation initialization failed:", error);
    return () => {
    };
  }
}

// src/utils/char.ts
async function initCharAnimations(id) {
  try {
    const [gsap, ScrollTrigger, SplitText] = await Promise.all([
      import("./chunks/gsap-L2HCQACZ.mjs").then((m) => m.gsap),
      import("./chunks/ScrollTrigger-HIJSDX7Q.mjs").then((m) => m.ScrollTrigger),
      import("./chunks/SplitText-LUU4FCPQ.mjs").then((m) => m.SplitText)
    ]);
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const domReady = document.readyState === "complete" || document.readyState === "interactive";
    const initAnimation = () => {
      const element2 = document.getElementById(id);
      if (!element2) {
        console.warn(`Element with ID "${id}" not found`);
        return;
      }
      const split = new SplitText(element2, {
        type: "chars",
        charsClass: `char-${id}`
        // Unique class for each instance
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element2,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
      tl.from(split.chars, {
        autoAlpha: 0,
        y: -100,
        duration: 1,
        stagger: 0.05
        // Cleaner stagger syntax
      });
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === element2) {
            trigger.kill();
          }
        });
        split.revert();
      };
    };
    let cleanup;
    if (domReady) {
      cleanup = initAnimation();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        cleanup = initAnimation();
      });
    }
    const onResize = () => {
      cleanup?.();
      cleanup = initAnimation();
    };
    const resizeObserver = new ResizeObserver(onResize);
    const element = document.getElementById(id);
    if (element)
      resizeObserver.observe(element);
    return () => {
      cleanup?.();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

// src/utils/textmask.ts
async function initMaskAnimation() {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./chunks/SplitText-LUU4FCPQ.mjs");
  gsap.registerPlugin(ScrollTrigger);
  document.addEventListener("DOMContentLoaded", () => {
    let char = SplitText.create(".headline", {
      type: "chars"
    });
    let word = SplitText.create(".sub_headline", {
      type: "words"
    });
    let line = SplitText.create(".line_amination", {
      type: "lines"
    });
    SplitText.create(".line_amination_mask", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      aria: "hidden",
      mask: "lines",
      onSplit: (self) => {
        gsap.from(self.words, {
          opacity: 0,
          duration: 5,
          // duration is still needed but less important with scrub
          ease: "none",
          // disable easing for scrubbed animations
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".line_amination_mask",
            start: "top 80%",
            // adjust as needed
            end: "bottom 100%",
            // must define an end for scrubbing
            scrub: true
            // 👈 THIS makes the scroll control the animation
          }
        });
      }
    });
    let tl = gsap.timeline({ defaults: { duration: 1, autoAlpha: 0, y: -100 } });
    tl.from(char.chars, { stagger: 0.05 }).from(word.words, {
      y: -100,
      opacity: 0,
      rotation: "random(-80, 80)",
      duration: 0.7,
      ease: "back",
      stagger: 0.15
    });
    const onResize = () => line.revert();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      line.revert();
    };
  });
}

// src/utils/texttracker.ts
async function initTracking() {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./chunks/SplitText-LUU4FCPQ.mjs");
  const trackingText = document.querySelector(".tracking_text");
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

// src/text.ts
initCharAnimations("header");
initWordAnimations("sub_header");
initLineAnimations("line_amination");
initDecodeAnimations();
initMaskAnimation();
initTracking();
//# sourceMappingURL=text.mjs.map
