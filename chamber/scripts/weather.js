const apiKey = "73cfd0fa602004d24de5e4aefe30fe27";
const lat = "7.12";
const lon = "-73.12";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al obtener el clima: ${response.status}`);

        const data = await response.json();
        console.log("Datos del clima:", data); // 🔎 Para depuración

        // Verifica si los elementos existen antes de modificarlos
        const weatherIcon = document.getElementById("weather-icon");
        const tempElement = document.getElementById("current-temp");
        const weatherDesc = document.getElementById("weather-desc");
        const humidity = document.getElementById("humidity");
        const forecastContainer = document.getElementById("forecast-container");

        if (!weatherIcon || !tempElement || !weatherDesc || !humidity || !forecastContainer) {
            console.error("⚠️ No se encontraron algunos elementos del HTML.");
            return;
        }

        // Mostrar la información del clima
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDesc.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;

        // Configurar la imagen del clima
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        // Mostrar detalles adicionales en el pronóstico
        forecastContainer.innerHTML = `
            <p><strong>🌡️ Máx:</strong> ${Math.round(data.main.temp_max)}°C</p>
            <p><strong>🌡️ Mín:</strong> ${Math.round(data.main.temp_min)}°C</p>
            <p><strong>💧 Humedad:</strong> ${data.main.humidity}%</p>
        `;
    } catch (error) {
        console.error("❌ Error obteniendo los datos del clima:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchWeather);

