import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function videoScrub() {
  const vid = document.querySelector(".vid") as HTMLVideoElement;
  if (!vid) return;

  vid.addEventListener("loadedmetadata", () => {
    let scrubbedTime = 0;

    ScrollTrigger.create({
      trigger: vid,
      start: "top top",
      end: `+=${vid.duration * 1500}`,
      pin: true,
      scrub: true,
      
      onUpdate: (self) => {
        scrubbedTime = vid.duration * self.progress;
      },
    });

    gsap.ticker.add(() => {
      if (!isNaN(scrubbedTime) && vid.readyState >= 2) {
        vid.currentTime += (scrubbedTime - vid.currentTime) * 1;
      }
    });
  });
}
