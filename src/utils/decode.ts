const CHARACTERS = "01";

class TextDecoder {
  private originals: string[] = [];
  private nodes: Text[] = [];

  constructor(private el: HTMLElement, private gsap: any) {
    this.init();
  }

  private init() {
    const walker = document.createTreeWalker(this.el, NodeFilter.SHOW_TEXT, null);
    let node: Text | null;

    while ((node = walker.nextNode() as Text)) {
      if (node.textContent?.trim()) {
        this.nodes.push(node);
        this.originals.push(node.textContent);
      }
    }

    this.scramble();
  }

  public scramble() {
    this.nodes.forEach((node, i) => {
      const len = this.originals[i].length;
      node.textContent = Array.from({ length: len }, () =>
        CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
      ).join("");
    });
  }

  public decode(duration = 2) {
    const obj = { progress: 0 };
    const total = this.originals.reduce((sum, text) => sum + text.length, 0);

    this.gsap.killTweensOf(obj);
    this.scramble();

    this.gsap.to(obj, {
      progress: total,
      duration,
      ease: "none",
      onUpdate: () => {
        let remaining = Math.floor(obj.progress);

        this.nodes.forEach((node, i) => {
          const original = this.originals[i];
          const len = original.length;
          const revealed = Math.min(remaining, len);

          node.textContent =
            original.slice(0, revealed) +
            Array.from({ length: len - revealed }, () =>
              CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
            ).join("");

          remaining -= revealed;
        });
      },
      onComplete: () => {
        this.nodes.forEach((node, i) => {
          node.textContent = this.originals[i];
        });
      }
    });
  }
}

export async function initDecodeAnimations(id:string,
  start:number,
  end:number,
  position:"top" | "center" | "bottom" = "top" ,
  positionEnd:"top" | "center" | "bottom" = "top",
  mark:boolean) {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  
    function init() {
      document.querySelectorAll<HTMLElement>(`#${id}`).forEach(el => {
        const decoder = new TextDecoder(el, gsap);
  
        ScrollTrigger.create({
          trigger: el,
          start: `${position} ${start}%`,
          end:`${positionEnd} ${end}%`,
          onEnter: () => decoder.decode(3),
          onEnterBack: () => decoder.decode(2),
          onLeave: () => decoder.scramble(),      // Encode again when leaving downward
          onLeaveBack: () => decoder.scramble(), 
          markers:mark, // Encode again when leaving upward
        });
      });
    }
  }