import "./chunks/chunk-SUYWSG3L.mjs";

// src/utils/horizontalScroll.ts
async function horizontalScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const container = document.querySelector(`#${id}`);
  if (!container) {
    console.warn("horizontalScroll: container not found.");
    return;
  }
  const panels = Array.from(container.querySelectorAll(".panel_horizontal"));
  const panelCount = panels.length;
  if (panelCount === 0) {
    console.warn("horizontalScroll: No .panel_horizontal elements found inside container.");
    return;
  }
  gsap.set(container, {
    width: `${100 * panelCount}vw`
  });
  gsap.to(panels, {
    xPercent: -100 * (panelCount - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panelCount - 1),
      end: () => "+=" + (container.scrollWidth - window.innerWidth)
    }
  });
}

// src/utils/threepanelfadein.ts
async function threePanelFade(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  const wrapper = document.getElementById(id);
  if (!wrapper) {
    console.warn(`Wrapper element not found: ${id}`);
    return;
  }
  const children = Array.from(wrapper.children);
  if (children.length === 0) {
    console.warn("No child elements found in wrapper");
    return;
  }
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: "top top",
      end: `+=${children.length * 100}%`,
      scrub: true,
      pin: true
    }
  });
  const animations = [
    { y: 200, opacity: 0 },
    // bottom
    { x: -200, opacity: 0 },
    // left
    { x: 200, opacity: 0 }
    // right
  ];
  children.forEach((child, index) => {
    const animationType = animations[index % animations.length];
    tl.from(child, {
      ...animationType,
      duration: 0.5,
      ease: "power2.out"
    }, index * 0.1);
  });
  return () => ScrollTrigger.getAll().forEach((st) => st.kill());
}

// src/utils/svgScroll.ts
async function svgScroll(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const { DrawSVGPlugin } = await import("./chunks/DrawSVGPlugin-ESCRFPMY.mjs");
  const { MotionPathPlugin } = await import("./chunks/MotionPathPlugin-6Z3F5HXQ.mjs");
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
  gsap.set(".ball01", { x: -5, y: 0, autoAlpha: 1 });
  const pulses = gsap.timeline();
  pulses.fromTo(
    ".ball02, .text01",
    { autoAlpha: 0, scale: 0 },
    {
      autoAlpha: 1,
      scale: 2,
      transformOrigin: "center",
      ease: "elastic(2.5, 1)"
    },
    0.2
  );
  pulses.fromTo(
    ".ball03, .text02",
    { autoAlpha: 0, scale: 0 },
    {
      autoAlpha: 1,
      scale: 2,
      transformOrigin: "center",
      ease: "elastic(2.5, 1)"
    },
    0.56
  );
  pulses.fromTo(
    ".ball04, .text03",
    { autoAlpha: 0, scale: 0 },
    {
      autoAlpha: 1,
      scale: 2,
      transformOrigin: "center",
      ease: "elastic(2.5, 1)"
    },
    1
  );
  const main = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      scrub: true,
      start: "top center",
      end: "+=300%"
    }
  });
  main.from(".theLine", { drawSVG: 0, duration: 4 }).to(
    ".ball01",
    {
      motionPath: {
        path: ".theLine",
        align: ".theLine",
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1
      },
      duration: 4
    },
    0
  ).add(pulses, 0);
}

// src/utils/contextual.ts
async function Contextual(id) {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: `#${id}`,
    start: "top center",
    end: "bottom center",
    onEnter: (self) => {
      const element = self.trigger;
      element.style.display = "block";
    },
    onLeaveBack: (self) => {
      const element = self.trigger;
      element.style.display = "none";
    }
  });
}

// src/utils/videoScrub.ts
async function videoScrub() {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const vid = document.querySelector(".vid");
  if (!vid)
    return;
  vid.addEventListener("loadedmetadata", () => {
    let scrubbedTime = 0;
    ScrollTrigger.create({
      trigger: vid,
      start: "top top",
      end: `+=${vid.duration * 1500}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        scrubbedTime = vid.duration * self.progress;
      }
    });
    gsap.ticker.add(() => {
      if (!isNaN(scrubbedTime) && vid.readyState >= 2) {
        vid.currentTime += (scrubbedTime - vid.currentTime) * 1;
      }
    });
  });
}

// src/utils/vidOnSnap.ts
async function vidOnSnap() {
  const { gsap } = await import("./chunks/gsap-L2HCQACZ.mjs");
  const { ScrollTrigger } = await import("./chunks/ScrollTrigger-HIJSDX7Q.mjs");
  const vid = document.querySelector(".vid2");
  if (!vid)
    return;
  if (vid.readyState >= 2) {
    initScrub();
  } else {
    vid.addEventListener("loadedmetadata", initScrub, { once: true });
  }
  function initScrub() {
    const scrollDistance = vid.duration * 500;
    ScrollTrigger.create({
      trigger: vid,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: true,
      // Smooth scrubbing
      onUpdate: (self) => {
        if (vid.duration) {
          vid.currentTime = vid.duration * self.progress;
        }
      },
      onRefresh: () => vid.currentTime = 0
      // Reset on resize
    });
    ScrollTrigger.addEventListener("scrollEnd", () => {
      if (ScrollTrigger.isInViewport(vid)) {
        vid.play();
      } else {
        vid.pause();
      }
    });
  }
}

// src/index.ts
threePanelFade("panel-wrapper");
svgScroll("svg_contain");
horizontalScroll("container_horizontal");
Contextual("Contextual");
videoScrub();
vidOnSnap();
//# sourceMappingURL=index.mjs.map
