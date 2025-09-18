import showSkeleton from "../components/skeletonCard.js";
import getData from "../services/forecastHours.js";
import getForcastDays from "../services/forecastDays.js";
import {
  getWeatherByCityName,
  getWeatherByGeolocation,
} from "../services/httpReq.js";
import showCard from "../components/card.js";

const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const currentWeatherCard = document.getElementById("currentWeatherCard");
const cityInput = document.getElementById("cityInput");
const cityBtn = document.getElementById("cityBtn");

function formatWeatherData(result) {
  return {
    condition: result.weather[0].main,
    date: result.dt,
    description: result.weather[0].description,
    humidity: result.main.humidity,
    main: result.main.temp,
    feels_like: result.main.feels_like,
    wind: result.wind.speed,
  };
}

function renderWeatherCard(result) {
  const data = formatWeatherData(result);

  getData(result.name, 8);
  getForcastDays(result.name, 40);

  cityName.textContent = result.name;
  currentWeatherCard.innerHTML = `
    <div class="text-center w-72">
      ${showCard(data)}
    </div>
  `;
  lucide.createIcons();
}

function showLoadingState() {
  currentWeatherCard.innerHTML = showSkeleton();
  cityName.innerHTML = `<div class="bg-gray-300 h-10 w-30 animate-pulse rounded-lg"></div>`;
}

async function locationHandler() {
  try {
    showLoadingState();
    const result = await getWeatherByGeolocation();
    renderWeatherCard(result);
  } catch (err) {
    console.error("Error:", err);
  }
}

async function searchHandler() {
  const value = cityInput.value.toLowerCase().trim();
  if (!value) {
    console.log("Please fill the input");
    return;
  }

  cityInput.value = "";

  try {
    showLoadingState();
    const result = await getWeatherByCityName(value);
    renderWeatherCard(result);
  } catch (err) {
    console.error("Error:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  locationHandler();
  locationBtn.addEventListener("click", locationHandler);
  cityBtn.addEventListener("click", searchHandler);
});
