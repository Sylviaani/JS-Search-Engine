function displayTemperature(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let temp = document.querySelector(".current-temperature-value");
  temp.innerHTML = Math.round(response.data.temperature.current);

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  let description = document.querySelector("#current-desc");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#windy");
  wind.innerHTML = `${response.data.wind.speed}km/h`;

  // parse API date
  let time = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  time.innerHTML = formatDate(date);

  // let country = document.querySelector(".country");
  // country.innerHTML = response.data.country;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "d3d1dee4f0701o614001t040202aba72";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=d3d1dee4f0701o614001t040202aba72&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

searchCity("Lagos");

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes},`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div>
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            <img src = "${
              day.condition.icon_url
            }" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperature-1">
                <strong>${Math.round(day.temperature.maximum)}&deg;</strong>
              </div>
              <div class="weather-forecast-temperature-1">${Math.round(
                day.temperature.minimum
              )}&deg;</div>
            </div>
          </div>`;
    }
  });

  forecast.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "d3d1dee4f0701o614001t040202aba72";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=d3d1dee4f0701o614001t040202aba72&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
