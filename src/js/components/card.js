const showCard = (data) => {
  if (!data) return;
  
  const {
    condition,
    date,
    description,
    humidity,
    main,
    max,
    min,
    feels_like,
    wind,
  } = data;

  const newDate = new Date(date * 1000);
  const hours = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");

  const dateIndex = new Date(date).getDay();
  const tomorrow = +new Date().toISOString().split("T")[0].split("-")[2] + 1;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeType = `${
    typeof date === "number"
      ? `${hours}:${minutes}`
      : date.split("-")[2] == tomorrow
      ? "Tomorrow"
      : `${daysOfWeek[dateIndex]}`
  }`;

  const { title, subtitle } = textColorCard(condition, hours);

  const temperatureElement = `
  ${
    min && max
      ? `<p class="text-2xl sm:text-3xl font-bold ${title} mt-2">
           ${Math.round(min)}°C / ${Math.round(max)}°C
        </p>`
      : `<p class="text-2xl sm:text-3xl font-bold ${title} mt-2">
           ${Math.round(main)}°C
        </p>`
  }
  `;

  const FeelsLikeElement = feels_like
    ? `<p class="text-xs sm:text-sm ${subtitle} mt-2">
       Feels like: ${Math.round(feels_like)}°C
     </p>`
    : "";

  const html = `
  <div class="${bgColorCard(condition, hours)} p-4 rounded-lg">
    <p class="text-base sm:text-lg font-semibold ${title}">
      ${timeType}
    </p>
    ${weatherIcon(condition, hours)}
    ${temperatureElement}
    <p class="text-sm sm:text-base ${subtitle}">
      ${description}
    </p>
    <p class="text-xs sm:text-sm ${subtitle} mt-2">
      Humidity: ${humidity}%
    </p>
    <div class="h-1 bg-gray-200 rounded-full mt-1">
      <div class="h-full bg-teal-500 rounded-full transition-all" style="width: ${humidity}%"></div>
    </div>
    <p class="text-xs sm:text-sm ${subtitle} mt-2">
      Wind: ${wind} km/h
    </p>
    ${FeelsLikeElement}
  </div>
`;

  return html;
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

const weatherIcon = (condition, hour) => {
  let isNight = null;
  hour ? (isNight = isNight = hour >= 18 || hour < 6) : false;

  switch (condition) {
    case "Clear":
      return isNight
        ? `<i data-lucide="moon" class="block w-10 h-10 mx-auto text-blue-400"></i>`
        : `<i data-lucide="sun" class="block w-10 h-10 mx-auto text-yellow-500"></i>`;

    case "Clouds":
      return isNight
        ? `<i data-lucide="cloud-moon" class="w-10 h-10 mx-auto text-gray-400"></i>`
        : `<i data-lucide="cloudy" class="w-10 h-10 mx-auto text-gray-500"></i>`;

    case "Atmosphere":
      return `<i data-lucide="waves" class="w-10 h-10 mx-auto ${
        isNight ? "text-blue-200" : "text-blue-400"
      }"></i>`;

    case "Snow":
      return `<i data-lucide="snowflake" class="w-10 h-10 mx-auto ${
        isNight ? "text-blue-200" : "text-blue-300"
      }"></i>`;

    case "Rain":
      return `<i data-lucide="cloud-rain" class="w-10 h-10 mx-auto ${
        isNight ? "text-blue-300" : "text-blue-600"
      }"></i>`;

    case "Drizzle":
      return `<i data-lucide="cloud-drizzle" class="w-10 h-10 mx-auto ${
        isNight ? "text-teal-200" : "text-teal-400"
      }"></i>`;

    case "Thunderstorm":
      return `<i data-lucide="cloud-lightning" class="w-10 h-10 mx-auto ${
        isNight ? "text-yellow-400" : "text-yellow-600"
      }"></i>`;
    case "Dust":
      return `<i data-lucide="cloud-fog" class="w-10 h-10 mx-auto ${
        isNight ? "text-yellow-200" : "text-amber-400"
      }"></i>`;
    case "Haze":
      return `<i data-lucide="haze" class="w-10 h-10 mx-auto ${
        isNight ? "text-gray-300" : "text-gray-400"
      }"></i>`;
  }
};

const textColorCard = (condition, hours) => {
  const isNight = hours >= 18 || hours < 6;
  const isBadWeather = condition == "Rain" || condition == "Clouds";

  return {
    title: isNight || isBadWeather ? "text-white" : "text-gray-800",
    subtitle: isNight || isBadWeather ? "text-gray-50" : "text-gray-600",
  };
};

export default showCard;
