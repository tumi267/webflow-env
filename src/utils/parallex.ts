export async function parellex(
    id: string,
    start: number,
    position: "top" | "center" | "bottom" | string = "top",
    animi1x: number,
    animi1y: number,
    animi1dur: number,
    animi2x: number,
    animi2y: number,
    animi2dur: number,
    animi3x: number,
    animi3y: number,
    animi3dur: number,
    mark: boolean
  ) {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
  
    const container = document.getElementById(id);
    if (!container) return;
  
    const children = Array.from(container.children);
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
      trigger: container,
      start: `${position} ${start}%`,
      end: "+=1000",
      scrub: true,
      pin: true,
 
      markers: mark
    });
  }
  