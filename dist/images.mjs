import "./chunks/chunk-SUYWSG3L.mjs";

// src/utils/rollReveal.ts
async function rollReveal(id, duration = 2) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(`#${id}`, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
  });
  const tl = gsap.timeline({
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
async function rollRevealReverse(id, duration = 2) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(`#${id}`, {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
  });
  const tl = gsap.timeline({
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
async function fadeIn(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function flipReveal(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const parent = document.getElementById(id);
  if (!parent)
    return;
  const children = parent.querySelectorAll("*");
  gsap.set(parent, { transformPerspective: 2e3 });
  const tl = gsap.timeline({
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
    gsap.to(children, {
      rotationY: "+=10",
      duration: 0.5,
      yoyo: true,
      repeat: 3,
      ease: "sine.inOut"
    });
  }
}

// src/utils/pan.ts
async function pan(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./chunks/SplitText-LUU4FCPQ.mjs");
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

// src/utils/slideInLeft.ts
async function slideInLeft(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function slideInRight(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(`#${id}`, {
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
async function zoom(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { SplitText } = await import("./chunks/SplitText-LUU4FCPQ.mjs");
  gsap.fromTo(
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
//# sourceMappingURL=images.mjs.map
