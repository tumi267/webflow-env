import "./chunks/chunk-SUYWSG3L.mjs";

// node_modules/@finsweet/ts-utils/dist/webflow/getPublishDate.js
var getPublishDate = (page = document) => {
  const publishDatePrefix = "Last Published:";
  for (const node of page.childNodes) {
    if (node.nodeType === Node.COMMENT_NODE && node.textContent?.includes(publishDatePrefix)) {
      const publishDateValue = node.textContent.trim().split(publishDatePrefix)[1];
      if (publishDateValue)
        return new Date(publishDateValue);
    }
  }
};

// src/utils/greet.ts
var greetUser = (name2) => {
  const publishDate = getPublishDate();
  return `Hello ${name2}! This site was last published on ${publishDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  })}.`;
};

// src/home.ts
var gallery = document.getElementById("gallery");
if (gallery) {
  gallery.innerHTML = `<img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt=""><img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt=""><img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt=""><img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt=""><img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt=""><img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">`;
} else {
  console.log("no head found");
}
var head = document.getElementById("header");
var subhead = document.getElementById("sub_header");
var line_amination = document.getElementById("line_amination");
var name = "John Dwight";
if (head) {
  head.innerHTML = `<h1>${greetUser(name)}</h1>`;
} else {
  console.log("no head found");
}
if (subhead) {
  subhead.innerHTML = "<h2>this this the word animation</h2>";
} else {
  console.log("no head found");
}
if (line_amination) {
  line_amination.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum sodales odio non interdum. Morbi maximus lacus in ipsum ultrices, a fringilla turpis maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu pellentesque velit. Integer egestas ut orci in fringilla. Nullam at vehicula tortor. Nunc bibendum turpis nec mollis mattis. Vivamus hendrerit aliquet massa. Nulla fermentum aliquet ullamcorper. Proin vitae orci sed diam gravida lacinia eu vitae nulla. Donec ultrices risus vitae convallis congue. Nulla non nisi ullamcorper, dictum nisi ut, hendrerit arcu. Nullam eu nibh augue. Donec eget dapibus mi. Quisque in posuere eros. Aliquam sit amet felis suscipit, egestas risus et, gravida lorem. Integer efficitur, turpis a vehicula scelerisque, odio enim rutrum tellus, a maximus urna metus id purus. Nunc sagittis semper tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas facilisis justo enim, at elementum mi feugiat quis. Nam consequat libero ut ligula placerat, nec interdum magna posuere. Quisque sagittis laoreet lectus efficitur ultricies. Sed eleifend, felis sed rutrum hendrerit, risus nibh mattis diam, vel suscipit ipsum risus vitae mi. Donec aliquet dapibus sodales.Fusce sit amet viverra augue, vitae varius purus. Vivamus et dignissim metus, eu ornare odio. In et dolor molestie, ultrices odio quis, hendrerit urna. Donec maximus nisl eget auctor cursus. Pellentesque ligula tortor, efficitur ut ornare ac, dapibus non purus. Nulla tellus sapien, finibus in neque ut, sollicitudin efficitur mauris. Vivamus quis arcu risus. Phasellus sed tincidunt dolor. Aenean aliquet posuere tincidunt.Cras vel congue dui. Sed nunc lectus, varius quis elit quis, tincidunt placerat lectus. Phasellus malesuada metus justo. In egestas, enim porta iaculis interdum, leo mi consequat sem, et pellentesque libero ipsum a dui. Aliquam efficitur purus nec tristique aliquam. Mauris quis varius magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed fermentum vehicula lacus at convallis.Duis mattis accumsan est ac tincidunt. Ut ultrices fringilla suscipit. Nullam malesuada laoreet ante pretium gravida. Etiam consequat, justo eget posuere elementum, lectus nisi eleifend elit, sit amet malesuada nibh leo in lacus. Nulla pellentesque in massa ut bibendum. Cras elit quam, dapibus et magna vitae, imperdiet rutrum ligula. Vivamus placerat eget lectus in dignissim. Nam in gravida sapien, a aliquam erat. Etiam nec mollis ante. In tempor, quam vitae volutpat tempor, mauris ligula mattis eros, vitae venenatis augue neque vitae sapien. Curabitur ac volutpat lectus.</p>";
} else {
  console.log("no head found");
}
var decode = document.getElementById("decode");
if (decode) {
  decode.innerHTML = `<h2 class='.decode-item'>Decode</h2>`;
} else {
  console.log("no head found");
}
var line_amination_mask = document.getElementById("line_amination_mask");
if (line_amination_mask) {
  line_amination_mask.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum sodales odio non interdum. Morbi maximus lacus in ipsum ultrices, a fringilla turpis maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu pellentesque velit. Integer egestas ut orci in fringilla. Nullam at vehicula tortor. Nunc bibendum turpis nec mollis mattis. Vivamus hendrerit aliquet massa. Nulla fermentum aliquet ullamcorper. Proin vitae orci sed diam gravida lacinia eu vitae nulla. Donec ultrices risus vitae convallis congue. Nulla non nisi ullamcorper, dictum nisi ut, hendrerit arcu. Nullam eu nibh augue. Donec eget dapibus mi. Quisque in posuere eros. Aliquam sit amet felis suscipit, egestas risus et, gravida lorem. Integer efficitur, turpis a vehicula scelerisque, odio enim rutrum tellus, a maximus urna metus id purus. Nunc sagittis semper tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas facilisis justo enim, at elementum mi feugiat quis. Nam consequat libero ut ligula placerat, nec interdum magna posuere. Quisque sagittis laoreet lectus efficitur ultricies. Sed eleifend, felis sed rutrum hendrerit, risus nibh mattis diam, vel suscipit ipsum risus vitae mi. Donec aliquet dapibus sodales.Fusce sit amet viverra augue, vitae varius purus. Vivamus et dignissim metus, eu ornare odio. In et dolor molestie, ultrices odio quis, hendrerit urna. Donec maximus nisl eget auctor cursus. Pellentesque ligula tortor, efficitur ut ornare ac, dapibus non purus. Nulla tellus sapien, finibus in neque ut, sollicitudin efficitur mauris. Vivamus quis arcu risus. Phasellus sed tincidunt dolor. Aenean aliquet posuere tincidunt.Cras vel congue dui. Sed nunc lectus, varius quis elit quis, tincidunt placerat lectus. Phasellus malesuada metus justo. In egestas, enim porta iaculis interdum, leo mi consequat sem, et pellentesque libero ipsum a dui. Aliquam efficitur purus nec tristique aliquam. Mauris quis varius magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed fermentum vehicula lacus at convallis.Duis mattis accumsan est ac tincidunt. Ut ultrices fringilla suscipit. Nullam malesuada laoreet ante pretium gravida. Etiam consequat, justo eget posuere elementum, lectus nisi eleifend elit, sit amet malesuada nibh leo in lacus. Nulla pellentesque in massa ut bibendum. Cras elit quam, dapibus et magna vitae, imperdiet rutrum ligula. Vivamus placerat eget lectus in dignissim. Nam in gravida sapien, a aliquam erat. Etiam nec mollis ante. In tempor, quam vitae volutpat tempor, mauris ligula mattis eros, vitae venenatis augue neque vitae sapien. Curabitur ac volutpat lectus.</p>";
} else {
  console.log("no head found");
}
var tracking_text = document.getElementById("tracking_text");
if (tracking_text) {
  tracking_text.innerHTML = "<h1>Tracking Text</h1>";
} else {
  console.log("no head found");
}
var roll_reveal = document.getElementById("roll_reveal");
var rollRevealReverse = document.getElementById("roll_reveal_revese");
var slide_in_left = document.getElementById("slide_in_left");
var slide_in_right = document.getElementById("slide_in_right");
var zoom = document.getElementById("zoom");
var fade_in = document.getElementById("fade_in");
var flipReveal = document.getElementById("flip_reveal");
var pan = document.getElementById("pan");
if (roll_reveal) {
  roll_reveal.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (rollRevealReverse) {
  rollRevealReverse.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (slide_in_left) {
  slide_in_left.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (slide_in_right) {
  slide_in_right.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (zoom) {
  zoom.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (fade_in) {
  fade_in.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (flipReveal) {
  flipReveal.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
if (pan) {
  pan.innerHTML = ' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">';
} else {
  console.log("no head found");
}
var rotateScroll = document.getElementById("rotate-scroll");
var staggerItemScroll = document.getElementById("stagger-item-scroll");
var pinElementScroll = document.getElementById("pin");
var colorChangeScroll = document.getElementById("color-change-scroll");
if (rotateScroll) {
  rotateScroll.innerHTML = `<div class="box rotate">Rotate</div>`;
}
if (staggerItemScroll) {
  staggerItemScroll.innerHTML = `
    <div class="stagger-container">
      <div class="stagger-item">1</div>
      <div class="stagger-item">2</div>
      <div class="stagger-item">3</div>
      <div class="stagger-item">4</div>
      <div class="stagger-item">5</div>
    </div>
  `;
}
if (pinElementScroll) {
  pinElementScroll.innerHTML = `<div class="pin-element">Pinned Element</div>`;
}
if (colorChangeScroll) {
  colorChangeScroll.innerHTML = `<div class="box color-change">Color Change</div>`;
}
var progress_bar_scroll = document.getElementById("progress-bar-scroll");
var toggle_element_scroll = document.getElementById("toggle-element-scroll");
var container_horizontal = document.getElementById("container_horizontal");
var Contextual = document.getElementById("Contextual");
if (progress_bar_scroll && toggle_element_scroll && container_horizontal && Contextual) {
  toggle_element_scroll.innerHTML = '<div class="toggle-element">Toggle Active Class</div>';
  progress_bar_scroll.innerHTML = '<div class="progress-container"><div class="progress-bar"></div></div>';
  Contextual.innerHTML = "<div><h1>Pop up</h1></div>";
  container_horizontal.innerHTML = '<section class="panel_horizontal red">ONE</section><section class="panel_horizontal orange">TWO</section><section class="panel_horizontal purple">THREE</section><section class="panel_horizontal green">FOUR</section><section class="panel_horizontal gray">FIVE</section>';
} else {
  console.error("One or more elements were not found");
}
var svgContain = document.getElementById("svg_contain");
var panelWrapper = document.getElementById("panel-wrapper");
if (svgContain) {
  svgContain.innerHTML = `
        <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1200">
            <path class="line01 line" d="M 10 200 600 200" stroke="black" stroke-width="2"></path>
            <path class="line02 line" d="M 10 400 600 400" stroke="black" stroke-width="2"></path>
            <path class="line03 line" d="M 10 600 600 600" stroke="black" stroke-width="2"></path>
            <path class="line04 line" d="M 10 800 600 800" stroke="black" stroke-width="2"></path>
            <path class="line05 line" d="M 10 1000 600 1000" stroke="black" stroke-width="2"></path>
            <text class="text01" x="30" y="190">2018</text>
            <text class="text02" x="30" y="390">2019</text>
            <text class="text03" x="30" y="590">2020</text>
            <path class="theLine" d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1200" 
                  fill="none" stroke="white" stroke-width="10px" />
            <circle class="ball ball01" r="20" cx="-5" cy="0" fill="red"></circle>
            <circle class="ball ball02" r="20" cx="278" cy="201" fill="blue"></circle>
            <circle class="ball ball03" r="20" cx="327" cy="401" fill="green"></circle>
            <circle class="ball ball04" r="20" cx="203" cy="601" fill="yellow"></circle>
        </svg>
    `;
} else {
  console.error("SVG container element not found");
}
if (panelWrapper) {
  panelWrapper.innerHTML = `
        <section class="panel red from-bottom"><div>ONE</div></section>
        <section class="panel orange from-left"><div>TWO</div></section>
        <section class="panel purple from-right">THREE</section>
    `;
} else {
  console.error("Panel wrapper element not found");
}
var video2 = document.getElementById("myVideo2");
if (video2) {
  video2.innerHTML = `
  <video class='vid2' src="https://videos.pexels.com/video-files/32316899/13783420_360_640_24fps.mp4" muted
  preload="auto"
  playsinline ></video>
  `;
} else {
  console.log("no vid");
}
//# sourceMappingURL=home.mjs.map
