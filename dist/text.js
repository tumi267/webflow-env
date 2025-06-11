import {
  ScrollTrigger,
  gsapWithCSS
} from "./chunk-BVJFHCJQ.js";
import "./chunk-JCVR2ZN6.js";

// src/utils/decode.ts
var CHARACTERS = "01";
var TextDecoder = class {
  originalTexts = [];
  textNodes = [];
  target;
  constructor(target) {
    this.target = target;
    this.initialize();
  }
  initialize() {
    const walker = document.createTreeWalker(
      this.target,
      NodeFilter.SHOW_TEXT,
      null
    );
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent?.trim()) {
        this.textNodes.push(node);
        this.originalTexts.push(node.textContent);
      }
    }
    this.scrambleAll();
  }
  scrambleAll() {
    this.textNodes.forEach((node, index) => {
      const length = this.originalTexts[index].length;
      node.textContent = Array(length).fill(0).map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join("");
    });
  }
  decode(duration = 2) {
    const obj = { progress: 0 };
    const totalLength = this.originalTexts.reduce((sum, text) => sum + text.length, 0);
    gsapWithCSS.killTweensOf(obj);
    this.scrambleAll();
    gsapWithCSS.to(obj, {
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
};
function initDecodeAnimations() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".decode").forEach((element) => {
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

// node_modules/gsap/SplitText.js
var gsap;
var _fonts;
var _coreInitted;
var _initIfNecessary = () => _coreInitted || SplitText.register(window.gsap);
var _charSegmenter = typeof Intl !== "undefined" ? new Intl.Segmenter() : 0;
var _toArray = (r) => typeof r === "string" ? _toArray(document.querySelectorAll(r)) : "length" in r ? Array.from(r) : [r];
var _elements = (targets) => _toArray(targets).filter((e) => e instanceof HTMLElement);
var _emptyArray = [];
var _context = function() {
};
var _spacesRegEx = /\s+/g;
var _emojiSafeRegEx = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu");
var _emptyBounds = { left: 0, top: 0, width: 0, height: 0 };
var _stretchToFitSpecialChars = (collection, specialCharsRegEx) => {
  if (specialCharsRegEx) {
    let charsFound = new Set(collection.join("").match(specialCharsRegEx) || _emptyArray), i = collection.length, slots, word, char, combined;
    if (charsFound.size) {
      while (--i > -1) {
        word = collection[i];
        for (char of charsFound) {
          if (char.startsWith(word) && char.length > word.length) {
            slots = 0;
            combined = word;
            while (char.startsWith(combined += collection[i + ++slots]) && combined.length < char.length) {
            }
            if (slots && combined.length === char.length) {
              collection[i] = char;
              collection.splice(i + 1, slots);
              break;
            }
          }
        }
      }
    }
  }
  return collection;
};
var _disallowInline = (element) => window.getComputedStyle(element).display === "inline" && (element.style.display = "inline-block");
var _insertNodeBefore = (newChild, parent, existingChild) => parent.insertBefore(typeof newChild === "string" ? document.createTextNode(newChild) : newChild, existingChild);
var _getWrapper = (type, config, collection) => {
  let className = config[type + "sClass"] || "", { tag = "div", aria = "auto", propIndex = false } = config, display = type === "line" ? "block" : "inline-block", incrementClass = className.indexOf("++") > -1, wrapper = (text) => {
    let el = document.createElement(tag), i = collection.length + 1;
    className && (el.className = className + (incrementClass ? " " + className + i : ""));
    propIndex && el.style.setProperty("--" + type, i + "");
    aria !== "none" && el.setAttribute("aria-hidden", "true");
    if (tag !== "span") {
      el.style.position = "relative";
      el.style.display = display;
    }
    el.textContent = text;
    collection.push(el);
    return el;
  };
  incrementClass && (className = className.replace("++", ""));
  wrapper.collection = collection;
  return wrapper;
};
var _getLineWrapper = (element, nodes, config, collection) => {
  let lineWrapper = _getWrapper("line", config, collection), textAlign = window.getComputedStyle(element).textAlign || "left";
  return (startIndex, endIndex) => {
    let newLine = lineWrapper("");
    newLine.style.textAlign = textAlign;
    element.insertBefore(newLine, nodes[startIndex]);
    for (; startIndex < endIndex; startIndex++) {
      newLine.appendChild(nodes[startIndex]);
    }
    newLine.normalize();
  };
};
var _splitWordsAndCharsRecursively = (element, config, wordWrapper, charWrapper, prepForCharsOnly, deepSlice, ignore, charSplitRegEx, specialCharsRegEx, isNested) => {
  var _a;
  let nodes = Array.from(element.childNodes), i = 0, { wordDelimiter, reduceWhiteSpace = true, prepareText } = config, elementBounds = element.getBoundingClientRect(), lastBounds = elementBounds, isPreformatted = !reduceWhiteSpace && window.getComputedStyle(element).whiteSpace.substring(0, 3) === "pre", ignoredPreviousSibling = 0, wordsCollection = wordWrapper.collection, wordDelimIsNotSpace, wordDelimString, wordDelimSplitter, curNode, words, curWordEl, startsWithSpace, endsWithSpace, j, bounds, curWordChars, clonedNode, curSubNode, tempSubNode, curTextContent, wordText, lastWordText, k;
  if (typeof wordDelimiter === "object") {
    wordDelimSplitter = wordDelimiter.delimiter || wordDelimiter;
    wordDelimString = wordDelimiter.replaceWith || "";
  } else {
    wordDelimString = wordDelimiter === "" ? "" : wordDelimiter || " ";
  }
  wordDelimIsNotSpace = wordDelimString !== " ";
  for (; i < nodes.length; i++) {
    curNode = nodes[i];
    if (curNode.nodeType === 3) {
      curTextContent = curNode.textContent || "";
      if (reduceWhiteSpace) {
        curTextContent = curTextContent.replace(_spacesRegEx, " ");
      } else if (isPreformatted) {
        curTextContent = curTextContent.replace(/\n/g, wordDelimString + "\n");
      }
      prepareText && (curTextContent = prepareText(curTextContent, element));
      curNode.textContent = curTextContent;
      words = wordDelimString || wordDelimSplitter ? curTextContent.split(wordDelimSplitter || wordDelimString) : curTextContent.match(charSplitRegEx) || _emptyArray;
      lastWordText = words[words.length - 1];
      endsWithSpace = wordDelimIsNotSpace ? lastWordText.slice(-1) === " " : !lastWordText;
      lastWordText || words.pop();
      lastBounds = elementBounds;
      startsWithSpace = wordDelimIsNotSpace ? words[0].charAt(0) === " " : !words[0];
      startsWithSpace && _insertNodeBefore(" ", element, curNode);
      words[0] || words.shift();
      _stretchToFitSpecialChars(words, specialCharsRegEx);
      deepSlice && isNested || (curNode.textContent = "");
      for (j = 1; j <= words.length; j++) {
        wordText = words[j - 1];
        if (!reduceWhiteSpace && isPreformatted && wordText.charAt(0) === "\n") {
          (_a = curNode.previousSibling) == null ? void 0 : _a.remove();
          _insertNodeBefore(document.createElement("br"), element, curNode);
          wordText = wordText.slice(1);
        }
        if (!reduceWhiteSpace && wordText === "") {
          _insertNodeBefore(wordDelimString, element, curNode);
        } else if (wordText === " ") {
          element.insertBefore(document.createTextNode(" "), curNode);
        } else {
          wordDelimIsNotSpace && wordText.charAt(0) === " " && _insertNodeBefore(" ", element, curNode);
          if (ignoredPreviousSibling && j === 1 && !startsWithSpace && wordsCollection.indexOf(ignoredPreviousSibling.parentNode) > -1) {
            curWordEl = wordsCollection[wordsCollection.length - 1];
            curWordEl.appendChild(document.createTextNode(charWrapper ? "" : wordText));
          } else {
            curWordEl = wordWrapper(charWrapper ? "" : wordText);
            _insertNodeBefore(curWordEl, element, curNode);
            ignoredPreviousSibling && j === 1 && !startsWithSpace && curWordEl.insertBefore(ignoredPreviousSibling, curWordEl.firstChild);
          }
          if (charWrapper) {
            curWordChars = _charSegmenter ? _stretchToFitSpecialChars([..._charSegmenter.segment(wordText)].map((s) => s.segment), specialCharsRegEx) : wordText.match(charSplitRegEx) || _emptyArray;
            for (k = 0; k < curWordChars.length; k++) {
              curWordEl.appendChild(curWordChars[k] === " " ? document.createTextNode(" ") : charWrapper(curWordChars[k]));
            }
          }
          if (deepSlice && isNested) {
            curTextContent = curNode.textContent = curTextContent.substring(wordText.length + 1, curTextContent.length);
            bounds = curWordEl.getBoundingClientRect();
            if (bounds.top > lastBounds.top && bounds.left <= lastBounds.left) {
              clonedNode = element.cloneNode();
              curSubNode = element.childNodes[0];
              while (curSubNode && curSubNode !== curWordEl) {
                tempSubNode = curSubNode;
                curSubNode = curSubNode.nextSibling;
                clonedNode.appendChild(tempSubNode);
              }
              element.parentNode.insertBefore(clonedNode, element);
              prepForCharsOnly && _disallowInline(clonedNode);
            }
            lastBounds = bounds;
          }
          if (j < words.length || endsWithSpace) {
            _insertNodeBefore(j >= words.length ? " " : wordDelimIsNotSpace && wordText.slice(-1) === " " ? " " + wordDelimString : wordDelimString, element, curNode);
          }
        }
      }
      element.removeChild(curNode);
      ignoredPreviousSibling = 0;
    } else if (curNode.nodeType === 1) {
      if (ignore && ignore.indexOf(curNode) > -1) {
        wordsCollection.indexOf(curNode.previousSibling) > -1 && wordsCollection[wordsCollection.length - 1].appendChild(curNode);
        ignoredPreviousSibling = curNode;
      } else {
        _splitWordsAndCharsRecursively(curNode, config, wordWrapper, charWrapper, prepForCharsOnly, deepSlice, ignore, charSplitRegEx, specialCharsRegEx, true);
        ignoredPreviousSibling = 0;
      }
      prepForCharsOnly && _disallowInline(curNode);
    }
  }
};
var _SplitText = class _SplitText2 {
  constructor(elements, config) {
    this.isSplit = false;
    _initIfNecessary();
    this.elements = _elements(elements);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.masks = [];
    this.vars = config;
    this._split = () => this.isSplit && this.split(this.vars);
    let orig = [], timerId, checkWidths = () => {
      let i = orig.length, o;
      while (i--) {
        o = orig[i];
        let w = o.element.offsetWidth;
        if (w !== o.width) {
          o.width = w;
          this._split();
          return;
        }
      }
    };
    this._data = { orig, obs: typeof ResizeObserver !== "undefined" && new ResizeObserver(() => {
      clearTimeout(timerId);
      timerId = setTimeout(checkWidths, 200);
    }) };
    _context(this);
    this.split(config);
  }
  split(config) {
    this.isSplit && this.revert();
    this.vars = config = config || this.vars || {};
    let { type = "chars,words,lines", aria = "auto", deepSlice = true, smartWrap, onSplit, autoSplit = false, specialChars, mask } = this.vars, splitLines = type.indexOf("lines") > -1, splitCharacters = type.indexOf("chars") > -1, splitWords = type.indexOf("words") > -1, onlySplitCharacters = splitCharacters && !splitWords && !splitLines, specialCharsRegEx = specialChars && ("push" in specialChars ? new RegExp("(?:" + specialChars.join("|") + ")", "gu") : specialChars), finalCharSplitRegEx = specialCharsRegEx ? new RegExp(specialCharsRegEx.source + "|" + _emojiSafeRegEx.source, "gu") : _emojiSafeRegEx, ignore = !!config.ignore && _elements(config.ignore), { orig, animTime, obs } = this._data, onSplitResult;
    if (splitCharacters || splitWords || splitLines) {
      this.elements.forEach((element, index) => {
        orig[index] = {
          element,
          html: element.innerHTML,
          ariaL: element.getAttribute("aria-label"),
          ariaH: element.getAttribute("aria-hidden")
        };
        aria === "auto" ? element.setAttribute("aria-label", (element.textContent || "").trim()) : aria === "hidden" && element.setAttribute("aria-hidden", "true");
        let chars = [], words = [], lines = [], charWrapper = splitCharacters ? _getWrapper("char", config, chars) : null, wordWrapper = _getWrapper("word", config, words), i, curWord, smartWrapSpan, nextSibling;
        _splitWordsAndCharsRecursively(element, config, wordWrapper, charWrapper, onlySplitCharacters, deepSlice && (splitLines || onlySplitCharacters), ignore, finalCharSplitRegEx, specialCharsRegEx, false);
        if (splitLines) {
          let nodes = _toArray(element.childNodes), wrapLine = _getLineWrapper(element, nodes, config, lines), curNode, toRemove = [], lineStartIndex = 0, allBounds = nodes.map((n) => n.nodeType === 1 ? n.getBoundingClientRect() : _emptyBounds), lastBounds = _emptyBounds;
          for (i = 0; i < nodes.length; i++) {
            curNode = nodes[i];
            if (curNode.nodeType === 1) {
              if (curNode.nodeName === "BR") {
                toRemove.push(curNode);
                wrapLine(lineStartIndex, i + 1);
                lineStartIndex = i + 1;
                lastBounds = allBounds[lineStartIndex];
              } else {
                if (i && allBounds[i].top > lastBounds.top && allBounds[i].left <= lastBounds.left) {
                  wrapLine(lineStartIndex, i);
                  lineStartIndex = i;
                }
                lastBounds = allBounds[i];
              }
            }
          }
          lineStartIndex < i && wrapLine(lineStartIndex, i);
          toRemove.forEach((el) => {
            var _a;
            return (_a = el.parentNode) == null ? void 0 : _a.removeChild(el);
          });
        }
        if (!splitWords) {
          for (i = 0; i < words.length; i++) {
            curWord = words[i];
            if (splitCharacters || !curWord.nextSibling || curWord.nextSibling.nodeType !== 3) {
              if (smartWrap && !splitLines) {
                smartWrapSpan = document.createElement("span");
                smartWrapSpan.style.whiteSpace = "nowrap";
                while (curWord.firstChild) {
                  smartWrapSpan.appendChild(curWord.firstChild);
                }
                curWord.replaceWith(smartWrapSpan);
              } else {
                curWord.replaceWith(...curWord.childNodes);
              }
            } else {
              nextSibling = curWord.nextSibling;
              if (nextSibling && nextSibling.nodeType === 3) {
                nextSibling.textContent = (curWord.textContent || "") + (nextSibling.textContent || "");
                curWord.remove();
              }
            }
          }
          words.length = 0;
          element.normalize();
        }
        this.lines.push(...lines);
        this.words.push(...words);
        this.chars.push(...chars);
      });
      mask && this[mask] && this.masks.push(...this[mask].map((el) => {
        let maskEl = el.cloneNode();
        el.replaceWith(maskEl);
        maskEl.appendChild(el);
        el.className && (maskEl.className = el.className.replace(/(\b\w+\b)/g, "$1-mask"));
        maskEl.style.overflow = "clip";
        return maskEl;
      }));
    }
    this.isSplit = true;
    _fonts && (autoSplit ? _fonts.addEventListener("loadingdone", this._split) : _fonts.status === "loading" && console.warn("SplitText called before fonts loaded"));
    if ((onSplitResult = onSplit && onSplit(this)) && onSplitResult.totalTime) {
      this._data.anim = animTime ? onSplitResult.totalTime(animTime) : onSplitResult;
    }
    splitLines && autoSplit && this.elements.forEach((element, index) => {
      orig[index].width = element.offsetWidth;
      obs && obs.observe(element);
    });
    return this;
  }
  revert() {
    var _a, _b;
    let { orig, anim, obs } = this._data;
    obs && obs.disconnect();
    orig.forEach(({ element, html, ariaL, ariaH }) => {
      element.innerHTML = html;
      ariaL ? element.setAttribute("aria-label", ariaL) : element.removeAttribute("aria-label");
      ariaH ? element.setAttribute("aria-hidden", ariaH) : element.removeAttribute("aria-hidden");
    });
    this.chars.length = this.words.length = this.lines.length = orig.length = this.masks.length = 0;
    this.isSplit = false;
    _fonts == null ? void 0 : _fonts.removeEventListener("loadingdone", this._split);
    if (anim) {
      this._data.animTime = anim.totalTime();
      anim.revert();
    }
    (_b = (_a = this.vars).onRevert) == null ? void 0 : _b.call(_a, this);
    return this;
  }
  static create(elements, config) {
    return new _SplitText2(elements, config);
  }
  static register(core) {
    gsap = gsap || core || window.gsap;
    if (gsap) {
      _toArray = gsap.utils.toArray;
      _context = gsap.core.context || _context;
    }
    if (!_coreInitted && window.innerWidth > 0) {
      _fonts = document.fonts;
      _coreInitted = true;
    }
  }
};
_SplitText.version = "3.13.0";
var SplitText = _SplitText;

// src/utils/lineaniamtion.ts
function initLineAnimations(id) {
  document.addEventListener("DOMContentLoaded", () => {
    const split = SplitText.create(`#${id}`, {
      type: "lines"
    });
    const lines = split.lines;
    const tl = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top 75%",
        end: "bottom 25%",
        scrub: true
      }
    });
    lines.forEach((line, i) => {
      tl.from(line, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3"
      }, i * 0.25);
    });
    const onResize = () => split.revert();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      split.revert();
    };
  });
}

