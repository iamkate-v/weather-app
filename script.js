let date = new Date();

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekdayShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
let currentHour = date.getHours();
let currentMinutes = date.getMinutes();
document.querySelector("#one").innerHTML = weekday[date.getDay()];
document.querySelector("#time").innerHTML = currentHour + ":" + currentMinutes;
document.querySelector("#dayone").innerHTML = weekdayShort[date.getDay() + 1];
document.querySelector("#daytwo").innerHTML = weekdayShort[date.getDay() + 2];
document.querySelector("#daythree").innerHTML = weekdayShort[date.getDay() + 3];
document.querySelector("#dayfour").innerHTML = weekdayShort[date.getDay() + 4];
function changeCity(event) {
  event.preventDefault();
  let placeholder = document.querySelector("#three");
  let paris = document.querySelector("#two");
  paris.innerHTML = placeholder.value;
}
let form = document.querySelector("#four");
form.addEventListener("click", changeCity);

function changeTempF(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main");
  mainTemp.innerHTML = `${29}°`;
}

// week 5 challange
function search(city) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherResponse);
}
function displayForecast(response) {
  console.log(response.data.daily[0]);
  let forecastOne = document.querySelector("#temp-day-one");
  let forecastTwo = document.querySelector("#temp-day-two");
  let forecastThree = document.querySelector("#temp-day-three");
  let forecastFour = document.querySelector("#temp-day-four");
  let iconOne = document.querySelector("#icon-one");
  let iconTwo = document.querySelector("#icon-two");
  let iconThree = document.querySelector("#icon-three");
  let iconFour = document.querySelector("#icon-four");
  forecastOne.innerHTML = Math.round(response.data.daily[0].temp.day) + "°C";
  forecastTwo.innerHTML = Math.round(response.data.daily[1].temp.day) + "°C";
  forecastThree.innerHTML = Math.round(response.data.daily[2].temp.day) + "°C";
  forecastFour.innerHTML = Math.round(response.data.daily[3].temp.day) + "°C";
  iconOne.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`
  );
  iconTwo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`
  );
  iconThree.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`
  );
  iconFour.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`
  );
}
function getForecast(coord) {
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weatherResponse(response) {
  let currentW = Math.round(response.data.main.temp);
  let replaceCity = document.querySelector("#two");
  let replaceTemp = document.querySelector("#main");
  let iconElement = document.querySelector("#icon");
  replaceCity.innerHTML = response.data.name;
  replaceTemp.innerHTML = `${currentW}`;

  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + " %";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " km/h";
  document.querySelector("#sunny").innerHTML =
    response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTransform = response.data.main.temp;
  getForecast(response.data.coord);
}
function clickButton(event) {
  event.preventDefault();
  let city = document.querySelector("#three").value;
  search(city);
}
let button = document.querySelector("#four");
button.addEventListener("click", clickButton);

// bonus week 5

function handlePosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "96ad27349a64ea1dcdfbe6f4d458c085";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherResponse);
}
function geo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTransform * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main");
  temperatureElement.innerHTML = Math.round(celsiusTransform);
}

let celsiusTransform = null;

let myLocation = document.querySelector("#five");
myLocation.addEventListener("click", geo);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
