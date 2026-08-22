document.querySelectorAll("[data-slideshow]").forEach((slideshow) => {
  const slides = [...slideshow.querySelectorAll("[data-slide]")];
  const dots = [...slideshow.querySelectorAll("[data-slide-to]")];
  const caption = slideshow.querySelector("[data-slide-caption]");
  let currentSlide = 0;

  const showSlide = (nextSlide) => {
    currentSlide = (nextSlide + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.hidden = index !== currentSlide;
    });

    dots.forEach((dot, index) => {
      dot.setAttribute("aria-pressed", String(index === currentSlide));
    });

    caption.textContent = slides[currentSlide].dataset.caption;
  };

  slideshow.querySelector("[data-slide-previous]").addEventListener("click", () => {
    showSlide(currentSlide - 1);
  });

  slideshow.querySelector("[data-slide-next]").addEventListener("click", () => {
    showSlide(currentSlide + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => showSlide(Number(dot.dataset.slideTo)));
  });

  slideshow.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
    if (event.key === "ArrowRight") showSlide(currentSlide + 1);
  });
});

window.lucide?.createIcons();
