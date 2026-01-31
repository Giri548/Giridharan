let cities = [];
let weatherData = [];


async function loadCities() {
  const response = await fetch("file.json");
  cities = await response.json();
}


async function fetchWeather(city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    city: city.name,
    temperature: data.current_weather.temperature,
  };
}


async function loadWeather() {
  try {
    await loadCities();

    
    const results = await Promise.all(cities.map(fetchWeather));
    weatherData = results;

   
    const temps = weatherData.map((w) => w.temperature);

    
    const warmCities = weatherData.filter((w) => w.temperature > 25);

   
    const maxTemp = temps.reduce((max, t) => (t > max ? t : max), temps[0]);

    
    displayTable(warmCities);
    document.getElementById("maxTemp").innerText =
      `🔥 Maximum Temperature: ${maxTemp} °C`;

    document.getElementById("jsonViewer").textContent = JSON.stringify(
      weatherData,
      null,
      2,
    );
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}


function displayTable(data) {
  const tbody = document.querySelector("#weatherTable tbody");
  tbody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.city}</td>
      <td>${item.temperature}</td>
    `;
    tbody.appendChild(row);
  });
}


function toggleJSON() {
  document.getElementById("jsonViewer").classList.toggle("hidden");
}


loadWeather();   