export async function zoom (id:string,start:Number,
  end:number,
  amount:number,
  position:"top" | "center" | "bottom" = "top" ,
  positionEnd:"top" | "center" | "bottom" = "top",
  mark:boolean){
    // Dynamically import GSAP and its plugins
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');
    gsap.registerPlugin(ScrollTrigger,SplitText)
    const parent = document.getElementById(id);
    if (!parent) return;
    const children = parent.querySelectorAll<HTMLElement>('*');
    gsap.fromTo(children,
    {
      scale: 1
    },
    {
      scale: amount,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parent,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}%`,
        scrub: 0.5,
        markers:mark
      }
    }
  );
}