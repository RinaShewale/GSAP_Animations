import './style.css'
import javascriptLogo from './javascript.svg'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const tl = gsap.timeline()


tl.from(".page1 img", {
  scale: 0,
  duration: 3,
  delay: 1,
  rotate:360,
  ease:'expo'
})

  .from(".page2 img", {
    scale: 0,
    duration: 3,
    delay: 1,
    rotate:360,
    ease:'expo',
    scrollTrigger: {
      trigger: ".page1 img",
      scroller: "body",
      start: "top 60%"
    }
  })


  .from(".page3 img", {
    scale: 0,
    duration: 3,
    delay: 1,
    rotate:360,
    ease:'expo',
    scrollTrigger: {
      trigger: ".page1 img",
      scroller: "body",
      start: "top 60%"
    }
  })