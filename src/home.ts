import { greetUser } from '$utils/greet';

// window.Webflow ||= [];
// window.Webflow.push(() => {
//   const name = 'John Dwight';
//   greetUser(name);
// });


// replace with webflow logic
const head = document.getElementById('header')
const subhead = document.getElementById('sub_header')
const line_amination = document.getElementById('line_amination')
  const name = 'John Dwight';
  if(head){
    head.innerHTML=`<h1>${greetUser(name)}</h1>`
  }else{
    console.log('no head found')
  }
  if(subhead){
    subhead.innerHTML='<h2>this this the word animation</h2>'
  }else{
    console.log('no head found')
  }
  if(line_amination){
    line_amination.innerHTML='<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum sodales odio non interdum. Morbi maximus lacus in ipsum ultrices, a fringilla turpis maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu pellentesque velit. Integer egestas ut orci in fringilla. Nullam at vehicula tortor. Nunc bibendum turpis nec mollis mattis. Vivamus hendrerit aliquet massa. Nulla fermentum aliquet ullamcorper. Proin vitae orci sed diam gravida lacinia eu vitae nulla. Donec ultrices risus vitae convallis congue. Nulla non nisi ullamcorper, dictum nisi ut, hendrerit arcu. Nullam eu nibh augue. Donec eget dapibus mi. Quisque in posuere eros. Aliquam sit amet felis suscipit, egestas risus et, gravida lorem. Integer efficitur, turpis a vehicula scelerisque, odio enim rutrum tellus, a maximus urna metus id purus. Nunc sagittis semper tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas facilisis justo enim, at elementum mi feugiat quis. Nam consequat libero ut ligula placerat, nec interdum magna posuere. Quisque sagittis laoreet lectus efficitur ultricies. Sed eleifend, felis sed rutrum hendrerit, risus nibh mattis diam, vel suscipit ipsum risus vitae mi. Donec aliquet dapibus sodales.Fusce sit amet viverra augue, vitae varius purus. Vivamus et dignissim metus, eu ornare odio. In et dolor molestie, ultrices odio quis, hendrerit urna. Donec maximus nisl eget auctor cursus. Pellentesque ligula tortor, efficitur ut ornare ac, dapibus non purus. Nulla tellus sapien, finibus in neque ut, sollicitudin efficitur mauris. Vivamus quis arcu risus. Phasellus sed tincidunt dolor. Aenean aliquet posuere tincidunt.Cras vel congue dui. Sed nunc lectus, varius quis elit quis, tincidunt placerat lectus. Phasellus malesuada metus justo. In egestas, enim porta iaculis interdum, leo mi consequat sem, et pellentesque libero ipsum a dui. Aliquam efficitur purus nec tristique aliquam. Mauris quis varius magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed fermentum vehicula lacus at convallis.Duis mattis accumsan est ac tincidunt. Ut ultrices fringilla suscipit. Nullam malesuada laoreet ante pretium gravida. Etiam consequat, justo eget posuere elementum, lectus nisi eleifend elit, sit amet malesuada nibh leo in lacus. Nulla pellentesque in massa ut bibendum. Cras elit quam, dapibus et magna vitae, imperdiet rutrum ligula. Vivamus placerat eget lectus in dignissim. Nam in gravida sapien, a aliquam erat. Etiam nec mollis ante. In tempor, quam vitae volutpat tempor, mauris ligula mattis eros, vitae venenatis augue neque vitae sapien. Curabitur ac volutpat lectus.</p>'
  }else{
    console.log('no head found')
  }

const decode=document.getElementById('decode')
if(decode){
  decode.innerHTML=`<h2 class='.decode-item'>Decode</h2>`
}else{
  console.log('no head found')
}

const line_amination_mask=document.getElementById('line_amination_mask')
if(line_amination_mask){
  line_amination_mask.innerHTML='<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum sodales odio non interdum. Morbi maximus lacus in ipsum ultrices, a fringilla turpis maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu pellentesque velit. Integer egestas ut orci in fringilla. Nullam at vehicula tortor. Nunc bibendum turpis nec mollis mattis. Vivamus hendrerit aliquet massa. Nulla fermentum aliquet ullamcorper. Proin vitae orci sed diam gravida lacinia eu vitae nulla. Donec ultrices risus vitae convallis congue. Nulla non nisi ullamcorper, dictum nisi ut, hendrerit arcu. Nullam eu nibh augue. Donec eget dapibus mi. Quisque in posuere eros. Aliquam sit amet felis suscipit, egestas risus et, gravida lorem. Integer efficitur, turpis a vehicula scelerisque, odio enim rutrum tellus, a maximus urna metus id purus. Nunc sagittis semper tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas facilisis justo enim, at elementum mi feugiat quis. Nam consequat libero ut ligula placerat, nec interdum magna posuere. Quisque sagittis laoreet lectus efficitur ultricies. Sed eleifend, felis sed rutrum hendrerit, risus nibh mattis diam, vel suscipit ipsum risus vitae mi. Donec aliquet dapibus sodales.Fusce sit amet viverra augue, vitae varius purus. Vivamus et dignissim metus, eu ornare odio. In et dolor molestie, ultrices odio quis, hendrerit urna. Donec maximus nisl eget auctor cursus. Pellentesque ligula tortor, efficitur ut ornare ac, dapibus non purus. Nulla tellus sapien, finibus in neque ut, sollicitudin efficitur mauris. Vivamus quis arcu risus. Phasellus sed tincidunt dolor. Aenean aliquet posuere tincidunt.Cras vel congue dui. Sed nunc lectus, varius quis elit quis, tincidunt placerat lectus. Phasellus malesuada metus justo. In egestas, enim porta iaculis interdum, leo mi consequat sem, et pellentesque libero ipsum a dui. Aliquam efficitur purus nec tristique aliquam. Mauris quis varius magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed fermentum vehicula lacus at convallis.Duis mattis accumsan est ac tincidunt. Ut ultrices fringilla suscipit. Nullam malesuada laoreet ante pretium gravida. Etiam consequat, justo eget posuere elementum, lectus nisi eleifend elit, sit amet malesuada nibh leo in lacus. Nulla pellentesque in massa ut bibendum. Cras elit quam, dapibus et magna vitae, imperdiet rutrum ligula. Vivamus placerat eget lectus in dignissim. Nam in gravida sapien, a aliquam erat. Etiam nec mollis ante. In tempor, quam vitae volutpat tempor, mauris ligula mattis eros, vitae venenatis augue neque vitae sapien. Curabitur ac volutpat lectus.</p>'
}else{
  console.log('no head found')
}
const tracking_text=document.getElementById('tracking_text');
if(tracking_text){
  tracking_text.innerHTML='<h1>Tracking Text</h1>'
}else{
  console.log('no head found')
}





