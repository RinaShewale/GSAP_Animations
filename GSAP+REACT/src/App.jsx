
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { AnimatePresence, motion } from "motion/react";
// import { AnimateOnX } from './components/AnimateOnX'

function App() {
  // const boxref=useRef(null)
  //  const containerref=useRef(null)

  // useGSAP(()=>{

  //   gsap.to(boxref.current,{
  //     x:1200,
  //     duration:1,
  //     ease:"expo",
  //     delay:1,
    
  //   })
  // },{scope:containerref,dependencies:[],revertOnUpdate:true})



const boxVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    x: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 1200,
  },
};


const [show, setShow]=useState(false)

  return (
 <div>
 







{/* <AnimateOnX>

    <div className="box1"></div>
    
    <div className="box1"></div>

    
    <div className="box1"></div>
    
    <div className="box1"></div>

</AnimateOnX> */}



<motion.div
  variants={boxVariants}
  initial="hidden"
  animate="visible"
  transition={{
    duration: 1,
    delay: 1,
    ease: "easeOut",
  }}
  className="box"
></motion.div>


<button
  onClick={() => {
    setShow((prev) => !prev);
  }}
>
  Click me
</button>

<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      className="box1"
    />
  )}
</AnimatePresence>

 </div>
  )}
export default App
