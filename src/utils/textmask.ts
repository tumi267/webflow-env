export async function initLineMaskReveal() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { SplitText } = await import('gsap/SplitText');

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="mask"]`);

  elements.forEach((element) => {
    const start = element.dataset.start ?? '0';
    const end = element.dataset.end ?? '100';
    const position = element.dataset.position ?? 'top';
    const positionEnd = element.dataset.positionend ?? 'bottom';
    const mark = element.dataset.mark === 'true';
    const stagger = parseFloat(element.dataset.stagger ?? '0.1');
    const direction = element.dataset.direction ?? 'y'; // 'x' or 'y'
    const maskColor = element.dataset.maskcolor ?? '#000'; // default to black

    // Wrap the element in a container for positioning
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';

    // Move original content inside the wrapper
    const content = element.cloneNode(true) as HTMLElement;
    content.removeAttribute('data-animation');
    element.replaceWith(wrapper);
    wrapper.appendChild(content);

    // Create mask element
    const mask = document.createElement('div');
    mask.classList.add('mask_style');
    wrapper.appendChild(mask);

    // Determine direction-specific transform styles
    const isHorizontal = direction === 'x';

    Object.assign(mask.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: maskColor,
      transformOrigin: 'left bottom' ,
      transform: 'scaleX(1)' ,
      zIndex: '2',
      pointerEvents: 'none'
    });

    // Animate the mask reveal based on direction
    gsap.to(mask, {
      ...(isHorizontal ? { scaleX: 0 } : { scaleY: 0 }),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapper,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark
      }
    });
  });
  ScrollTrigger.refresh();
}
