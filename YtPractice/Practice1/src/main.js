import './style.css'
import javascriptLogo from './javascript.svg'

import { gsap } from "gsap";




const tl= gsap.timeline()

tl.from("nav h1",{
  y:-40,
  duration:2,
  opacity:0,
  delay:0.6

}).from(".Navitems h2",{
  y:-40,
  duration:1,
  opacity:0,
  delay:0.3,
  stagger:1

}).from(".heading h1",{
  y:-40,
  duration:1,
  opacity:0,
  delay:0.3,
  scale:1.6

})