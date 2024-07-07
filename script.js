const apikey = "3df493a115128e25b4a1da18de1c13b3";
const weatherDataE1 = document.querySelector("#info");
const cityInputE1 = document.querySelector("#city");
const submitter = document.querySelector("button");

submitter.addEventListener("click", (event) => {
  const cityValue = cityInputE1.value;

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed to get weather data");
    }
    const data = await response.json();
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temperature = Math.round(data.main.temp);
    const feels_like = Math.round(data.main.feels_like);
    const humidity = Math.round(data.main.humidity);
    const windspeed = Math.round(data.wind.speed);

    console.log(description);

    document.querySelector("#icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;
    document.querySelector("#temperature").textContent = `${temperature}°C`;
    document.querySelector("#description").textContent = `${description}`;
    document.querySelector(
      "#details"
    ).innerHTML = `<div class="info">Feels like: ${feels_like}°C</div>
    <div class="info">Humidity: ${humidity}%</div>
    <div class="info">Wind speed: ${windspeed}m/s</div>`;

    console.log(data);
  } catch (error) {
    document.querySelector("#description").textContent = 'Location not found. Please check the city name and try again.';

}
}