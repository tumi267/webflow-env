export async function gallery2(
  id: string,
  start: number,
  end: number,
  position: "top" | "center" | "bottom" | string = "top",
  positionEnd: "top" | "center" | "bottom" | string = "top",
  effectStart: number,
  effectEnd: number,
  effposition: "top" | "center" | "bottom" | string = "top",
  effpositionEnd: "top" | "center" | "bottom" | string = "top",
  overlapRatio: number = 0.33, // 33.3% overlap by default
  mark: boolean = false,
  markcontatin:boolean=false
) {
  try {
    const [gsap, ScrollTrigger] = await Promise.all([
      import("gsap").then((m) => m.gsap),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
    ]);

    gsap.registerPlugin(ScrollTrigger);

    const parent = document.getElementById(id);
    if (!parent) {
      console.warn(`Element with ID "${id}" not found`);
      return;
    }

    const layers = Array.from(parent.children) as HTMLElement[];
    const total = layers.length;

    // Pin the gallery container during scroll
    ScrollTrigger.create({
      trigger: parent,
      start: `${position} ${start}%`,
      end: `${positionEnd} ${end}%`,
      scrub: true,
      pin: true,
      markers: markcontatin,
    });

    // Calculate scroll units per child and overlap offset
    const unit = 100 / total;
    const overlapOffset = unit * overlapRatio;

    layers.forEach((el, i) => {
      // Keep side (left or right) fixed for each child
      const sideXPercent = i % 2 === 0 ? -30 : 30;
      const z = 100 - i;

      // Vertically center children without touching CSS
      const vh = window.innerHeight;
      const h = el.getBoundingClientRect().height;
      const yOffset = (vh - h) / 2;

      gsap.set(el, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        y: yOffset,
        zIndex: z,
        xPercent: sideXPercent, // Set fixed horizontal start position
      });

      // ScrollTrigger stagger positions
      const sectionStart = `${effposition}+=${i * overlapOffset}% ${effectStart}%`;
      const sectionEnd = `${effpositionEnd}+=${(i + 1) * overlapOffset}% ${effectEnd}%`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: sectionStart,
          end: sectionEnd,
          scrub: true,
          markers: mark,
        },
      });

      // Animate opacity and scale only — no horizontal movement
      tl.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.1,
          yPercent: 0,
          // xPercent is fixed by gsap.set above
        },
        {
          opacity: 1,
          scale: 0.5,
          ease: "power2.out",
          duration: 0.4,
          // xPercent stays fixed here
        }
      );

      tl.to(
        el,
        {
          opacity: 0,
          scale: 1,
          yPercent: -30,
          ease: "power1.inOut",
          duration: 0.2,
          // xPercent stays fixed here too
        },
        ">0"
      );
    });
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}

  