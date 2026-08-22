(() => {
  "use strict";

  const initialiseSlideshow = (slideshow) => {
    const slides = Array.from(slideshow.querySelectorAll("[data-slide]"));
    const dots = Array.from(slideshow.querySelectorAll("[data-slide-to]"));
    const caption = slideshow.querySelector("[data-slide-caption]");
    const previousButton = slideshow.querySelector("[data-slide-previous]");
    const nextButton = slideshow.querySelector("[data-slide-next]");

    if (!slides.length || !caption || !previousButton || !nextButton) return;

    let currentIndex = 0;

    const showSlide = (requestedIndex) => {
      currentIndex = (requestedIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        slide.hidden = index !== currentIndex;
      });

      dots.forEach((dot, index) => {
        dot.setAttribute("aria-pressed", String(index === currentIndex));
      });

      caption.textContent = slides[currentIndex].dataset.caption || "Project screenshot";
    };

    previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
    nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const requestedIndex = Number.parseInt(dot.dataset.slideTo, 10);
        if (Number.isInteger(requestedIndex)) showSlide(requestedIndex);
      });
    });

    slideshow.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(currentIndex + 1);
      }
    });

    showSlide(0);
  };

  document.querySelectorAll("[data-slideshow]").forEach(initialiseSlideshow);
  window.lucide?.createIcons();
})();
