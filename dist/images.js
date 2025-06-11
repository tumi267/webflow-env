import {
  gsapWithCSS
} from "./chunk-BVJFHCJQ.js";
import "./chunk-JCVR2ZN6.js";

// src/utils/rollReveal.ts
function rollReveal(id, duration = 2) {
  gsapWithCSS.set(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });
  const tl = gsapWithCSS.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top center",
      // When top of element hits 80% viewport
      end: "bottom 10%",
      // When top hits 20% viewport
      scrub: true
    }
  });
  tl.to(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });
  return tl;
}

// src/utils/rollRevealReverse.ts
function rollRevealReverse(id, duration = 2) {
  gsapWithCSS.set(`#${id}`, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
  });
  const tl = gsapWithCSS.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top center",
      // When top of element hits 80% viewport
      end: "bottom 10%",
      // When top hits 20% viewport
      scrub: true
    }
  });
  tl.to(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration,
    ease: "power3.out"
  });
  return tl;
}

// src/utils/fadeIn.ts
function fadeIn(id) {
  gsapWithCSS.from(`#${id}`, {
    opacity: 0,
    duration: 6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: `#${id}`,
      // Element that triggers the animation
      start: "top center",
      // When the top of `.fade_in` hits 80% of the viewport
      end: "bottom 20%",
      // When the top of `.fade_in` hits 20% of the viewport
      scrub: true
    }
  });
}

// src/utils/flipReveal.ts
function flipReveal(id) {
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  gsapWithCSS.set(parent, { transformPerspective: 2e3 });
  const tl = gsapWithCSS.timeline({
    scrollTrigger: {
      trigger: parent,
      start: "top 80%",
      end: "top 30%",
      toggleActions: "play none none none",
      scrub: true
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
    gsapWithCSS.to(children, {
      rotationY: "+=10",
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    });
  }
}

// src/utils/pan.ts
function pan(id) {
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
      gsapWithCSS.to(child, {
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
      gsapWithCSS.to(child, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
    });
  });
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
  };
}

// src/utils/slideInLeft.ts
function slideInLeft(id) {
  gsapWithCSS.from(`#${id}`, {
    x: -300,
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: `#${id}`,
      start: "top center",
      end: "bottom 10%",
      scrub: true
    }
  });
}

// src/utils/slideInRight.ts
function slideInRight(id) {
  gsapWithCSS.from(`#${id}`, {
    x: 300,
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: `#${id}`,
      // Element that triggers the animation
      start: "top center",
      // When top hits 75% of viewport
      end: "bottom 10%",
      // When top hits 25% of viewport
      scrub: true
    }
  });
}

// src/utils/zoom.ts
function zoom(id) {
  gsapWithCSS.fromTo(
    `#${id}`,
    {
      scale: 1
    },
    {
      scale: 1.3,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top center",
        end: "bottom 20%",
        scrub: 0.5
      }
    }
  );
}

// src/images.ts
rollReveal("roll_reveal");
rollRevealReverse("roll_reveal_revese");
fadeIn("fade_in");
flipReveal("flip_reveal");
pan("pan");
slideInLeft("slide_in_left");
slideInRight("slide_in_right");
zoom("zoom");
//# sourceMappingURL=images.js.map
