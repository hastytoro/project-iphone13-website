// ! https://greensock.com/scrolltrigger/
// ! https://greensock.com/docs/v3/Plugins/ScrollTrigger
// DEFINE DEFAULT TIMELINE
// EXAMPLE
let navTL = gsap.timeline({
  scrollTrigger: {
    // When do you want this animation to run?
    // Below from the first page at the top zero percent.
    // https://greensock.com/docs/v3/Plugins/ScrollTrigger/trigger
    trigger: ".first-page",
    // Don't base animation on duration but rather `scrub`.

    // Link any animation to a particular element so that it only plays when
    // that element is in the viewport. This improves performance and ensures
    // that your beautiful animations actually get seen!

    // ScrollTriggers can perform actions on animation (play, pause, resume,
    // restart, reverse, complete, reset) when entering/leaving a defined area
    // or link it directly to the scrollbar so it acts like a scrubber `scrub`.
    scrub: true,
    start: "0%",
    end: "25%",
  },
});
// navTL.fromTo("nav", { opacity: 1 }, { opacity: 0 });

// PAGE ONE (PINNING HERO)
let intoTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-page",
    markers: { startColor: "pink", endColor: "pink" },
    // scrub: true,
    start: "0%",
    end: "100%",
    // Pinning capabilities lock an element in place between scroll positions.
    // Normally, the end position just unpins our pinned element.
    pin: true,
    // But it adds padding automatically to push other "following" elements down
    // accordingly, so they catch up when your pinned element gets unpinned.

    // To make it feel like the following and lower elements are flowing over -
    // disable this with pinSpacing: false).
    pinSpacing: false /* toggle for different effect */,
  },
});

// PAGE TWO (STAGING RGBA)
let highlightTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-page",
    markers: { startColor: "white", endColor: "white" },
    scrub: true,
    start: "-40%",
    end: "40%",
  },
});
highlightTL.fromTo(
  ".highlight",
  { color: "rgba(255,255,255, 0.4" },
  { color: "rgba(255,255,255, 1", stagger: 1 }
);

let removeHighlightTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-page",
    markers: { startColor: "white", endColor: "white" },
    scrub: true,
    start: "-20%",
    end: "60%",
  },
});
removeHighlightTL.to(".highlight", {
  color: "rgba(255,255,255, 0.4",
  stagger: 1,
});

// PAGE THREE (SPLITTING IPHONE'S AND PINNING)
let splitTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".third-page",
    markers: { startColor: "black", endColor: "black" },
    scrub: true,
    start: "-25%",
    end: "30%",
  },
});
splitTL.fromTo(".large-phone", { x: "40%" }, { x: "20%", scale: 0.7 });
splitTL.fromTo(".small-phone", { x: "-40%" }, { x: "-20%", scale: 0.7 }, "<");
splitTL.fromTo(
  ".product-text-left",
  { x: 20, opacity: 0 },
  { x: 0, opacity: 1 },
  "<"
);
splitTL.fromTo(
  ".product-text-right",
  { x: -20, opacity: 0 },
  { x: 0, opacity: 1 },
  "<"
);
let splitPinTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".third-page",
    markers: { startColor: "pink", endColor: "pink" },
    pin: true,
    pinSpacing: false,
    start: "0%",
    end: "100%",
  },
});

// PAGE FOUR (CAROUSEL)
let swatches = document.querySelectorAll(".swatches img");
let gallery = document.querySelector(".phone-gallery");
let slides = document.querySelectorAll(".phone-gallery-container");
let currentSwatch = "blue";
let topIndex = 2;

swatches.forEach((swatch, index) => {
  console.log("slide: ", slides[index]);
  let coords = slides[index].getBoundingClientRect();
  console.log(`Ech gallery "child" container's position: `, coords);
  console.log(`What's its left coordinate? `, coords.left);

  swatch.addEventListener("click", (e) => {
    let swatchName = e.target.getAttribute("swatch");
    console.log("swatch clicked:", swatchName);
    // Exit logic if current swatch is selected again:
    if (currentSwatch === swatchName) return;

    // Close up (right-side):
    let closeUp = document.querySelector(`.${swatchName}`);
    console.log("closeup change:", closeUp);
    gsap.set(closeUp, { zIndex: topIndex });
    gsap.fromTo(closeUp, { opacity: 0 }, { opacity: 1, duration: 1 });
    // Gallery (left-side):
    console.log("move complete gallery: ", gallery);
    gsap.to(gallery, { x: -coords.left, duration: 1, ease: "back.out(1)" });

    // Increment zIndex!
    topIndex++;
    currentSwatch = swatchName;
  });
});

// PAGE FIVE (VIDEO SCROLL)
let videoTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".fifth-page",
    markers: { startColor: "white", endColor: "white" },
    scrub: true,
    start: "0%",
    end: "150%",
    pin: true,
  },
});
videoTL.fromTo(
  ".product-video",
  { currentTime: 0 },
  { currentTime: 3, duration: 1 }
);
videoTL.fromTo(
  ".product-info-container h3",
  { opacity: 0 },
  { opacity: 1, stagger: 0.25, duration: 0.5 },
  "<"
);

// PAGE SIX (PARALLAX)
let parallaxTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".sixth-page",
    markers: { startColor: "black", endColor: "black" },
    scrub: true,
    start: "-25%",
    end: "50%",
  },
});
parallaxTL.fromTo(".photo-description", { y: 0 }, { y: 200 });
parallaxTL.fromTo(".portrait-container", { y: 0 }, { y: -80 }, "<");
parallaxTL.fromTo(".phone-video", { y: 0 }, { y: -300 }, "<");
