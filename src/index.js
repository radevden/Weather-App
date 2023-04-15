let now = new Date();
let h1 = document.querySelector("h1");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

h1.innerHTML = `${day} <br />${hours}:${minutes}`;

const hoursAndMinutes = now.toLocaleTimeString("default", {
  hour: "numeric",
  minute: "numeric",
});

function updateWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".temperature-value");
  cityTemperature.innerHTML = `${temperature}`;

  let newCity = document.querySelector(".city-name");
  newCity.innerHTML = response.data.name;

  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${weatherDescription}`;

  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector(".humidity");
  cityHumidity.innerHTML = `${humidity}`;

  let high = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector(".max");
  maxTemp.innerHTML = `${high}`;

  let low = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector(".min");
  minTemp.innerHTML = `${low}`;

  let wind = Math.round(response.data.wind.speed);
  let windCity = document.querySelector(".wind");
  windCity.innerHTML = `${wind}`;

  let visibility = Math.round(response.data.visibility / 1000);
  let visibilityCity = document.querySelector(".visibility");
  visibilityCity.innerHTML = `${visibility}`;

  celsiusTemp = response.data.main.temp;
}

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "2360ab6e16992a97a3513a031995a2ff";
  let apiLink = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiLink}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(updateWeather)
    .catch((error) => {
      alert(`This location could not be found`);
    });
}

function myLocationButt(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

let positionButton = document.querySelector(".location");
positionButton.addEventListener("click", myLocationButt);

function changeLocation(event) {
  event.preventDefault();

  let locationInput = document.querySelector(".location-form");
  let city = locationInput.value;

  let apiKey = "2360ab6e16992a97a3513a031995a2ff";
  let apiLink = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiLink}?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(updateWeather)
    .catch((error) => {
      alert(`This location could not be found`);
    });
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeLocation);

function showCelsius(event) {
  event.preventDefault();

  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");

  let temperatureValue = document.querySelector(".temperature-value");
  temperatureValue.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();

  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");

  let fahrenheitValue = document.querySelector(".temperature-value");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  fahrenheitValue.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", showCelsius);

let fahrenheitUnit = document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", showFahrenheit);
let celsiusTemp = null;

function updateIcon(response) {
  let iconWeather = document.querySelector("#weather-icon");
  iconWeather.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function selectIcon(event) {
  event.preventDefault();

  let locationInput = document.querySelector(".location-form");
  let city = locationInput.value;

  let apiKey = "e1c36520c14f56fa74b8fob3tcc313d4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateIcon);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", selectIcon);
