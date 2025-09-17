const hourlySwiper = new Swiper(".hourly-swiper", {
  slidesPerView: 1.5,
  spaceBetween: 20,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
  },
});
const dailySwiper = new Swiper(".daily-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  // loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: true,
  },
});
