import showSkeleton from "../components/skeletonCard.js";
import getWeatherData from "../services/httpReq.js";
import showCard from "../components/card.js";
import getForecastDays from "../services/forecastDays.js";
import renderForecastHours from "../services/forecastHours.js";
import { showModal } from "../components/modal.js";

const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const currentWeatherCard = document.getElementById("currentWeatherCard");
const cityInput = document.getElementById("cityInput");
const cityBtn = document.getElementById("cityBtn");

const formatWeatherData = (result) => ({
  condition: result.weather[0].main,
  date: result.dt,
  description: result.weather[0].description,
  humidity: result.main.humidity,
  main: result.main.temp,
  feels_like: result.main.feels_like,
  wind: result.wind.speed,
});

const renderWeatherCard = (result) => {
  const data = formatWeatherData(result);

  cityName.textContent = result.name;
  currentWeatherCard.innerHTML = `
    <div class="text-center w-72">
      ${showCard(data)}
    </div>
  `;
  lucide.createIcons();
};

const showLoadingState = () => {
  currentWeatherCard.innerHTML = showSkeleton();
  cityName.innerHTML = `
    <div class="bg-gray-300 h-10 w-30 animate-pulse rounded-lg"></div>
  `;
};

const locationHandler = () => {
  if (!navigator.geolocation) {
    showModal("Navigator", "Your browser does not support geolocation");
    return;
  }

  showLoadingState();
  navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
};

const positionCallback = async (position) => {
  try {
    const currentData = await getWeatherData("current", position.coords);
    const forecastData = await getWeatherData("forecast", position.coords);

    getForecastDays(forecastData);
    renderForecastHours(forecastData);
    renderWeatherCard(currentData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const errorCallback = (error) => {
  showModal("Navigator", error.message);
  console.error("Geolocation error:", error.message);
};

const searchHandler = async () => {
  const value = cityInput.value.toLowerCase().trim();
  if (!value) {
    showModal("Fill the input", "Please enter a city name");
    return;
  }

  cityInput.value = "";
  showLoadingState();

  try {
    const currentData = await getWeatherData("current", value);
    const forecastData = await getWeatherData("forecast", value);

    renderWeatherCard(currentData);
    renderForecastHours(forecastData);
    getForecastDays(forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const initHandler = async () => {
  try {
    const currentData = await getWeatherData("current", "karaj");
    const forecastData = await getWeatherData("forecast", "karaj");

    renderWeatherCard(currentData);
    renderForecastHours(forecastData);
    getForecastDays(forecastData);
  } catch (error) {
    console.error("Error initializing weather app:", error);
  }
};

locationBtn.addEventListener("click", locationHandler);
cityBtn.addEventListener("click", searchHandler);
document.addEventListener("DOMContentLoaded", initHandler);
