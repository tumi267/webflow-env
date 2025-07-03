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
    const direction = element.dataset.direction ?? 'x'; // 'x' or 'y'
    const maskColor = element.dataset.maskcolor ?? '#000';

    // Wrap the element in a container
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';

    // Move content into wrapper
    const content = element.cloneNode(true) as HTMLElement;
    content.removeAttribute('data-animation');
    element.replaceWith(wrapper);
    wrapper.appendChild(content);

    // Create the mask
    const mask = document.createElement('div');
    mask.classList.add('mask_style');
    wrapper.appendChild(mask);

    // Determine direction and set styles
    const isHorizontal = direction === 'x';

    Object.assign(mask.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: maskColor,
      transformOrigin: 'center center', // ✅ center reveal
      transform: isHorizontal ? 'scaleX(1)' : 'scaleY(1)',
      zIndex: '2',
      pointerEvents: 'none'
    });

    // Animate mask scaling away from center
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
