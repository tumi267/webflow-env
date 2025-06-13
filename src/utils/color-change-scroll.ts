

export async function colorChange(id: string,start:number) {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
     
  const parent = document.getElementById(id);
  const child = parent?.firstElementChild as HTMLElement | null;

  if (!parent || !child) {
    console.warn(`colorChange: Missing parent or child for id "${id}"`);
    return;
  }

  gsap.to(child, {
    scrollTrigger: {
      trigger: parent,
      start: `top ${start}%`,
      end: "bottom top",
      scrub: true,
    },
    backgroundColor: "#4a00e0",
    color: "#ffffff"
  });
}
