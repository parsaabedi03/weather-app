const hourlySwiper = new Swiper(".hourly-swiper", {
  slidesPerView: 2.5,
  spaceBetween: 8,
  slidesOffsetBefore: 10,
  slidesOffsetAfter: 10,
  breakpoints: {
    640: {
      slidesPerView: 4,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
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
