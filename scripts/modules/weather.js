// API Key and location data for OpenWeatherMap API
const apiKey = "73cfd0fa602004d24de5e4aefe30fe27"; // Your OpenWeatherMap API key
const lat = "7.12";  // Latitude of the location
const lon = "-73.12"; // Longitude of the location
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;  // URL for fetching weather data from OpenWeatherMap API

// Async function to fetch the weather data
async function fetchWeather() {
    try {
        // Fetch the weather data from the API
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching weather data: ${response.status}`);

        // Parse the response data as JSON
        const data = await response.json();
        console.log("Weather data:", data); // 🔎 For debugging purposes

        // Select HTML elements where the weather data will be displayed
        const weatherIcon = document.getElementById("weather-icon");
        const tempElement = document.getElementById("current-temp");
        const weatherDesc = document.getElementById("weather-desc");
        const humidity = document.getElementById("humidity");
        const forecastContainer = document.getElementById("forecast-container");

        // Check if the HTML elements exist
        if (!weatherIcon || !tempElement || !weatherDesc || !humidity || !forecastContainer) {
            console.error("⚠️ Some HTML elements not found.");
            return;
        }

        // Update the page with weather information
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;  // Show the current temperature in Celsius
        weatherDesc.textContent = data.weather[0].description;  // Weather description (e.g., sunny, rainy)
        humidity.textContent = `${data.main.humidity}%`;  // Show the humidity percentage

        // Update the weather icon based on the returned data
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;  // Set the icon image
        weatherIcon.alt = data.weather[0].description;  // Set the alt text for the icon

        // Display the weather forecast (maximum and minimum temperatures, humidity)
        forecastContainer.innerHTML = `
            <p><strong>🌡️ Max:</strong> ${Math.round(data.main.temp_max)}°C</p>
            <p><strong>🌡️ Min:</strong> ${Math.round(data.main.temp_min)}°C</p>
            <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
        `;
    } catch (error) {
        console.error("❌ Error fetching weather data:", error);  // Error handling
    }
}

// Initialize the weather by calling the fetchWeather function
export function initWeather() {
    fetchWeather();
}
