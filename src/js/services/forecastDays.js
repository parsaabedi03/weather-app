import showCard from "../components/card.js";
import showSkeleton from "../components/skeletonCard.js";
import { getForcastByName } from "./httpReq.js";

const dailySwiperSlider = document.querySelector(
  ".daily-swiper .swiper-wrapper"
);

function renderDailySkeletonSlides(count = 5) {
  return Array.from({ length: count })
    .map(
      () => `
    <div class="swiper-slide !w-fit !h-fit flex items-center justify-center">
      ${showSkeleton()}
    </div>
    `
    )
    .join("");
}

function processFiveDayForecast(forecastData) {
  const daily = {};

  forecastData.list.forEach((item) => {
    const today = new Date().toISOString().split("T")[0];
    const date = item.dt_txt.split(" ")[0];

    if (today === date) return;

    if (!daily[date]) {
      daily[date] = {
        temps: [],
        humidityLevels: [],
        conditions: [],
        descriptions: [],
        windSpeeds: [],
      };
    }

    daily[date].temps.push(item.main.temp);
    daily[date].humidityLevels.push(item.main.humidity);
    daily[date].conditions.push(item.weather[0].main);
    daily[date].descriptions.push(item.weather[0].description);
    daily[date].windSpeeds.push(item.wind.speed);
  });

  return Object.keys(daily).map((date) => {
    const temps = daily[date].temps;
    return {
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      condition: mostFrequent(daily[date].conditions),
      description: mostFrequent(daily[date].descriptions),
      humidity: mostFrequent(daily[date].humidityLevels),
      wind: mostFrequent(daily[date].windSpeeds),
    };
  });
}

function renderDailySlides(data) {
  return data
    .map(
      (day) => `
      <div class="swiper-slide !w-3xs text-center">
        ${showCard(day)}
      </div>
    `
    )
    .join("");
}

function mostFrequent(arr) {
  const counts = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

async function getForecastDays(cityName, count) {
  dailySwiperSlider.innerHTML = renderDailySkeletonSlides();

  try {
    const data = await getForcastByName(cityName, count);
    const forecast = processFiveDayForecast(data);

    dailySwiperSlider.innerHTML = renderDailySlides(forecast);

    lucide.createIcons();
  } catch (err) {
    console.error("Error fetching daily forecast:", err);
  }
}

export default getForecastDays;
