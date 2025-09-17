import showCard from "./card.js";
import getForcastDays from "./forecastDays.js";
import getData from "./forecastHours.js";
import {
  getWeatherByCityName,
  getWeatherByGeolocation,
} from "./utils/httpReq.js";

const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const currentWeatherCard = document.getElementById("currentWeatherCard");

const cityInput = document.getElementById("cityInput");
const cityBtn = document.getElementById("cityBtn");

async function getLocation() {
  try {
    showSkeleton();
    cityName.innerHTML = `<div class="bg-gray-300 h-10 w-30 animate-pulse rounded-lg"></div>`;
    const result = await getWeatherByGeolocation();
    cityName.textContent = result.name;

    const data = {
      condition: result.weather[0].main,
      date: result.dt,
      description: result.weather[0].description,
      humidity: result.main.humidity,
      main: result.main.temp,
      feels_like: result.main.feels_like,
      wind: result.wind.speed,
    };

    getData(result.name, 8);
    getForcastDays(result.name, 40);
    currentWeatherCard.innerHTML = `
      <div class="text-center w-72">
        ${showCard(data)}
      </div>`;
    lucide.createIcons();
  } catch (err) {
    console.error("Error:", err);
  }
}

const showSkeleton = () => {
  const html = `
    <div class="bg-gray-200 p-4 sm:p-6 text-center w-72 rounded-lg animate-pulse">
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

const clickHanler = async () => {
  const value = cityInput.value.toLowerCase().trim();
  if (!value) {
    console.log("please fill the input");
    return;
  }

  cityInput.value = "";

  try {
    showSkeleton();
    cityName.innerHTML = `<div class="bg-gray-300 h-10 w-30 animate-pulse rounded-lg"></div>`;
    const result = await getWeatherByCityName(value);
    cityName.textContent = result.name;

    const formatData = {
      condition: result.weather[0].main,
      date: result.dt,
      description: result.weather[0].description,
      humidity: result.main.humidity,
      main: result.main.temp,
      feels_like: result.main.feels_like,
      wind: result.wind.speed,
    };

    getData(result.name, 8);
    getForcastDays(result.name, 40);

    currentWeatherCard.innerHTML = `
      <div class="text-center w-72">
        ${showCard(formatData)}
      </div>`;
    lucide.createIcons();
  } catch (err) {
    console.error("Error:", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
  locationBtn.addEventListener("click", getLocation);
  cityBtn.addEventListener("click", clickHanler);
});
