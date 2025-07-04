export async function initLineMaskReveal() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll<HTMLElement>(`[data-animation="mask"]`);

  elements.forEach((element, index) => {
    const start = element.dataset.start ?? '0';
    const end = element.dataset.end ?? '100';
    const position = element.dataset.position ?? 'top';
    const positionEnd = element.dataset.positionend ?? 'bottom';
    const mark = element.dataset.mark === 'true';
    const maskColor = element.dataset.maskcolor ?? '#000';

    // Create a wrapper around the element
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.width = '100%';

    // Clone content inside wrapper
    const content = element.cloneNode(true) as HTMLElement;
    content.removeAttribute('data-animation');
    element.replaceWith(wrapper);
    wrapper.appendChild(content);

    // Create top and bottom masks
    const maskTop = document.createElement('div');
    const maskBottom = document.createElement('div');

    // Common mask styles
    [maskTop, maskBottom].forEach(mask => {
      Object.assign(mask.style, {
        position: 'absolute',
        width: '100%',
        height: '50%',
        backgroundColor: maskColor,
        left: '0',
        zIndex: '2',
        pointerEvents: 'none',
        transition: 'none'
      });
    });

    // Position them
    maskTop.style.top = '0';
    maskBottom.style.bottom = '0';

    wrapper.appendChild(maskTop);
    wrapper.appendChild(maskBottom);

    // Animate them on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: true,
        markers: mark,
        id: `mask-split-${index + 1}`,
      },
    });

    tl.to(maskTop, {
      yPercent: -101,
      ease: 'power2.out',
    }, 0);

    tl.to(maskBottom, {
      yPercent: 101,
      ease: 'power2.out',
    }, 0);
  });

  ScrollTrigger.refresh();
}
