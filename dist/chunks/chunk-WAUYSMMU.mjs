// src/utils/zoom.ts
async function zoom(id, start, end, amount, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  gsap.fromTo(
    children,
    {
      scale: 1
    },
    {
      scale: amount,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: 0.5,
        markers: mark
      }
    }
  );
}

// src/utils/slideInRight.ts
async function slideInRight(id, start, end, amount, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
    x: amount,
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: `#${id}`,
      // Element that triggers the animation
      start: `${position} ${start}%`,
      // When top hits 75% of viewport
      end: `${positionEnd} ${end}%`,
      // When top hits 25% of viewport
      scrub: true,
      markers: mark
    }
  });
}

// src/utils/slideInLeft.ts
async function slideInLeft(id, start, end, amount, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
    x: -amount,
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: `#${id}`,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      markers: mark
    }
  });
}

// src/utils/pan.ts
async function pan(id) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./SplitText-LUU4FCPQ.mjs");
  const container = document.querySelector(`#${id}`);
  if (!container)
    return;
  const children = Array.from(container.children);
  const intensityX = 30;
  const intensityY = 30;
  const duration = 0.5;
  const handleMouseMove = (e) => {
    const bounds = container.getBoundingClientRect();
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
  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", () => {
    children.forEach((child) => {
      gsap.to(child, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
    });
  });
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
}

// src/utils/flipReveal.ts
async function flipReveal(id, start, end, rotations, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  gsap.set(parent, { transformPerspective: 2e3 });
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
  let num = 3;
  tl.to(children, {
    rotationY: `+=${360 * num}`,
    stagger: 0.2,
    duration: 2,
    ease: "back.out(1.7)",
    transformPerspective: 2e3,
    onComplete: addFinalWobble
  });
  function addFinalWobble() {
    gsap.to(children, {
      rotationY: `+=2${rotations}`,
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    });
  }
}

// src/utils/fadeIn.ts
async function fadeIn(id, start, end, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: `#${id}`,
      // Element that triggers the animation
      start: `${position} ${start}%`,
      // When the top of `.fade_in` hits 80% of the viewport
      end: `${positionEnd} ${end}%`,
      // When the top of `.fade_in` hits 20% of the viewport
      scrub: true,
      markers: mark
    }
  });
}

// src/utils/rollRevealReverse.ts
async function rollRevealReverse(id, start, end, duration = 2, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(`#${id}`, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      start: `${position} ${start}%`,
      // When top of element hits 80% viewport
      end: `${positionEnd} ${end}%`,
      // When top hits 20% viewport
      scrub: true,
      markers: mark
    }
  });
  tl.to(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });
  return tl;
}

// src/utils/rollReveal.ts
async function rollReveal(id, start, end, duration = 2, position = "top", positionEnd = "top", mark) {
  const { gsap } = await import("./gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      start: `${position} ${start}%`,
      // When top of element hits 80% viewport
      end: `${positionEnd} ${end}%`,
      // When top hits 20% viewport
      scrub: true,
      markers: mark
    }
  });
  tl.to(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });
  return tl;
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
//# sourceMappingURL=chunk-WAUYSMMU.mjs.map
