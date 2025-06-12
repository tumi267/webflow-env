export async function svgScroll(id: string,start:number,mark:boolean): Promise<void> {
  // Dynamically import GSAP and plugins
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin');
  const { MotionPathPlugin } = await import('gsap/MotionPathPlugin');

  // Register plugins
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

  gsap.set('.ball01', { x: -5, y: 0, autoAlpha: 1 });

  // Pulses animation
  const pulses = gsap.timeline();
  pulses.fromTo(
    '.ball02, .text01',
    { autoAlpha: 0, scale: 0 },
    {
      autoAlpha: 1,
      scale: 2,
      transformOrigin: 'center',
      ease: 'elastic(2.5, 1)',
    },
    0.2
  );
  pulses.fromTo(
    '.ball03, .text02',
    { autoAlpha: 0, scale: 0 },
    {
      autoAlpha: 1,
      scale: 2,
      transformOrigin: 'center',
      ease: 'elastic(2.5, 1)',
    },
    0.56
  );
  pulses.fromTo(
    '.ball04, .text03',
    { autoAlpha: 0, scale: 0 },
    {
      autoAlpha: 1,
      scale: 2,
      transformOrigin: 'center',
      ease: 'elastic(2.5, 1)',
    },
    1
  );

  // Main animation with ScrollTrigger
  const main = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      scrub: true,
      start: `top ${start}`,
      end: '+=300%',
      markers:mark?true:false,
    },
  });

  main
    .from('.theLine', { drawSVG: 0, duration: 4 })
    .to(
      '.ball01',
      {
        motionPath: {
          path: '.theLine',
          align: '.theLine',
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        duration: 4,
      },
      0
    )
    .add(pulses, 0);
}
