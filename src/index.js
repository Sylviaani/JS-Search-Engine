function displayTemperature(response) {
  let temp = document.querySelector(".current-temperature-value");
  temp.innerHTML = Math.round(response.data.temperature.current);

  let country = document.querySelector(".country");
  country.innerHTML = response.data.country;

  let icon = document.querySelector(".current-temperature-icon");
  icon.innerHTML = response.data.condition.icon;

  let description = document.querySelector("#current-desc");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);

  let wind = document.querySelector("#windy");
  wind.innerHTML = response.data.wind.speed;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  let apiKey = "d3d1dee4f0701o614001t040202aba72";
  let city = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=d3d1dee4f0701o614001t040202aba72&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  cityElement.innerHTML = searchInputElement.value;
}

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
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
