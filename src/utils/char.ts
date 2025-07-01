export async function initCharAnimations() {
    try {
      // Dynamic imports with error handling
      const [gsap, ScrollTrigger, SplitText] = await Promise.all([
        import('gsap').then(m => m.gsap),
        import('gsap/ScrollTrigger').then(m => m.ScrollTrigger),
        import('gsap/SplitText').then(m => m.SplitText)
      ]);
  
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const main = document.querySelectorAll<HTMLElement>(`[data-animation="char"]`);

      if (main) {
        const style = document.createElement('style');
        style.id = 'char-animation-style';
        style.textContent = `
          [data-animation="char"] {
            word-break: break-word;
            overflow-wrap: break-word;
          }
          [data-animation="char"] .char {
            display: inline-block;
            word-break: break-word;
          }
        `;
        document.head.appendChild(style);
      }
      main.forEach((el)=>{
        // Parse dataset values with fallbacks
        const start = el.dataset.start ?? '0';
        const end = el.dataset.end ?? '100';
        const position = el.dataset.position ?? 'top';
        const positionEnd = el.dataset.positionend ?? 'bottom';
        const mark = el.dataset.mark === 'true';
        const y = el.dataset.y ?? '100';
        const x = el.dataset.x ?? '0';
        const duration = parseFloat(el.dataset.duration ?? '0.5');
        const stagger = parseFloat(el.dataset.stagger ?? '0.001');

        const split = new SplitText(el, { 
          type: 'chars',
          charsClass: `char-${el}` // Unique class for each instance
        });
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: `${position} ${start}%`,
            end: `${positionEnd} ${end}%`,
            scrub: true,
            markers:mark
          }
        });
  
        tl.from(split.chars, {
          // autoAlpha: 0,
          opacity:0,
          y: y ,     // use a visible offset
          x: x ,
          stagger: stagger,
          ease: 'power2.out',
          duration: duration,
          immediateRender: true
        });
      })
  
    } catch (error) {
      console.error('Animation initialization failed:', error);
    }
  }