"use-strict";
// selectors
const wakeUpItems = document.querySelectorAll(".wakeUp");
const smoothScrolingItems = document.querySelectorAll(
  ".slowed_parallax_wrapper"
);
const shaveParalaxWrapper = document.querySelector(".paralax_wrapper");
const sliderAnimatons = document.querySelectorAll(".slider-animation");

// Scroll position
let scrollPosition = window.pageYOffset;

wakeUpItems.forEach((item) => {
  item.classList.add("visible");
});

let smoothSections = [
  {
    transformMeasure: 0,
    scrolingDown: undefined,
    tranformMeasure: 0,
    previousRatio: 0,
    previousY: 0,
  },
  {
    transformMeasure: 0,
    scrolingDown: undefined,
    tranformMeasure: 0,
    previousRatio: 0,
    previousY: 0,
  },
  {
    transformMeasure: 0,
    scrolingDown: undefined,
    tranformMeasure: 0,
    previousRatio: 0,
    previousY: 0,
  },
  {
    transformMeasure: 0,
    scrolingDown: undefined,
    tranformMeasure: 0,
    previousRatio: 0,
    previousY: 0,
  },
];

const revealSection = function (entries, observer) {
  const [entry] = entries;
  const [, elId] = entry.target.children[0].id.split("_");

  if (!elId) return;

  const currentY = entry.boundingClientRect.y;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;

  // Scrolling down/up
  if (currentY < smoothSections[elId - 1].previousY) {
    if (
      currentRatio > smoothSections[elId - 1].previousRatio &&
      isIntersecting
    ) {
      smoothSections[elId - 1].transformMeasure += 16;
      smoothSections[elId - 1].scrolingDown = true;
    } else {
      smoothSections[elId - 1].scrolingDown = true;
    }
  } else if (currentY > smoothSections[elId - 1].previousY && isIntersecting) {
    if (currentRatio < smoothSections[elId - 1].previousRatio) {
      smoothSections[elId - 1].scrolingDown = false;
    } else {
      smoothSections[elId - 1].scrolingDown = false;
      smoothSections[elId - 1].transformMeasure -= 20;
    }
  }

  smoothSections[elId - 1].previousY = currentY;
  smoothSections[elId - 1].previousRatio = currentRatio;

  if (!entry.isIntersecting) {
    if (smoothSections[elId - 1].scrolingDown) {
      smoothSections[elId - 1].transformMeasure = 217;
    } else {
      smoothSections[elId - 1].transformMeasure = -20;
    }
  }

  entry.target.children[0].style.transform = `translate3d(50px, ${
    smoothSections[elId - 1].transformMeasure
  }px, 0px) scale3d(1.3, 1.3, 1)`;
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
});

smoothScrolingItems.forEach(function (section, index) {
  sectionObserver.observe(section);
});

// Aluminum razor top to down animation

let previousY = 0;
let previousRatio = 0;
let transformPosition = -15;

const animCallback = function (entries) {
  const [entry] = entries;

  const currentY = entry.boundingClientRect.y;
  const currentRatio = entry.intersectionRatio;
  const isIntersecting = entry.isIntersecting;

  // Scrolling down/up
  if (currentY < previousY) {
    if (currentRatio > previousRatio && isIntersecting) {
      if (transformPosition + 3 > 20) {
        transformPosition = 20;
      } else {
        transformPosition += 2;
      }
    }
  } else if (currentY > previousY && isIntersecting) {
    if (currentRatio < previousRatio) {
      if (transformPosition - 2 < -15) {
        transformPosition = -15;
      } else {
        transformPosition -= 2;
      }
    } else {
    }
  }

  previousY = currentY;
  previousRatio = currentRatio;

  entry.target.children[0].style.transform = `translate3d(0px, ${transformPosition}%, 0px)`;
};

const razorTopToDownObserver = new IntersectionObserver(animCallback, {
  root: null,
  threshold: [
    0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.66, 0.7,
    0.75, 0.8, 0.85, 0.9, 1,
  ],
});

razorTopToDownObserver.observe(shaveParalaxWrapper);

// Textbox presentation slider animation

const translateSlideAnimation = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  console.log(entry);
  entry.target.classList.add("slider-active");
};

const sliderObserver = new IntersectionObserver(translateSlideAnimation, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

sliderAnimatons.forEach(function (section, index) {
  sliderObserver.observe(section);
});
