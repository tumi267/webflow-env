export async function svgScroll(
  id: string,
  start: number,
  position: "top" | "center" | "bottom" = "top",
  mainline: string,
  mainChar: string,
  pluse:string,
  pluseTiming:number,
  mark: boolean
): Promise<void> {
  // Dynamically import GSAP and plugins
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin');
  const { MotionPathPlugin } = await import('gsap/MotionPathPlugin');

  // Register plugins
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

  const parent = document.getElementById(id);
  if (!parent) {
    console.warn(`SVGScroll: Element with ID "${id}" not found`);
    return;
  }

  // Get all elements with class attributes
  const elements = Array.from(parent.querySelectorAll<HTMLElement>('*[class]'));
  const classList = new Set<string>();
  
  // Extract all unique classes
  elements.forEach(element => {
    element.classList.forEach(className => {
      if (className.trim()) classList.add(className.trim());
    });
  });

  // Find main elements
  const mainLine = parent.querySelector(mainline) as SVGPathElement | null;
  const mainCharacter = parent.querySelector(mainChar) as SVGCircleElement | null;

  // Validate required elements
  if (!mainLine) {
    console.warn(`SVGScroll: Main line element (${mainline}) not found`);
    return;
  }
  
  if (!mainCharacter) {
    console.warn(`SVGScroll: Main character element (${mainChar}) not found`);
    return;
  }

  // Set initial character position
  gsap.set(mainCharacter, { x: -5, y: 0, autoAlpha: 1 });

  // Dynamic pulse animation setup
  const pulses = gsap.timeline();
  
  // Find all ball and text elements (excluding the main character)
  const pulseElements = elements.filter(el => {
    const isBall = el.classList.toString().includes(`${pluse}`) && !el.classList.contains(mainChar.replace('.', ''));
    const isText = el.classList.toString().includes('text');
    return isBall || isText;
  });

  // Sort elements by their numeric suffix if present
  pulseElements.sort((a, b) => {
    // Helper function to extract trailing numbers
    const getTrailingNumber = (element: HTMLElement): number => {
      // Get all class names as a single string
      const classString = Array.from(element.classList).join(' ');
      
      // Find the last sequence of digits in the class string
      const match = classString.match(/(\d+)(?!.*\d)/);
      
      // Return the number if found, otherwise Infinity (puts elements without numbers at the end)
      return match ? parseInt(match[1], 10) : Infinity;
    };
  
    const aNum = getTrailingNumber(a);
    const bNum = getTrailingNumber(b);
    
    // Secondary sort by original DOM position if numbers are equal
    if (aNum === bNum) {
      return Array.from(a.parentNode?.children || []).indexOf(a) - 
             Array.from(b.parentNode?.children || []).indexOf(b);
    }
    
    return aNum - bNum;
  });

  // Create staggered pulse animations
  pulseElements.forEach((element, index) => {
    const delay = 0.2 + (index * pluseTiming); // Staggered delay
    pulses.fromTo(
      element,
      { autoAlpha: 0, scale: 0 },
      {
        autoAlpha: 1,
        scale: 2,
        transformOrigin: 'center',
        ease: 'elastic(2.5, 1)',
        duration: 0.8
      },
      delay
    );
  });

  // Main animation with ScrollTrigger
  const main = gsap.timeline({
    scrollTrigger: {
      trigger: `#${id}`,
      scrub: true,
      start: `${position} ${start}`,
      end: '+=300%',
      markers: mark,
    },
  });

  main
    .from(mainLine, { drawSVG: 0, duration: 4 })
    .to(
      mainCharacter,
      {
        motionPath: {
          path: mainLine,
          align: mainLine,
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