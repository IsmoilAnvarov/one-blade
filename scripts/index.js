"use-strict";
// selectors
const wakeUpItems = document.querySelectorAll(".wakeUp");
const smoothScrolingItems = document.querySelectorAll(
  ".slowed_parallax_wrapper"
);

wakeUpItems.forEach((item) => {
  item.classList.add("visible");
});

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entries, observer);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

smoothScrolingItems.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
