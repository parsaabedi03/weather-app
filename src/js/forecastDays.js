import showCard from "./card.js";
import { getForcastByName } from "./utils/httpReq.js";

const dailySwiperSlider = document.querySelector(
  ".daily-swiper .swiper-wrapper"
);

async function getForcastDays(name, cnt) {
  dailySwiperSlider.innerHTML = "";
  for (let index = 1; index <= 5; index++) {
    const html = `
    <div class="swiper-slide !w-fit !h-fit flex items-center justify-center">
      <div class="bg-gray-200 p-4 sm:p-6 text-center w-56 sm:w-72 rounded-lg animate-pulse">
        <div class="h-4 w-20 mx-auto bg-gray-300 rounded mb-3"></div>
          <div class="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
          <div class="h-6 w-28 mx-auto bg-gray-300 rounded mb-2"></div>
          <div class="h-4 w-24 mx-auto bg-gray-300 rounded mb-2"></div>
          <div class="h-3 w-32 mx-auto bg-gray-300 rounded mb-2"></div>
          <div class="h-1 w-full bg-gray-300 rounded-full mt-2"></div>
          <div class="h-3 w-28 mx-auto bg-gray-300 rounded mt-2"></div>
          <div class="h-3 w-28 mx-auto bg-gray-300 rounded mt-2"></div>
          <div class="h-3 w-24 mx-auto bg-gray-300 rounded mt-2"></div>
        </div>
    </div>
      `;
    dailySwiperSlider.innerHTML += html;
  }
  const data = await getForcastByName(name, cnt);
  getFiveDayForecast(data);
}

const getFiveDayForecast = (forecastData) => {
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

  const result = Object.keys(daily).map((date) => {
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

  dailySwiperSlider.innerHTML = "";
  
  let slides = "";
  result.forEach(
    (data) =>
      (slides += `<div class="swiper-slide !w-3xs text-center">${showCard(
        data
      )}</div>`)
  );

  dailySwiperSlider.innerHTML = slides;
  lucide.createIcons();
};

function mostFrequent(arr) {
  const counts = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

export default getForcastDays;
