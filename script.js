const API_KEY = "f5ccbd3f9b5b070a92b8b96707376229";
const video = document.getElementById("weather-video");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");

// Weather Videos
const weatherVideos = {
    "Clear": "assets/sunny.mp4",
    "Rain": "assets/rainy.mp4",
    "Clouds": "assets/cloudy.mp4",
    "Snow": "assets/snowy.mp4",
    "Thunderstorm": "assets/storm.mp4",
    "Default": "assets/default.mp4"
};

// Fetch Weather Data
async function getWeather(city) {
    try {
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchBtn.disabled = true;
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
            updateWeather(data);
        } else {
            showError(data.message || "City not found!");
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        showError("Failed to fetch weather data");
    } finally {
        searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
        searchBtn.disabled = false;
    }
}

// Update Weather UI
function updateWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherCondition.textContent = data.weather[0].main;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    pressure.textContent = data.main.pressure;
    
    // Change video based on weather
    const weatherType = data.weather[0].main;
    const videoSrc = weatherVideos[weatherType] || weatherVideos["Default"];
    video.style.opacity = 0;
    setTimeout(() => {
        video.src = videoSrc;
        video.style.opacity = 1;
    }, 500);
}

// Show error message
function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    const weatherInfo = document.querySelector('.weather-info');
    weatherInfo.insertBefore(errorElement, weatherInfo.firstChild);
    
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
    else showError("Please enter a city name");
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
        else showError("Please enter a city name");
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('scrolled');
    }
});

// Initialize with default weather
document.addEventListener('DOMContentLoaded', () => {
    getWeather("Noida");
});