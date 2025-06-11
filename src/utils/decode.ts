import { gsap, ScrollTrigger } from '$utils/gsap-core';

const CHARACTERS = "01";

class TextDecoder {
    private originalTexts: string[] = [];
    private textNodes: Text[] = [];
    private target: HTMLElement;

    constructor(target: HTMLElement) {
        this.target = target;
        this.initialize();
    }

    private initialize(): void {
        const walker = document.createTreeWalker(
            this.target,
            NodeFilter.SHOW_TEXT,
            null
        );

        let node: Text | null;
        while (node = walker.nextNode() as Text) {
            if (node.textContent?.trim()) {
                this.textNodes.push(node);
                this.originalTexts.push(node.textContent);
            }
        }

        this.scrambleAll();
    }

    private scrambleAll(): void {
        this.textNodes.forEach((node, index) => {
            const length = this.originalTexts[index].length;
            node.textContent = Array(length).fill(0)
                .map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
                .join('');
        });
    }

    public decode(duration: number = 2): void {
        const obj = { progress: 0 };
        const totalLength = this.originalTexts.reduce((sum, text) => sum + text.length, 0);

        gsap.killTweensOf(obj);
        this.scrambleAll();

        gsap.to(obj, {
            progress: totalLength,
            duration,
            ease: "none",
            onUpdate: () => {
                let remainingChars = Math.floor(obj.progress);
                
                this.textNodes.forEach((node, index) => {
                    const original = this.originalTexts[index];
                    let result = "";
                    const length = original.length;
                    const revealCount = Math.min(remainingChars, length);
                    
                    for (let i = 0; i < length; i++) {
                        if (i < revealCount) {
                            result += original[i];
                        } else {
                            result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                        }
                    }
                    
                    node.textContent = result;
                    remainingChars -= revealCount;
                });
            },
            onComplete: () => {
                this.textNodes.forEach((node, index) => {
                    node.textContent = this.originalTexts[index];
                });
            }
        });
    }
}

export function initDecodeAnimations() {


    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll<HTMLElement>('.decode').forEach(element => {
            const decoder = new TextDecoder(element);
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 90%",
                onEnter: () => decoder.decode(3),
                onEnterBack: () => {
                    decoder.decode(2);
                }
            });
        });
    });
}

// Optional: Direct decode function if you want to trigger manually
export function decodeElement(element: HTMLElement, duration: number = 2) {
    const decoder = new TextDecoder(element);
    decoder.decode(duration);
}