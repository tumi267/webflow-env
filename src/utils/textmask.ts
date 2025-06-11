export async function initMaskAnimation() {
      // Dynamically import GSAP and its plugins
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { SplitText } = await import('gsap/SplitText');
      gsap.registerPlugin(ScrollTrigger);
    document.addEventListener('DOMContentLoaded', () => {

        let char=SplitText.create(".headline",{
            type:'chars'
        });

        let word=SplitText.create('.sub_headline',{
            type:'words'
        })

        let line=SplitText.create('.line_amination',{
            type:'lines'
        })

        SplitText.create(".line_amination_mask", {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            aria: "hidden",
            mask: "lines",
            onSplit: (self) => {
              gsap.from(self.words, {
                opacity: 0,
                
                duration: 5, // duration is still needed but less important with scrub
                ease: "none", // disable easing for scrubbed animations
                stagger: 0.1,
                scrollTrigger: {
                  trigger: ".line_amination_mask",
                  start: "top 80%",              // adjust as needed
                  end: "bottom 100%",             // must define an end for scrubbing
                  scrub: true,                   // 👈 THIS makes the scroll control the animation
                
                }
              });
            }
          });
          
        
        let tl=gsap.timeline({defaults:{duration:1,autoAlpha:0,y:-100}})
        
        tl.from(char.chars,{stagger:0.05})
            .from(word.words,{y: -100,
                opacity: 0,
                rotation: "random(-80, 80)",
                duration: 0.7, 
                ease: "back",
                stagger: 0.15})
            // Cleanup function for resize events
            const onResize = () => line.revert();
            window.addEventListener('resize', onResize);

            // Optional: Add cleanup when component unmounts
            // (if using in a framework like React/Vue)
            return () => {
                window.removeEventListener('resize', onResize);
                line.revert();
            };
        })};