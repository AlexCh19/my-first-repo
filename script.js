async function getWeather() {
  const city = "Dnipro";
  const apiKey = "1054ba5626adb1dc6de266ebaa39549e"; // Замінено YOUR_API_KEY
  const resultDiv = document.getElementById("result");

  if (!resultDiv) {
    console.error("Елемент з id='result' не знайдено.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=ua&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Не вдалося отримати дані з сервера.");
    }

    const data = await response.json();

    const icon = data.weather?.[0]?.icon || "01d";
    const description = data.weather?.[0]?.description || "Немає опису";
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const weatherInfo = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${iconUrl}" alt="Погода" class="weather-icon"/>
      <p><strong>Температура:</strong> ${data.main.temp} °C</p>
      <p><strong>Погода:</strong> ${description}</p>
      <p><strong>Вологість:</strong> ${data.main.humidity}%</p>
      <p><strong>Вітер:</strong> ${data.wind.speed} м/с</p>
      <p><em>Оновлено: ${new Date().toLocaleTimeString("uk-UA")}</em></p>
    `;

    resultDiv.innerHTML = weatherInfo;
  } catch (error) {