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

      const condition = weather[0].main.toLowerCase();
      const body = document.body;
      body.classList.remove("sunny-bg", "cloudy-bg", "rainy-bg", "snowy-bg");

      if (condition.includes("clear")) {
        body.classList.add("sunny-bg");
      } else if (condition.includes("cloud")) {
        body.classList.add("cloudy-bg");
      } else if (condition.includes("rain")) {
        body.classList.add("rainy-bg");
      } else if (condition.includes("snow")) {
        body.classList.add("snowy-bg");
      }

      setWeatherEffect(condition);
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function setWeatherEffect(condition) {
  const effectContainer = document.getElementById("weatherEffect");
  effectContainer.innerHTML = "";

  if (condition.includes("rain")) {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.className = "rain-drop";
      drop.style.left = Math.random() * window.innerWidth + "px";
      drop.style.animationDelay = Math.random() + "s";
      effectContainer.appendChild(drop);
    }
  } else if (condition.includes("snow")) {
    for (let i = 0; i < 80; i++) {
      const flake = document.createElement("div");
      flake.className = "snow-flake";
      flake.style.left = Math.random() * window.innerWidth + "px";
      flake.style.animationDelay = Math.random() * 5 + "s";
      flake.style.opacity = Math.random();
      effectContainer.appendChild(flake);
    }
  } else if (condition.includes("clear")) {
    const sun = document.createElement("div");
    sun.className = "sun-sparkle";
    effectContainer.appendChild(sun);
  }
}

function getLocationWeather() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = "4489747f6213987f5683311c088e91f8";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("Weather not found");
          return response.json();
        })
        .then(data => {
          const { name, main, weather } = data;
          const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
          document.getElementById("weatherResult").innerHTML = `
            <h2>${name} (Current Location)</h2>
            <img src="${icon}" alt="${weather[0].description}" />
            <p><strong>Temperature:</strong> ${main.temp}°C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Condition:</strong> ${weather[0].main} - ${weather[0].description}</p>
          `;
          const condition = weather[0].main.toLowerCase();
          document.body.classList.remove("sunny-bg", "cloudy-bg", "rainy-bg", "snowy-bg");
          if (condition.includes("clear")) {
            document.body.classList.add("sunny-bg");
          } else if (condition.includes("cloud")) {
            document.body.classList.add("cloudy-bg");
          } else if (condition.includes("rain")) {
            document.body.classList.add("rainy-bg");
          } else if (condition.includes("snow")) {
            document.body.classList.add("snowy-bg");
          }
          setWeatherEffect(condition);
        })
        .catch(err => {
          document.getElementById("weatherResult").innerHTML = `<p>Error: ${err.message}</p>`;
        });
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}
