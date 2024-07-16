document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "c1526c310210eb61174223fc4e55c454";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "/assets/weather-app-img/images/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "/assets/weather-app-img/images/clear.png";
          break;
        case "Rain":
          weatherIcon.src = "/assets/weather-app-img/images/rain.png";
          break;
        case "Drizzle":
          weatherIcon.src = "/assets/weather-app-img/images/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "/assets/weather-app-img/images/mist.png";
          break;
        default:
          weatherIcon.src = "/assets/weather-app-img/images/default.png";
          break;
      }

      document.querySelector(".weather").style.display = "block";

    } catch (error) {
      console.error(error);
      alert("Unable to retrieve weather data. Please try again.");
      document.querySelector(".weather").style.display = "none";
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });

  searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      checkWeather(searchBox.value);
    }
  });
});