const roll_reveal=document.getElementById('roll_reveal')
const rollRevealReverse=document.getElementById('roll_reveal_revese')
const slide_in_left=document.getElementById('slide_in_left')
const slide_in_right=document.getElementById('slide_in_right')
const zoom=document.getElementById('zoom')
const fade_in=document.getElementById('fade_in')
const flipReveal=document.getElementById('flip_reveal')
const pan=document.getElementById('pan')

if(roll_reveal){
  roll_reveal.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}

if(rollRevealReverse){
  rollRevealReverse.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}


if(slide_in_left){
  slide_in_left.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}

if(slide_in_right){
  slide_in_right.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}

if(zoom){
  zoom.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}

if(fade_in){
  fade_in.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}
if(flipReveal){
  flipReveal.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}
if(pan){
  pan.innerHTML=' <img src="http://farm9.staticflickr.com/8504/8365873811_d32571df3d_z.jpg" alt="">'
}else{
  console.log('no head found')
}

// const fadeElement = document.getElementById("fade-element");
// const slideInLeftScroll = document.getElementById("slide-in-left-scroll");
// const slideInRightScroll = document.getElementById("slide-in-right-scroll");
// const scaleUpScroll = document.getElementById("scale-up-scroll");
const rotateScroll = document.getElementById("rotate-scroll");
const staggerItemScroll = document.getElementById("stagger-item-scroll") ;
const pinElementScroll = document.getElementById("pin");
const colorChangeScroll = document.getElementById("color-change-scroll");

// if (fadeElement) {
//   fadeElement.innerHTML = `<div class="box fade-element">Fade In/Out</div>`;
// }
// if (slideInLeftScroll) {
//   slideInLeftScroll.innerHTML = `<div class="box slide-in-left">Slide In Left</div>`;
// }
// if (slideInRightScroll) {
//   slideInRightScroll.innerHTML = `<div class="box slide-in-right">Slide In Right</div>`;
// }
// if (scaleUpScroll) {
//   scaleUpScroll.innerHTML = `<div class="box scale-up">Scale Up</div>`;
// }
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


// Get elements with type assertions
const progress_bar_scroll = document.getElementById('progress-bar-scroll') as HTMLElement;
const toggle_element_scroll = document.getElementById('toggle-element-scroll') as HTMLElement;
const container_horizontal = document.getElementById('container_horizontal') as HTMLElement;
const Contextual = document.getElementById('Contextual') as HTMLElement;

// Null check (optional but recommended in strict mode)
if (progress_bar_scroll && toggle_element_scroll && container_horizontal && Contextual) {
  toggle_element_scroll.innerHTML = '<div class="toggle-element">Toggle Active Class</div>';
  progress_bar_scroll.innerHTML = '<div class="progress-container"><div class="progress-bar"></div></div>';
  Contextual.innerHTML = '<div><h1>Pop up</h1></div>';
  container_horizontal.innerHTML='<section class="panel_horizontal red">ONE</section><section class="panel_horizontal orange">TWO</section><section class="panel_horizontal purple">THREE</section><section class="panel_horizontal green">FOUR</section><section class="panel_horizontal gray">FIVE</section>'
} else {
  console.error('One or more elements were not found');
}

const svgContain = document.getElementById('svg_contain') as HTMLElement | null;
const panelWrapper = document.getElementById('panel-wrapper') as HTMLElement | null;

// Check if elements exist before manipulation
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
    console.error('SVG container element not found');
}

if (panelWrapper) {
    panelWrapper.innerHTML = `
        <section class="panel red from-bottom"><div>ONE</div></section>
        <section class="panel orange from-left"><div>TWO</div></section>
        <section class="panel purple from-right">THREE</section>
    `;
} else {
    console.error('Panel wrapper element not found');
}


// const video=document.getElementById('myVideo')

// if (video) {
//   video.innerHTML = `
//   <video class='vid' src="https://videos.pexels.com/video-files/32316899/13783420_360_640_24fps.mp4" muted
//   preload="auto"
//   playsinline ></video>
//   `;
// }else{
//   alert('no vid')
// }
const video2=document.getElementById('myVideo2')

if (video2) {
  video2.innerHTML = `
  <video class='vid2' src="https://videos.pexels.com/video-files/32316899/13783420_360_640_24fps.mp4" muted
  preload="auto"
  playsinline ></video>
  `;
}else{
  alert('no vid')
}