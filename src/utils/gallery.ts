export async function gallery(
    id: string,
    start: number,
    end: number,
    position: "top" | "center" | "bottom" = "top",
    positionEnd: "top" | "center" | "bottom" = "bottom",
    effectStart: number,
    effectEnd: number,
    mark: boolean
  ) {
    try {
      const [gsap, ScrollTrigger, SplitText] = await Promise.all([
        import("gsap").then((m) => m.gsap),
        import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
        import("gsap/SplitText").then((m) => m.SplitText),
      ]);
  
      gsap.registerPlugin(ScrollTrigger, SplitText);
  
      const parent = document.getElementById(id);
      if (!parent) {
        console.warn(`Element with ID "${id}" not found`);
        return;
      }
  
      const layers = Array.from(parent.children) as HTMLElement[];
      const total = layers.length;
  
      // 🔐 Pin the gallery section
      ScrollTrigger.create({
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        pin: true,
        markers: mark,
      });
  
      const unit = 100 / total;
  
      layers.forEach((el, i) => {
        const isEven = i % 2 === 0;
        const fromX = isEven ? -50 : 50;
        const exitX = isEven ? -10 : 10;
        const progress = i / (total - 1 || 1);
        const yOffset = -40;
        const z = total - i;
  
        const viewportHeight = window.innerHeight;
        const elHeight = el.getBoundingClientRect().height;
        const verticalOffset = (viewportHeight - elHeight) / 2;
  
        gsap.set(el, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          y: verticalOffset,
          zIndex: z,
        });
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: parent,
            start: `top+=${i * unit}% ${effectStart}%`,
            end: `top+=${(i + 1) * unit}% ${effectEnd}%`,
            scrub: true,
            markers: mark,
          },
        });
  
        tl.fromTo(
          el,
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
          }
        ).to(el, {
          opacity: 0,
          scale: 1.4,
          yPercent: yOffset,
          xPercent: exitX,
          ease: "none",
        });
      });
    } catch (error) {
      console.error("Animation initialization failed:", error);
    }
  }
  