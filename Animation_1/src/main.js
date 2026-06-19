import './style.css'
import { gsap } from "gsap";


let count = 0

const loaderCount = document.querySelector(".loadercount h1")
const loaderBar = document.querySelector(".loader-bar")


const interval = setInterval(() => {
  count++

  loaderCount.innerHTML = `${count}%`
  loaderBar.style.width = `${count}%`

  if (count === 100) {
    clearInterval(interval)
    LoadingAnimation()
  }
}, 20)



function LoadingAnimation() {

  const tl = gsap.timeline()


  tl.to('.loader-content', {
    opacity: 0,
    y: -40,
    duration: 0.8,
    ease: 'power3.inOut'
  })

    .to('.loadercount', {
      opacity: 0,
      duration: 0.8,
      ease: 'power4.inOut'
    },"-=0.99")
    .to('.loader', {
      yPercent: -100,
      duration: 1.5,
      ease: 'expo.inOut'
    }, "-=0.9")
    .from('.background  img', {
      scale: 1.5,
      duration: 1,
      ease: 'expo.out'
    }, "-=0.6")
    .from('.heading h1', {
      yPercent: 100,
      duration: 1.5,
      ease: 'expo.out'
    }, "-=0.9")
    .from('.subheading h2', {
      yPercent: 100,
      duration: 1.2,
      ease: 'expo.out'
    }, "-=0.77")


}