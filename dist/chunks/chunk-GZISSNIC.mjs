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
  const cleanups = [];
  elements.forEach((parent) => {
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const y = parent.dataset.y ?? "100";
    const x = parent.dataset.x ?? "0";
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    gsap.from(parent, {
      x,
      y,
      // opacity: 0,
      // duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: parent,
        // Element that triggers the animation
        start: `${position} ${start}%`,
        // When top hits 75% of viewport
        end: `${positionEnd} ${end}%`,
        // When top hits 25% of viewport
        scrub: true,
        markers: mark
      }
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
  const cleanups = [];
  elements.forEach((parent) => {
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const y = parent.dataset.y ?? "100";
    const x = parent.dataset.x ?? "0";
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    gsap.from(parent, {
      x: -x,
      y,
      // opacity: 0,
      // duration: duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
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
  const cleanups = [];
  elements.forEach((parent) => {
    const children = parent.querySelectorAll("*");
    gsap.set(parent, { transformPerspective: 2e3 });
    const start = parent.dataset.start ?? "0";
    const end = parent.dataset.end ?? "100";
    const position = parent.dataset.position ?? "top";
    const positionEnd = parent.dataset.positionend ?? "bottom";
    const mark = parent.dataset.mark === "true";
    const duration = parseFloat(parent.dataset.duration ?? "0.5");
    const wobble = parent.dataset.wobble ?? "6";
    const num = parent.dataset.num ?? "3";
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        toggleActions: "play none none none",
        scrub: true,
        markers: mark
      }
    });
    tl.to(children, {
      rotationY: `+=${360 * num}`,
      stagger: 0.2,
      duration,
      ease: "back.out(1.7)",
      transformPerspective: 2e3,
      onComplete: addFinalWobble
    });
    function addFinalWobble() {
      gsap.to(children, {
        rotationY: `+=2${wobble}`,
        duration: 0.5,
        yoyo: true,
        repeat: 3,
        ease: "sine.inOut"
      });
    }
  });
  ScrollTrigger.refresh();
}

// src/utils/fadeIn.ts
async function fadeIn() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="fade"]`);
  const cleanups = [];
  elements.forEach((el) => {
    const start = el.dataset.start ?? "0";
    const end = el.dataset.end ?? "100";
    const position = el.dataset.position ?? "top";
    const positionEnd = el.dataset.positionend ?? "bottom";
    const mark = el.dataset.mark === "true";
    gsap.from(el, {
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        // Element that triggers the animation
        start: `${position} ${start}%`,
        // When the top of `.fade_in` hits 80% of the viewport
        end: `${positionEnd} ${end}%`,
        // When the top of `.fade_in` hits 20% of the viewport
        scrub: true,
        markers: mark
      }
    });
  });
  ScrollTrigger.refresh();
}

// src/utils/rollRevealReverse.ts
async function rollRevealReverse() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="rollReverse"]`);
  ;
  const cleanups = [];
  elements.forEach((el) => {
    gsap.set(el, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
    });
    const start = el.dataset.start ?? "0";
    const end = el.dataset.end ?? "100";
    const position = el.dataset.position ?? "top";
    const positionEnd = el.dataset.positionend ?? "bottom";
    const mark = el.dataset.mark === "true";
    const duration = parseFloat(el.dataset.duration ?? "0.5");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        // When top of element hits 80% viewport
        end: `${positionEnd} ${end}%`,
        // When top hits 20% viewport
        scrub: true,
        markers: mark
      }
    });
    tl.to(el, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration,
      ease: "power3.out"
    });
    return tl;
  });
  ScrollTrigger.refresh();
}

// src/utils/rollReveal.ts
async function rollReveal() {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const elements = document.querySelectorAll(`[data-animation="roll"]`);
  ;
  const cleanups = [];
  elements.forEach((el) => {
    gsap.set(el, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    });
    const start = el.dataset.start ?? "0";
    const end = el.dataset.end ?? "100";
    const position = el.dataset.position ?? "top";
    const positionEnd = el.dataset.positionend ?? "bottom";
    const mark = el.dataset.mark === "true";
    const duration = parseFloat(el.dataset.duration ?? "0.5");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
    tl.to(el, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration,
      ease: "power3.out"
    });
    return tl;
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
//# sourceMappingURL=chunk-GZISSNIC.mjs.map
