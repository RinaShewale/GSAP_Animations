import './style.css'
import javascriptLogo from './javascript.svg'
import gsap from 'gsap'

var initialPath= "M 0 500 Q 500 500 1000 500"

var finalPath="M 0 500 Q 500 500 1000 500"



const app= document.querySelector("#app")

app.addEventListener("mousemove",function(dets){
      const path = `M 0 500 Q ${dets.x} ${dets.y} 1000 500`

    gsap.to("svg path",{
        attr:{d:path},
        duration:0.3,
        ease:'power3.out'
    })
})


app.addEventListener("mouseleave", function(){
        gsap.to("svg path",{
        attr:{d:finalPath},
        duration:1.5,
        ease:'elastic.out(1,0.2)'
    })
})