import showCard from "../components/card.js";
import showSkeleton from "../components/skeletonCard.js";

const hourlySwiperSlider = document.querySelector(
  ".hourly-swiper .swiper-wrapper"
);

const renderSkeletonSlides = (count = 8) =>
  Array.from({ length: count })
    .map(
      () => `
      <div class="swiper-slide">
        ${showSkeleton()}
      </div>
    `
    )
    .join("");

const formatForecastData = (item) => ({
  condition: item.weather[0].main,
  date: item.dt,
  description: item.weather[0].description,
  humidity: item.main.humidity,
  main: item.main.temp,
  wind: item.wind.speed,
});

const renderForecastSlides = (dataList) =>
  dataList
    .map(
      (item) => `
      <div class="swiper-slide text-center">
        ${showCard(formatForecastData(item))}
      </div>
    `
    )
    .join("");

const renderForecastHours = (data) => {
  if (!data) return;

  hourlySwiperSlider.innerHTML = renderSkeletonSlides(8);

  setTimeout(() => {
    const filterData = data.list.slice(0, 8);

    hourlySwiperSlider.innerHTML = renderForecastSlides(filterData);

    lucide.createIcons();
  }, 300);
};

export default renderForecastHours;
