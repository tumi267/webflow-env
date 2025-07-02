export async function gallery() {
  try {
    const [gsap, ScrollTrigger, SplitText] = await Promise.all([
      import("gsap").then((m) => m.gsap),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
      import("gsap/SplitText").then((m) => m.SplitText),
    ]);

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const parent = document.querySelectorAll<HTMLElement>(`[data-animation="gallery"]`);

    parent.forEach((el) => {
      // Parse dataset values with fallbacks
      const start = el.dataset.start ?? '50';
      const end = el.dataset.end ?? '50';
      const position = el.dataset.position ?? 'top';
      const positionEnd = el.dataset.positionend ?? 'bottom';
      const mark = el.dataset.mark === 'true';
      const effectStart = el.dataset.effectstart ?? '50';
      const effectEnd = el.dataset.effectend ?? '50';
      const effectMark = el.dataset.effectmark === 'true';
      const staggerX = el.dataset.stagger ?? '50';
      const staggerY = el.dataset.stagger ?? '-300';
      const fadeSpeed = parseFloat(el.dataset.fade ?? '1');
      const effectSpeed = parseFloat(el.dataset.speed ?? '1');

      const layers = Array.from(el.children) as HTMLElement[];
      const total = layers.length;

      // 🔐 Pin the gallery section
      ScrollTrigger.create({
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        pin: true,
        markers: mark,
      });

      const unit = 100 / total;

      layers.forEach((layer, i) => {
        const isEven = i % 2 === 0;
        const fromX = isEven ? -50 : 50;
        const exitX = isEven ? -10 : 10;
        const progress = i / (total - 1 || 1);
        const z = total - i;

        const viewportHeight = window.innerHeight;
        const elHeight = layer.getBoundingClientRect().height;
        const verticalOffset = (viewportHeight - elHeight) / 2;

        gsap.set(layer, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          y: verticalOffset,
          zIndex: z,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: `top+=${i * unit}% ${effectStart}%`,
            end: `top+=${i * unit}% ${effectEnd}%`,
            scrub: true,
            markers: effectMark,
          },
        });

        tl.fromTo(
          layer,
          {
            opacity: 0,
            scale: 1,
            xPercent: fromX,
          },
          {
            opacity: 1,
            scale: 1.2,
            xPercent: 0,
            ease: "none",
            duration: 1 * effectSpeed,
          }
        ).to(layer, {
          opacity: 0,
          scale: 1.4,
          yPercent: staggerY,
          xPercent: exitX,
          ease: "none",
          duration: 1 * fadeSpeed,
        });
      });
    });
    ScrollTrigger.refresh();
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}
