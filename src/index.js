let now = new Date();

let currentDateTime = document.querySelector("#current-date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

currentDateTime.innerHTML = `${day} ${hour}:${minute}`;

function getCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#place");
  displayCity(changeCity.value);
}

function displayCity(city) {
  let apiKey = "2fa9ddec71ce08d23a59a79b1d873ee1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
}

function displayForecast() {
  let forecastHTML = `<div class="row align-items-start">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
      <strong>${day}</strong>
      <br />
      <img
      src="http://openweathermap.org/img/wn/02n@2x.png"
      alt=""
      width="50"
      />
      <br />
      <p>18°C | 21°C</p>
      </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function getTemp(response) {
  cTemp = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = Math.round(cTemp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#clouds").innerHTML = response.data.clouds.all;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  displayForecast();

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  cLink.classList.add("active");
  fLink.classList.remove("active");
}

function showCurrentLocation(position) {
  let apiKey = "2fa9ddec71ce08d23a59a79b1d873ee1";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function displayFTemp(event) {
  event.preventDefault();
  let fTemp = (cTemp * 9) / 5 + 32;
  cLink.classList.remove("active");
  fLink.classList.add("active");
  document.querySelector("#current-temp").innerHTML = Math.round(fTemp);
}

function displayCTemp(event) {
  event.preventDefault();
  cLink.classList.add("active");
  fLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = Math.round(cTemp);
}

let cTemp = null;

let city = document.querySelector("#form");
city.addEventListener("submit", getCity);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", displayFTemp);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", displayCTemp);

displayCity("Sydney");
