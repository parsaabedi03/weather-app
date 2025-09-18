import showCard from "../components/card.js";
import showSkeleton from "../components/skeletonCard.js";
import { getForcastByName } from "./httpReq.js";

const hourlySwiperSlider = document.querySelector(
  ".hourly-swiper .swiper-wrapper"
);

function renderSkeletonSlides(count = 8) {
  return Array.from({ length: count })
    .map(
      () => `
      <div class="swiper-slide">
        ${showSkeleton()}
      </div>
    `
    )
    .join("");
}

function formatForecastData(item) {
  return {
    condition: item.weather[0].main,
    date: item.dt,
    description: item.weather[0].description,
    humidity: item.main.humidity,
    main: item.main.temp,
    wind: item.wind.speed,
  };
}

function renderForecastSlides(dataList) {
  return dataList
    .map(
      (item) => `
      <div class="swiper-slide text-center">
        ${showCard(formatForecastData(item))}
      </div>
    `
    )
    .join("");
}

async function renderForecastHours(cityName, count) {
  hourlySwiperSlider.innerHTML = renderSkeletonSlides();

  try {
    const data = await getForcastByName(cityName, count);

    hourlySwiperSlider.innerHTML = renderForecastSlides(data.list);

    lucide.createIcons();
  } catch (err) {
    console.error("Error fetching forecast:", err);
  }
}

export default renderForecastHours;
