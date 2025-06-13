


export async function Contextual(id: string,start:number,mark:Boolean) {
        // Dynamically import GSAP and its plugins
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
        trigger: `#${id}`,
        start: `top ${start}%`,
        end: "bottom top",
        markers:mark?true:false,
        onEnter: (self) => {
            // Only affect the triggering element
            const element = self.trigger as HTMLElement;
            element.style.display = 'block';
        },
        onLeaveBack: (self) => {
            // Only affect the triggering element
            const element = self.trigger as HTMLElement;
            element.style.display = 'none';
        }
    });
}