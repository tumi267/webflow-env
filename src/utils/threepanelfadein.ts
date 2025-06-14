export async function threePanelFade(id: string,start:number,mark:boolean) {
        // Dynamically import GSAP and its plugins
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
    
    const wrapper = document.getElementById(id);
    if (!wrapper) {
        console.warn(`Wrapper element not found: ${id}`);
        return;
    }

    // Get all direct children (regardless of their tag or class)
    const children = Array.from(wrapper.children);
    if (children.length === 0) {
        console.warn('No child elements found in wrapper');
        return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: `top ${start}%`,
            end: `+=${children.length * 100}%`,
            scrub: true,
            pin: true,
            markers:mark?true:false,
        }
    });

    // Animation patterns (bottom → left → right → repeat)
    const animations = [
        { y: 200, opacity: 0 }, // bottom
        { x: -200, opacity: 0 }, // left
        { x: 200, opacity: 0 }   // right
    ];

    children.forEach((child, index) => {
        const animationType = animations[index % animations.length];
        tl.from(child, {
            ...animationType,
            duration: 0.5,
            ease: "power2.out"
        }, index * 0.1); // slight stagger
    });

    // Optional: Return cleanup function for frameworks
    return () => ScrollTrigger.getAll().forEach(st => st.kill());
}