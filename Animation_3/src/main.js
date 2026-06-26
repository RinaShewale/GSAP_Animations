import './style.css'
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Draggable, Flip, InertiaPlugin, SplitText);

// 1. Text Animation - Masking & 3D Reveal
const split = new SplitText(".string-wrapper h1", {
  type: "chars, words",
  charsClass: "titlechars"
});

// Set initial perspective
gsap.set(".string-wrapper", { perspective: 1000 });

// --- ENTRANCE ANIMATION ---
gsap.from(split.chars, {
  y: 200,
  z: -500,               // Start deep in 3D space
  rotateX: -110,         // Over-rotate for a "springy" reveal
  filter: "blur(15px)",  // Start blurry
  opacity: 0,
  duration: 1.8,
  stagger: {
    amount: 0.8,
    from: "center",      // Reveal starts from the middle
    ease: "power3.inOut"
  },
  ease: "expo.out",
  transformOrigin: "50% 100%",
  onComplete: () => {
    // We don't clearProps entirely yet so we can animate them on hover
    gsap.set(split.chars, { filter: "blur(0px)" });
  }
});

// --- INTERACTIVE MOUSE-ON EFFECT ---
const wrapper = document.querySelector(".string-wrapper");

wrapper.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  split.chars.forEach((char) => {
    // Get position of each character
    const rect = char.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    // Calculate distance between mouse and character
    const dist = Math.hypot(clientX - charCenterX, clientY - charCenterY);

    // Create a "Zone of Influence" (how close the mouse needs to be)
    const proximity = 250;

    if (dist < proximity) {
      // Map distance to movement (closer = more movement)
      const power = (proximity - dist) / proximity; // 0 to 1

      gsap.to(char, {
        y: -40 * power,          // Lift up
        z: 50 * power,           // Bring toward camera
        rotateX: -20 * power,    // Tilt
        rotateY: (clientX - charCenterX) * 0.2 * power, // Tilt toward mouse X
        scale: 1 + 0.3 * power,  // Grow bigger
        color: "#ffffff",        // Glow effect
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      // Return to normal
      gsap.to(char, {
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        color: "var(--fg)",
        duration: 0.6,
        ease: "power2.out"
      });
    }
  });
});

// Reset all characters when mouse leaves the header area
wrapper.addEventListener("mouseleave", () => {
  gsap.to(split.chars, {
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    color: "var(--fg)",
    stagger: 0.02,
    duration: 0.8,
    ease: "elastic.out(1, 0.75)" // Snappy return
  });
});


const dropZone = document.querySelector(".drag_container");
const allImages = document.querySelectorAll('.card img');
const dropSpan = document.querySelector(".drag_container span");

allImages.forEach(img => {
  img.originalCard = img.parentElement;

  img.addEventListener("click", () => {
    const outgoingImg = dropZone.querySelector('img');
    const incomingImg = img;
    const isReverting = incomingImg === outgoingImg;

    // Capture state
    const state = Flip.getState(allImages);

    // DOM Reordering
    if (isReverting) {
      incomingImg.originalCard.appendChild(incomingImg);
      gsap.to(dropSpan, { opacity: 1, duration: 0.4, delay: 0.2 });
    } else {
      if (outgoingImg) {
        outgoingImg.originalCard.appendChild(outgoingImg);
      }
      dropZone.appendChild(incomingImg);
      gsap.to(dropSpan, { opacity: 0, duration: 0.2 });
    }

    // UNIQUE FLIP ANIMATION
    Flip.from(state, {
      duration: 1,
      ease: "elastic.out(0.8, 0.7)", // Gives that "magnetic snap" feel
      absolute: true,
      scale: true,
      onStart: () => {
        // 1. INCOMING IMAGE: 3D "Toss" Effect
        if (!isReverting) {
          gsap.fromTo(incomingImg,
            {
              rotationY: -30,
              rotationX: 20,
              z: 100
            },
            {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 1,
              ease: "power4.out"
            }
          );

          // Visual "Flash" on entering
          gsap.fromTo(incomingImg,
            { filter: "brightness(2) contrast(1.5)" },
            { filter: "brightness(1) contrast(1)", duration: 0.8 }
          );
        }

        // 2. OUTGOING IMAGE: "Tumble Out" Effect
        if (outgoingImg && !isReverting) {
          gsap.to(outgoingImg, {
            rotationZ: Math.random() > 0.5 ? 15 : -15, // Random tilt
            scale: 0.9,
            opacity: 0.6,
            duration: 0.6,
            ease: "power2.inOut"
          });
        }
      },
      onComplete: () => {
        // Ensure everything is clean after the animation
        gsap.set([incomingImg, outgoingImg], {
          clearProps: "all"
        });

        // Add a subtle hover "float" only to the image in the drop zone
        if (!isReverting) {
          gsap.to(incomingImg, {
            y: -5,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut"
          });
        }
      }
    });
  });
});

// 4. Interactive Drop Zone Text
Draggable.create(dropSpan, {
  bounds: ".drag_container",
  type: "x,y",
  edgeResistance: 0.65,
  inertia: true
});