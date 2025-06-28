async function getWeather() {
    const apiKey = "YOUR API KEY"; // Your actual key
    const city = document.getElementById("cityInput").value;
    const resultDiv = document.getElementById("weatherResult");

    if (!city) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }

    resultDiv.innerHTML = "Fetching weather...";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        console.log("Response Status:", response.status); // For debugging

        if (!response.ok) {
            resultDiv.innerHTML = "City not found or API error.";
            return;
        }

        const data = await response.json();
        const weatherHTML = `
            <p><strong>City:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
        resultDiv.innerHTML = weatherHTML;
    } catch (error) {
        resultDiv.innerHTML = "Error fetching weather.";
        console.error(error);
    }
}
