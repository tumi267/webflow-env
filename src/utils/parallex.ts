export async function parellex(id: string) {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
  

    const elements = document.querySelectorAll<HTMLElement>(`[data-animation="perallex"]`);
    const cleanups: (() => void)[] = [];
  
    elements.forEach((el) => {
    // Parse dataset values with fallbacks
    const start = el.dataset.start ?? '0';

    const position = el.dataset.position ?? 'top';

    const mark = el.dataset.mark === 'true';
    const animi1x = el.dataset.animi1x ?? '100';
    const animi1y = el.dataset.animi1y ?? '0';
    const animi1dur = el.dataset.animi1dur ?? '3';
    const animi2x = el.dataset.animi2x ?? '-100';
    const animi2y = el.dataset.animi2y ?? '-200';
    const animi2dur = el.dataset.animi2dur ?? '2.5';
    const animi3x = el.dataset.animi3x ?? '50';
    const animi3y = el.dataset.animi3y ?? '-200';
    const animi3dur = el.dataset.animi3dur ?? '2';
    const children = Array.from(el.children);
    if (children.length < 3) {
      console.warn(`Container "${id}" must have at least 3 children`);
      return;
    }
  
    let tl = gsap.timeline();
  
    tl.to(children[0], { x: animi1x, y: animi1y, duration: animi1dur }, 0)
      .to(children[1], { x: animi2x, y: animi2y, duration: animi2dur }, 0)
      .to(children[2], { x: animi3x, y: animi3y, duration: animi3dur }, 0);
  
    ScrollTrigger.create({
      animation: tl,
      trigger: el,
      start: `${position} ${start}%`,
      end: `${el.scrollHeight*1.5}px`,
      scrub: true,
      pin: true,
      pinSpacing:false,
      markers: mark
    });
  })
  }
  