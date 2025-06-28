export async function gallery2() {
  try {
    const [gsap, ScrollTrigger] = await Promise.all([
      import("gsap").then((m) => m.gsap),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
    ]);

    gsap.registerPlugin(ScrollTrigger);

    const parents = document.querySelectorAll<HTMLElement>('[data-animation="gallery2"]');

    parents.forEach((parent) => {
      // Parse values from dataset
      const start = parseFloat(parent.dataset.start ?? '0');
      const end = parseFloat(parent.dataset.end ?? '100');
      const position = parent.dataset.position ?? 'top';
      const positionEnd = parent.dataset.positionend ?? 'bottom';

      const effectStart = parseFloat(parent.dataset.effectstart ?? '50');
      const effectEnd = parseFloat(parent.dataset.effectend ?? '50');
      const effposition = parent.dataset.effposition ?? 'top';
      const effpositionEnd = parent.dataset.effpositionend ?? 'bottom';
      const y=parent.dataset.y??'-300'
      const overlapRatio = parseFloat(parent.dataset.overlap ?? '0.33');
      const mark = parent.dataset.mark === 'true';
      const markContainer = parent.dataset.markcontainer === 'true';

      const layers = Array.from(parent.children) as HTMLElement[];
      const total = layers.length;

      // Create pin ScrollTrigger for the container
      ScrollTrigger.create({
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        pin: true,
        markers: markContainer,
      });

      const unit = 100 / total;
      const overlapOffset = unit * overlapRatio;

      layers.forEach((el, i) => {
        const sideXPercent = i % 2 === 0 ? -30 : 30;
        const z = 100 - i;

        // Slide-specific fade/speed values
        const fadeSpeed = parseFloat(el.dataset.fade ?? '1');
        const effectSpeed = parseFloat(el.dataset.speed ?? '1');

        const vh = window.innerHeight;
        const h = el.getBoundingClientRect().height;
        const rawY = y;


        const yOffset = rawY !== undefined ? parseFloat(rawY) : (vh - h) / 2;
        gsap.set(el, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          y: yOffset,
          zIndex: z,
          xPercent: sideXPercent,
        });

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

        tl.fromTo(
          el,
          {
            opacity: 0,
            scale: 0.1,
            yPercent: 0,
          },
          {
            opacity: 1,
            scale: 0.5,
            ease: "power2.out",
            duration: 0.4 * effectSpeed,
          }
        );

        tl.to(
          el,
          {
            opacity: 0,
            scale: 1,
            yPercent: -30,
            ease: "power1.inOut",
            duration: 0.2 * fadeSpeed,
          },
          ">0"
        );
      });
    });
  } catch (error) {
    console.error("Animation initialization failed:", error);
  }
}
