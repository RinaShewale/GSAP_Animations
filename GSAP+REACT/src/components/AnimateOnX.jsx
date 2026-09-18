import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

export const AnimateOnX = ({children}) => {

    const containerRef= useRef(null)
    useGSAP(()=>{
        gsap.to(containerRef.current.children,{
            x:1200,
            duration:1,
            delay:0.5,
            ease:'expo',
          stagger:{
            each:0.4,
            from:'center'
          }
        })
    })
  return (
<div ref={containerRef}>
    {children}
</div>
  )
}
