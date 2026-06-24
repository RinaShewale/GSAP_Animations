import './style.css'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


let count = 0
const loadercount = document.querySelector(".loadercount")
const loaderbar = document.querySelector(".loader-bar")


const interval = setInterval(() => {
    count++
    loadercount.innerHTML = `${count}%`
    loaderbar.style.width = `${count}%`


    if (count === 100) {
        clearInterval(interval)
        loadingAnimation()
    }
}, 20)


function loadingAnimation() {

    const tl = gsap.timeline()


    tl.to(".loader-content", {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: 'power3.inOut'

    })
        .to(".loadercount", {
            opacity: 0,
            duration: 0.3,
            ease: 'power3.inOut'

        })
        .to(".loader", {
            yPercent: -100,
            duration: 1.3,
            ease: 'expo'

        }, "-=0.99")
        .from(".background img", {
            scale: 1.5,
            duration: 1.3,
            ease: 'expo'

        }, "-=0.9")
        .from(".heading h1", {
            yPercent: 100,
            duration: 1.3,
            ease: 'expo.out'

        }, "-=0.8")
        .from(".subheading h2", {
            yPercent: 100,
            duration: 1.3,
            ease: 'expo.out'

        }, "-=0.77")


}




function horizontalScroll() {

    const section = document.querySelector(".sectionImages")
    if (!section) return;

    const items = gsap.utils.toArray(".sectionImages > *");
    const totalItems = items.length;



    const tl = gsap.timeline({

        scrollTrigger: {
            trigger: ".sectionImages",
            start: "top top",
            end: `+=${section.offsetWidth}`,  // Length of the scroll area
            pin: true,       // STICK the section to the top while it moves
            scrub: 1,        // Make the animation follow the mouse wheel
            markers: false,
            anticipatePin: 1
        }

    })

    tl.to(section, {
        xPercent: -100 * (totalItems - 1) / totalItems,
        ease: 'none',
        duration: 3,
    }, "-=0.90")


    tl.from(".travelText .main-title", {
        scale: 0,
        duration: 1,
        delay: 1,
        rotate: 360,
        ease: "back.out(1.7)"
    }, "-=0.9")

        .to(".line", {
            width: "100%",
            duration: 2,
            ease: 'expo.inOut'
        }, "-=0.8")

        .from(".small-title", {
            y: 40,
            duration: 2,
            opacity: 0,
            delay: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.77")


        gsap.from(".bigImg img", {
            scale: 0,
            duration: 3,
            delay: 1,
            ease: 'expo',
            scrollTrigger:{
                trigger:".bigImg",
                start:"top 80%",
            }
        })


        gsap.from(".herotext h1",{
            transform:"translate(-150%)",
            ease:'power1.inOut',
            delay:4,

            scrollTrigger:{
                trigger:".bigImg",
                start:"top 0%",
                 end: "+=2000", 
                scrub:2,
                pin:true
            }
        })

}






horizontalScroll();