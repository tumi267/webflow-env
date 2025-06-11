
export async function progressBar(id:string){
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
          start: "top 35%",
          end: "top 1%",
          scrub: 3,
        },
        width: "100%"
      });
}