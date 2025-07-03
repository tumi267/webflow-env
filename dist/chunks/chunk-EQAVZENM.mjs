// src/utils/zoom.ts
async function zoom() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const elements = document.querySelectorAll(`[data-animation="zoom"]`);
  const cleanups = [];
  elements.forEach((el) => {
    const start = el.dataset.start ?? "0";
    const end = el.dataset.end ?? "100";
    const position = el.dataset.position ?? "top";
    const positionEnd = el.dataset.positionend ?? "bottom";
    const mark = el.dataset.mark === "true";
    const amount = el.dataset.amount ?? "2";
    const duration = parseFloat(el.dataset.duration ?? "0.5");
    const children = el.querySelectorAll("*");
    gsap.fromTo(
      children,
      {
        scale: 1
      },
      {
        scale: amount,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: `${position} ${start}%`,
          end: `${positionEnd} ${end}%`,
          scrub: 0.5,
          markers: mark
        }
      }
    );
  });
}

// src/utils/slideInRight.ts
async function slideInRight() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="slideRight"]`);
  elements.forEach((parent, index) => {
    const children = Array.from(parent.children);
    if (!children.length)
      return;
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const y = parseFloat(parent.dataset.y ?? "0");
    const x = parseFloat(parent.dataset.x ?? "1000");
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    gsap.set(children, {
      x,
      y
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
        id: `slideRight-${index + 1}`
      }
    });
    tl.to(children, {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      ease: "power3.out",
      stagger: duration
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/slideInLeft.ts
async function slideInLeft() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="slideLeft"]`);
  elements.forEach((parent, index) => {
    const children = Array.from(parent.children);
    if (!children.length)
      return;
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const y = parseFloat(parent.dataset.y ?? "100");
    const x = parseFloat(parent.dataset.x ?? "0");
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    gsap.set(children, {
      x: -x,
      y
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
        id: `slideLeft-${index + 1}`
      }
    });
    tl.to(children, {
      x: 0,
      y: 0,
      duration,
      ease: "power3.out",
      stagger: duration
      // sequential effect
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/pan.ts
async function pan() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  const elements = document.querySelectorAll(`[data-animation="pan"]`);
  const cleanups = [];
  elements.forEach((el) => {
    const children = Array.from(el.children);
    const intensityX = 30;
    const intensityY = 30;
    const duration = 0.5;
    const handleMouseMove = (e) => {
      const bounds = el.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = (e.clientX - centerX) / (bounds.width / 20);
      const deltaY = (e.clientY - centerY) / (bounds.height / 2);
      const targetX = deltaX * intensityX;
      const targetY = deltaY * intensityY;
      children.forEach((child) => {
        gsap.to(child, {
          x: targetX,
          y: targetY,
          duration: duration * 1.5,
          ease: "power2.out"
        });
      });
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", () => {
      children.forEach((child) => {
        gsap.to(child, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      });
    });
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  });
  ScrollTrigger.refresh();
}

// src/utils/flipReveal.ts
async function flipReveal() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="flip"]`);
  elements.forEach((parent) => {
    const children = parent.querySelectorAll("*");
    if (!children.length)
      return;
    gsap.set(parent, { transformPerspective: 2e3 });
    gsap.set(children, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      rotationY: 0
      // Reset any previous transform
    });
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    const num = parseFloat(parent.dataset.num ?? "1");
    const rotation = num === 1 ? 360 : `+=${360 * num}`;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
    tl.to(children, {
      rotationY: rotation,
      stagger: 0.2,
      duration,
      ease: "power2.out"
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/fadeIn.ts
async function fadeIn() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="fade"]`);
  elements.forEach((parent, index) => {
    const children = Array.from(parent.children);
    if (!children.length)
      return;
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const fadeDuration = parseFloat(parent.dataset.duration ?? "0.5");
    gsap.set(children, { opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        // ✅ smooth scroll control
        markers: true,
        id: `fade-${index + 1}`
      }
    });
    const fadeStep = 1 / children.length;
    children.forEach((child, i) => {
      tl.to(child, {
        opacity: 1,
        ease: "none"
      }, i * fadeStep);
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/rollRevealReverse.ts
async function rollRevealReverse() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll('[data-animation="rollReverse"]');
  elements.forEach((el) => {
    const children = el.querySelectorAll("*");
    if (!children.length)
      return;
    const start = el.dataset.start ?? "50";
    const end = el.dataset.end ?? "0";
    const position = el.dataset.position ?? "top";
    const positionEnd = el.dataset.positionend ?? "top";
    const mark = el.dataset.mark === "true";
    const duration = parseFloat(el.dataset.duration ?? "0.5");
    gsap.set(children, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
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
    tl.to(children, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration,
      ease: "power3.out",
      stagger: duration
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/rollReveal.ts
async function rollReveal() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll('[data-animation="roll"]');
  elements.forEach((parent) => {
    const children = parent.querySelectorAll("*");
    if (!children.length)
      return;
    const start = parent.dataset.start ?? "50";
    const end = parent.dataset.end ?? "0";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "top";
    const mark = parent.dataset.mark === "true";
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    gsap.set(parent, { transformPerspective: 1e3 });
    gsap.set(children, {
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
    tl.to(children, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration,
      ease: "power3.out",
      stagger: duration
      // one full duration between each child
    });
  });
  ScrollTrigger.refresh();
}

export {
  zoom,
  slideInRight,
  slideInLeft,
  pan,
  flipReveal,
  fadeIn,
  rollRevealReverse,
  rollReveal
};
//# sourceMappingURL=chunk-EQAVZENM.mjs.map
