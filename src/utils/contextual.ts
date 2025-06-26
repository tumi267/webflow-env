export async function Contextual(id: string) {
        // Dynamically import GSAP and its plugins
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsap.registerPlugin(ScrollTrigger)
        const elements = document.querySelectorAll<HTMLElement>(`[data-animation="popup"]`);
        const cleanups: (() => void)[] = [];
      
        elements.forEach((el) => {
        // Parse dataset values with fallbacks
        const start = el.dataset.start ?? '0';
        const end = el.dataset.end ?? '100';
        const position = el.dataset.position ?? 'top';
        const positionEnd = el.dataset.positionend ?? 'bottom';
        const mark = el.dataset.mark === 'true';

    ScrollTrigger.create({
        trigger: el,
        start: `${position} ${start}%`,
        end: `${positionEnd} ${end}`,
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
})
}