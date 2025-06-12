export async function initLineMaskReveal(selector = '.line_amination_mask') {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { SplitText } = await import('gsap/SplitText');

  gsap.registerPlugin(ScrollTrigger, SplitText);


    // Split text into lines
    const split = SplitText.create(selector, {
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
        trigger: selector,
        start: 'top 60%',
        end: 'bottom 20%',
        scrub: true
      }
    });


}
