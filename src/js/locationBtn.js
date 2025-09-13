import { getWeatherByGeolocation } from "./utils/httpReq.js";

const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const currentWeatherCard = document.getElementById("currentWeatherCard");

async function getLocation() {
  try {
    const result = await getWeatherByGeolocation();
    cityName.textContent = result.name;
    console.log(result);
    showWeatherCard(result);
  } catch (err) {
    console.error("Error:", err);
  }
}

const showSkeleton = () => {
  const html = `
    <div class="bg-gray-200 p-4 sm:p-6 text-center w-56 sm:w-72 rounded-lg animate-pulse">
      <div class="h-5 w-24 bg-gray-300 rounded mx-auto mb-2"></div>
      <div class="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
      <div class="h-8 w-32 sm:w-40 bg-gray-300 rounded mx-auto mb-1"></div> 
      <div class="h-4 w-20 bg-gray-300 rounded mx-auto mb-2"></div> 
      <div class="h-3 w-16 bg-gray-300 rounded mx-auto mb-1"></div>
      <div class="h-1 bg-gray-300 rounded-full mx-auto mb-1">
        <div class="h-full bg-gray-400 rounded-full w-3/5"></div>
      </div>
      <div class="h-3 w-20 bg-gray-300 rounded mx-auto mb-1"></div>
      <div class="h-3 w-24 bg-gray-300 rounded mx-auto mb-1"></div>
      <div class="h-3 w-16 bg-gray-300 rounded mx-auto mb-1"></div>
    </div>
  `;
  currentWeatherCard.innerHTML = html;
};

const showWeatherCard = (data) => {
  const { main, dt, weather, sys, wind } = data;

  
  const date = new Date(dt * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const { title, subtitle } = textColorCard(hours);

  const html = `
  <div class="${bgColorCard(
    weather[0].main,
    hours
  )} p-4 sm:p-6 text-center w-56 sm:w-72 rounded-lg">
    <p class="text-base sm:text-lg font-semibold ${title}">
      ${hours}:${minutes}
    </p>
    ${weatherIcon(weather)}
    <p class="text-2xl sm:text-3xl font-bold ${title} mt-2">
      ${Math.round(main.temp)}°C
    </p>
    <p class="text-sm sm:text-base ${subtitle}">
      ${weather[0].description}
    </p>
    <p class="text-xs sm:text-sm ${subtitle} mt-2">
      Humidity: ${main.humidity}%
    </p>
    <div class="h-1 bg-gray-200 rounded-full mt-1">
      <div class="h-full bg-teal-500 rounded-full transition-all" style="width: ${
        main.humidity
      }%"></div>
    </div>
    <p class="text-xs sm:text-sm ${subtitle} mt-2">
      Wind: ${wind.speed} km/h
    </p>
    <p class="text-xs sm:text-sm ${subtitle} mt-2">
      Feels like: ${Math.round(main.feels_like)}°C
    </p>
  </div>
`;

  currentWeatherCard.innerHTML = html;
  lucide.createIcons();
};

const bgColorCard = (condition, hours) => {
  const isNight = hours >= 18 || hours < 6;

  switch (condition) {
    case "Clear":
      return isNight
        ? "bg-gradient-to-b from-gray-800 to-gray-900"
        : "bg-gradient-to-b from-yellow-200 to-orange-300";

    case "Clouds":
      return isNight
        ? "bg-gradient-to-b from-gray-700 to-gray-900"
        : "bg-gradient-to-b from-gray-200 to-gray-400";

    case "Atmosphere":
      return isNight
        ? "bg-gradient-to-b from-gray-600 to-gray-800"
        : "bg-gradient-to-b from-gray-300 to-blue-100";

    case "Snow":
      return isNight
        ? "bg-gradient-to-b from-blue-200 to-blue-500"
        : "bg-gradient-to-b from-blue-100 to-white";

    case "Rain":
      return isNight
        ? "bg-gradient-to-b from-blue-700 to-gray-800"
        : "bg-gradient-to-b from-blue-400 to-blue-700";

    case "Drizzle":
      return isNight
        ? "bg-gradient-to-b from-teal-500 to-blue-700"
        : "bg-gradient-to-b from-teal-200 to-blue-300";

    case "Thunderstorm":
      return isNight
        ? "bg-gradient-to-b from-gray-800 to-purple-900"
        : "bg-gradient-to-b from-gray-600 to-purple-800";

    default:
      return isNight
        ? "bg-gradient-to-b from-gray-700 to-gray-900"
        : "bg-gradient-to-b from-gray-200 to-blue-200";
  }
};

const weatherIcon = (weather) => {
  const { main } = weather[0];
  switch (main) {
    case "Clear":
      return `<i data-lucide="sun" class="block w-10 h-10 mx-auto text-yellow-500"></i>`;
    case "Clouds":
      return `<i data-lucide="cloudy" class="w-10 h-10 mx-auto text-gray-500"></i>`;
    case "Atmosphere":
      return `<i data-lucide="waves" class="w-10 h-10 mx-auto text-blue-400"></i>`;
    case "Snow":
      return `<i data-lucide="snowflake" class="w-10 h-10 mx-auto text-blue-300"></i>`;
    case "Rain":
      return `<i data-lucide="cloud-rain" class="w-10 h-10 mx-auto text-blue-600"></i>`;
    case "Drizzle":
      return `<i data-lucide="cloud-drizzle" class="w-10 h-10 mx-auto text-teal-400"></i>`;
    case "Thunderstorm":
      return `<i data-lucide="cloud-lightning" class="w-10 h-10 mx-auto text-yellow-600"></i>`;
  }
};

const textColorCard = (hours) => {
  const isNight = 20 >= 18 || hours < 6;
  return {
    title: isNight ? "text-white" : "text-gray-800", // ساعت یا دما
    subtitle: isNight ? "text-gray-50" : "text-gray-600", // توضیحات
  };
};

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
  locationBtn.addEventListener("click", getLocation);
});
