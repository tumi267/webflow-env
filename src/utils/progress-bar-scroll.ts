
export async function progressBar(id:string,start:number){
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

  const parent = document.getElementById(id);
  if (!parent) return;

  const children = parent.querySelectorAll<HTMLElement>('*'); // Direct children only

  if (!children.length) return;
    gsap.to(children, {
        scrollTrigger: {
          trigger: `#${id}`,
          start: `top ${start}%`,
          end: "top top",
          scrub: 3,
       
        },
        width: "100%"
      });
}