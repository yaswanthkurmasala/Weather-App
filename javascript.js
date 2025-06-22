function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = "4489747f6213987f5683311c088e91f8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${icon}" alt="${weather[0].description}" />
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Condition:</strong> ${weather[0].main} - ${weather[0].description}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
