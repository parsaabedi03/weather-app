const BASE_URL = "https://api.openweathermap.org";
const API_KEY = "5f0fe6f805b0885e2996d24f2ad52ad5";
const UNITS = "metric";

const getWeatherByCityName = async (name) => {
  const data = await fetch(
    `${BASE_URL}/data/2.5/weather?q=${name}&appid=${API_KEY}&units=${UNITS}`
  );
  const json = await data.json();
  return json;
};

const getWeatherByGeolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const data = await fetch(
            `${BASE_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${UNITS}`
          );
          const json = await data.json();
          resolve(json);
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getForcastByName = async (name,cnt) => {
  const data = await fetch(
    `${BASE_URL}/data/2.5/forecast?q=${name}&cnt=${cnt}&appid=${API_KEY}&units=${UNITS}`
  );
  const json = await data.json();
  return json;
};

export { getWeatherByCityName, getWeatherByGeolocation, getForcastByName };
