import showCard from "./card.js";
import { getForcastByName } from "./utils/httpReq.js";

const hourlySwiperSlider = document.querySelector(
  ".hourly-swiper .swiper-wrapper"
);

async function getData(name, cnt) {
  hourlySwiperSlider.innerHTML = "";
  for (let index = 1; index <= 8; index++) {
    const html = `
          <div class="swiper-slide">
                <div
                  class="bg-gray-200 p-3 sm:p-4 text-center w-36 sm:w-48 rounded-lg animate-pulse"
                >
                  <div class="h-3 w-10 mx-auto bg-gray-300 mb-3"></div>
                  <div
                    class="h-12 w-12 sm:h-16 sm:w-16 bg-gray-300 rounded-full mx-auto mb-2"
                  ></div>
                  <div class="h-3 w-10 mx-auto bg-gray-300 rounded"></div>
                  <div class="h-3 w-5 mx-auto bg-gray-300 rounded mt-2"></div>
                  <div class="h-3 w-17 mx-auto bg-gray-300 rounded mt-4"></div>
                  <div class="h-1 bg-gray-300 rounded-full mt-1">
                    <div class="h-full bg-gray-400 rounded-full w-2/5"></div>
                  </div>
                  <div class="h-3 w-10 mx-auto bg-gray-300 rounded mt-1"></div>
                </div>
              </div>
      `;
    hourlySwiperSlider.innerHTML += html;
  }

  const data = await getForcastByName(name, cnt);

  hourlySwiperSlider.innerHTML = "";

  let slides = "";
  data.list.forEach((item) => {
    const formatData = {
      condition: item.weather[0].main,
      date: item.dt,
      description: item.weather[0].description,
      humidity: item.main.humidity,
      main: item.main.temp,
      wind: item.wind.speed,
    };

    slides += `<div class="swiper-slide text-center">${showCard(
      formatData
    )}</div>`;
  });

  hourlySwiperSlider.innerHTML = slides;
  lucide.createIcons();
}

export default getData;
