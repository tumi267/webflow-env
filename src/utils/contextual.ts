import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contextual(id: string) {
    ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
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