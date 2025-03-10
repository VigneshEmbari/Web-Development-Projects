const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let index = 1; // Start at first real slide
const totalSlides = slide.length;
let autoSlide;

function updateSlide(instant = false) {
  slides.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Handle next slide
function nextSlide() {
  if (index >= totalSlides - 1) return;
  index++;
  updateSlide();
  setTimeout(() => {
    if (index === totalSlides - 1) {
      index = 1;
      updateSlide(true);
    }
  }, 500);
}

// Handle previous slide
function prevSlide() {
  if (index <= 0) return;
  index--;
  updateSlide();
  setTimeout(() => {
    if (index === 0) {
      index = totalSlides - 2;
      updateSlide(true);
    }
  }, 500);
}

// Auto Slide
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

// Stop auto slide on user interaction
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Add event listeners
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Handle infinite loop
slides.addEventListener("transitionend", () => {
  if (index >= totalSlides - 1) {
    index = 1;
    updateSlide(true);
  } else if (index <= 0) {
    index = totalSlides - 2;
    updateSlide(true);
  }
});

// Start auto-slide on load
startAutoSlide();
