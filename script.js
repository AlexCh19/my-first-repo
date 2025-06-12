async function getWeather() {
  const city = "Dnipro";
  const apiKey = "YOUR_API_KEY"; // 1054ba5626adb1dc6de266ebaa39549e
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Не вдалося отримати дані.");
    }

    const data = await response.json();

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherInfo = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="Погода" class="weather-icon"/>
      <p><strong>Температура:</strong> ${data.main.temp} °C</p>
      <p><strong>Погода:</strong> ${data.weather[0].description}</p>
      <p><strong>Вологість:</strong> ${data.main.humidity}%</p>
      <p><strong>Вітер:</strong> ${data.wind.speed} м/с</p>
      <p><em>Оновлено: ${new Date().toLocaleTimeString()}</em></p>
    `;

    resultDiv.innerHTML = weatherInfo;
  } catch (error) {
    resultDiv.innerHTML = `Помилка: ${error.message}`;
  }
}

// Запуск при завантаженні
window.onload = () => {
  getWeather();
  setInterval(getWeather, 60000); // Оновлення щохвилини
};