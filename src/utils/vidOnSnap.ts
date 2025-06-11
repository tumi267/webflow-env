import { gsap, ScrollTrigger } from '$utils/gsap-core';


export function vidOnSnap() {
  const vid = document.querySelector(".vid2") as HTMLVideoElement;
  if (!vid) return;

  // Ensure video is ready
  if (vid.readyState >= 2) { // HAVE_CURRENT_DATA
    initScrub();
  } else {
    vid.addEventListener("loadedmetadata", initScrub, { once: true });
  }

  function initScrub() {
    // Calculate scroll distance (adjust multiplier as needed)
    const scrollDistance = vid.duration * 500; // 500px per second
    
    ScrollTrigger.create({
      trigger: vid,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: true, // Smooth scrubbing
     
      onUpdate: (self) => {
        if (vid.duration) {
          // Directly set currentTime for immediate scrubbing
          vid.currentTime = vid.duration * self.progress;
        }
      },
      onRefresh: () => vid.currentTime = 0 // Reset on resize
    });

    // Optional: Play/pause based on visibility
    ScrollTrigger.addEventListener("scrollEnd", () => {
      if (ScrollTrigger.isInViewport(vid)) {
        vid.play();
      } else {
        vid.pause();
      }
    });
  }
}