// src/utils/word.ts
gsapWithCSS.registerPlugin(SplitText);
function initWordAnimations(id) {
  document.addEventListener("DOMContentLoaded", () => {
    const split = SplitText.create(`#${id}`, {
      type: "words"
    });
    const words = split.words;
    const tl = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top 80%",
        end: "top 30%",
        scrub: true
      }
    });
    words.forEach((word, i) => {
      tl.from(word, {
        y: -100,
        opacity: 0,
        rotation: gsapWithCSS.utils.random(-80, 80),
        duration: 0.7,
        ease: "back"
      }, i * 0.15);
    });
    const onResize = () => split.revert();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      split.revert();
    };
  });
}

// src/utils/char.ts
function initCharAnimations(id) {
  document.addEventListener("DOMContentLoaded", () => {
    const split = SplitText.create(`#${id}`, { type: "chars" });
    const chars = split.chars;
    const tl = gsapWithCSS.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        start: "top 80%",
        end: "top 20%",
        scrub: true
      }
    });
    chars.forEach((char, i) => {
      tl.from(char, {
        autoAlpha: 0,
        y: -100,
        duration: 1
      }, i * 0.05);
    });
    const onResize = () => split.revert();
    window.addEventListener("resize", onResize);
  });
}

// src/utils/textmask.ts
function initMaskAnimation() {
  document.addEventListener("DOMContentLoaded", () => {
    let char = SplitText.create(".headline", {
      type: "chars"
    });
    let word = SplitText.create(".sub_headline", {
      type: "words"
    });
    let line = SplitText.create(".line_amination", {
      type: "lines"
    });
    SplitText.create(".line_amination_mask", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      aria: "hidden",
      mask: "lines",
      onSplit: (self) => {
        gsapWithCSS.from(self.words, {
          opacity: 0,
          duration: 5,
          // duration is still needed but less important with scrub
          ease: "none",
          // disable easing for scrubbed animations
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".line_amination_mask",
            start: "top 80%",
            // adjust as needed
            end: "bottom 100%",
            // must define an end for scrubbing
            scrub: true
            // 👈 THIS makes the scroll control the animation
          }
        });
      }
    });
    let tl = gsapWithCSS.timeline({ defaults: { duration: 1, autoAlpha: 0, y: -100 } });
    tl.from(char.chars, { stagger: 0.05 }).from(word.words, {
      y: -100,
      opacity: 0,
      rotation: "random(-80, 80)",
      duration: 0.7,
      ease: "back",
      stagger: 0.15
    });
    const onResize = () => line.revert();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      line.revert();
    };
  });
}

// src/utils/texttracker.ts
function initTracking() {
  const trackingText = document.querySelector(".tracking_text");
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tiltX = mouseY / 10;
    const tiltY = mouseX / 15;
    gsapWithCSS.to(trackingText, {
      rotationX: tiltX,
      rotationY: tiltY,
      transformPerspective: 1e3,
      // Adds 3D depth
      ease: "power2.out",
      duration: 0.5
    });
  });
  document.addEventListener("mouseleave", () => {
    gsapWithCSS.to(trackingText, {
      rotationX: 0,
      rotationY: 0,
      duration: 1
    });
  });
}

// src/text.ts
initCharAnimations("header");
initWordAnimations("sub_header");
initLineAnimations("line_amination");
initDecodeAnimations();
initMaskAnimation();
initTracking();
/*! Bundled license information:

gsap/SplitText.js:
  (*!
   * SplitText 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2025, GreenSock. All rights reserved. Subject to the terms at https://gsap.com/standard-license.
   * @author: Jack Doyle
   *)
*/
//# sourceMappingURL=text.js.map
