import './style.css'
import gsap from 'gsap'

gsap.fromTo('.box', {
  scale: 0,
  opacity: 0,
  backgroundColor: 'burlywood',
  y: 100,
}, {
  x: 100,
  duration: 1,
  delay: 1,
  ease: 'expo.inOut',
  repeat: -1,
  yoyo: true,
  scale: 1,
  opacity: 1,
  backgroundColor: 'red',
  stagger: 0.3
})