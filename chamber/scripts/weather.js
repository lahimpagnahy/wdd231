// Weather API configuration
const apiKey = '8db92f448102c03afbbfec20ddcbb093'; // Votre clé API
const city = 'Antananarivo,mg'; // Antananarivo, Madagascar
const units = 'metric'; // Pour Fahrenheit
const weatherElement = document.querySelector('.weather-section');

// DOM elements for weather display
const currentTempElement = document.getElementById('current-temp');
const weatherIconElement = document.getElementById('weather-icon');
const weatherDescriptionElement = document.getElementById('weather-description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast-container');

// Fonction pour récupérer les données météo directement
async function fetchWeatherData() {
    try {
        // Essayons d'utiliser directement l'API Current Weather Data
        const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
        
        if (!currentResponse.ok) {
            throw new Error(`Weather data fetch failed: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        
        // Pour les prévisions, utilisons l'API Forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`);
        
        if (!forecastResponse.ok) {
            throw new Error(`Forecast data fetch failed: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        
        // Afficher les données météo actuelles
        displayWeather(currentData);
        
        // Afficher les prévisions
        displayForecast(forecastData);
        
        console.log('Current Weather Data:', currentData);
        console.log('Forecast Data:', forecastData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayWeatherError();
    }
}

// Display current weather
function displayWeather(data) {
    try {
        const weather = data.weather[0];
        
        currentTempElement.textContent = Math.round(data.main.temp);
        weatherIconElement.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        weatherIconElement.alt = weather.description;
        weatherDescriptionElement.textContent = capitalizeFirstLetter(weather.description);
        humidityElement.textContent = data.main.humidity;
        windSpeedElement.textContent = data.wind.speed;
    } catch (error) {
        console.error('Error displaying weather:', error);
    }
}

// Display 3-day forecast
function displayForecast(data) {
    try {
        forecastContainer.innerHTML = '';
        
        // Obtenir les prévisions pour les 3 prochains jours (en prenant une prévision par jour)
        const dailyForecasts = [];
        const today = new Date().setHours(0, 0, 0, 0);
        
        // Filter forecasts to get one entry per day
        data.list.forEach(forecast => {
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDay = forecastDate.setHours(0, 0, 0, 0);
            
            // Si c'est un nouveau jour et pas aujourd'hui
            if (forecastDay > today && !dailyForecasts.find(f => new Date(f.dt * 1000).setHours(0, 0, 0, 0) === forecastDay)) {
                dailyForecasts.push(forecast);
            }
        });
        
        // Limiter à 3 jours
        dailyForecasts.slice(0, 3).forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const weather = forecast.weather[0];
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            forecastDay.innerHTML = `
                <div>${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}">
                <div>${Math.round(forecast.main.temp)}°C</div>
            `;
            
            forecastContainer.appendChild(forecastDay);
        });
    } catch (error) {
        console.error('Error displaying forecast:', error);
    }
}

// Display error message if weather data cannot be fetched
function displayWeatherError() {
    weatherElement.innerHTML = `
        <h2>Current Weather</h2>
        <div class="weather-card">
            <p>Weather data currently unavailable</p>
            <p>Please check back later</p>
        </div>
    `;
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Load weather data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching weather data...');
    fetchWeatherData();
});