export async function slideshow(
    id: string,
    mark: boolean = false
  ) {
    try {
      const [gsap] = await Promise.all([
        import("gsap").then((m) => m.gsap),
      ]);
  
      const container = document.getElementById(id);
      if (!container) {
        console.warn(`Container with id "${id}" not found`);
        return;
      }
  
      const slides = Array.from(container.children) as HTMLElement[];
      if (slides.length === 0) {
        console.warn("No slides found inside container");
        return;
      }
  
      let currentIndex = 0;
      const total = slides.length;
  
      // Init slides: all offscreen right + hidden except first
      gsap.set(slides, { xPercent: 100, autoAlpha: 0 });
      gsap.set(slides[0], { xPercent: 0, autoAlpha: 1 });
  
      function showSlide(newIndex: number, direction: 1 | -1) {
        if (newIndex === currentIndex) return;
  
        const currentSlide = slides[currentIndex];
        const nextSlide = slides[newIndex];
  
        gsap.to(currentSlide, {
          duration: 0.5,
          xPercent: -100 * direction,
          autoAlpha: 0,
          ease: "power1.inOut",
        });
  
        gsap.fromTo(
          nextSlide,
          { xPercent: 100 * direction, autoAlpha: 0 },
          {
            duration: 0.5,
            xPercent: 0,
            autoAlpha: 1,
            ease: "power1.inOut",
          }
        );
  
        currentIndex = newIndex;
      }
  
      return {
        next() {
          showSlide((currentIndex + 1) % total, 1);
        },
        prev() {
          showSlide((currentIndex - 1 + total) % total, -1);
        },
        goTo(index: number) {
          if (index < 0 || index >= total) {
            console.warn("Slide index out of range");
            return;
          }
          const direction = index > currentIndex ? 1 : -1;
          showSlide(index, direction);
        },
        getCurrentIndex() {
          return currentIndex;
        },
      };
    } catch (error) {
      console.error("GSAP slideshow init error:", error);
    }
  }
  