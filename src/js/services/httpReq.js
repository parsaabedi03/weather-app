import { showModal } from "../components/modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "5f0fe6f805b0885e2996d24f2ad52ad5";
const UNITS = "metric";

const getWeatherData = async (type, data) => {
  let url = "";

  switch (type) {
    case "current":
      typeof data === "string"
        ? (url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=${UNITS}`)
        : (url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=${UNITS}`);
      break;

    case "forecast":
      typeof data === "string"
        ? (url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=${UNITS}`)
        : (url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=${UNITS}`);
      break;
    default:
      url =
        url = `${BASE_URL}/weather?q=$karaj&appid=${API_KEY}&units=${UNITS}`;
      break;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
      return json;
    } else {
      showModal(json.message, "The name of the city is wrong.");
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWeatherData;
