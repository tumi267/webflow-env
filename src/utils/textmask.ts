export async function initLineMaskReveal(id:string,start:number,mark:boolean) {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { SplitText } = await import('gsap/SplitText');

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const element = document.querySelector(`#${id}`);
  if (!element) {
    console.warn(`Element not found for selector: ${id}`);
    return;
  }
    // Split text into lines
    const split = SplitText.create(element, {
      type: 'lines',
      linesClass: 'line'
    });

    // Use GSAP to hide and position lines off-screen initially
    gsap.set(split.lines, {
      yPercent: 100,
      opacity: 0
    });

    // Animate each line upwards into view as user scrolls
    gsap.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: element,
        start: `top ${start}%`,
        end: 'bottom 20%',
        scrub: true,
        markers:mark,
      }
    });
}
