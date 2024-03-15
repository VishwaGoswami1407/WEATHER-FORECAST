const apiKey = "149a50caffd3876fefa731d5fe2fc4ce";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city){
    try {
        const resp = await fetch(url(city), {
            mode: "cors"
        });
        const respData = await resp.json();
        addWeatherToPage(respData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function addWeatherToPage(data){
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            ${temp}°C 
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        </h2>
        <small>${data.weather[0].main}</small>
    `;
    main.innerHTML = ""; // Clear previous weather info
    main.appendChild(weather);
}

function Ktoc(K){
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value.trim(); // Trim to remove leading/trailing whitespaces
    if (city) {
        getWeatherByLocation(city);
    }
});
