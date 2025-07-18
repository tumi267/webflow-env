export async function initTracking(){
    // Dynamically import GSAP and its plugins
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    const { SplitText } = await import('gsap/SplitText');


    const main = document.querySelectorAll<HTMLElement>(`[data-animation="tracker"]`);
    main.forEach((trackingText)=>{
   
    // Add mousemove effect
    document.addEventListener('mousemove', (e) => {
      // Get mouse position relative to viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY;
    
      // Calculate center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
    
      // Calculate tilt values (adjust sensitivity)
      const tiltX = (mouseY) /10; // Tilt on X-axis based on Y-movement
      const tiltY = (mouseX) /15; // Tilt on Y-axis based on X-movement
    
      // Apply tilt with GSAP
      gsap.to(trackingText, {
        rotationX: tiltX,
        rotationY: tiltY,
        transformPerspective: 1000, // Adds 3D depth
        ease: 'power2.out',
        duration: 0.5
      });
    });
    
    // Reset on mouse leave (optional)
    document.addEventListener('mouseleave', () => {
      gsap.to(trackingText, {
        rotationX: 0,
        rotationY: 0,
        duration: 1
      });
    });
  })
}