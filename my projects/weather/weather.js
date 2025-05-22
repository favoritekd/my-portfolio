const weatherApiKey = '52d9b1f0b36cd0c33701d03af58becb7'; // Your OpenWeatherMap API Key
const newsApiKey = '7b3d9623147b4643a40f26e57648bcd1'; // Your NewsAPI Key
const defaultCity = 'Accra'; // Default city to load on page load

// Function to fetch weather data
function getWeather(city = defaultCity) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  // Show loading spinner
  document.getElementById('loading-spinner').style.display = 'block';

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const cityName = data.name;
        const temperature = `${Math.round(data.main.temp)}°C`;
        const description = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Update weather data
        document.getElementById('city-name').innerText = cityName;
        document.getElementById('temperature').innerText = temperature;
        document.getElementById('description').innerText = description;
        document.getElementById('weather-icon').src = icon;
        document.getElementById('loading-spinner').style.display = 'none';
      } else {
        // Handle errors (city not found, etc.)
        document.getElementById('city-name').innerText = 'City not found';
        document.getElementById('loading-spinner').style.display = 'none';
      }
    })
    .catch(error => {
      console.error(error);
      document.getElementById('city-name').innerText = 'Error loading weather data';
      document.getElementById('loading-spinner').style.display = 'none';
    });
}

// Function to search weather for a city
function searchWeather() {
  const city = document.getElementById('searchInput').value;
  if (city) {
    getWeather(city);
  }
}

// Function to fetch weather news
function getWeatherNews() {
  const newsApiUrl = `https://newsapi.org/v2/everything?q=weather&apiKey=${newsApiKey}`;

  fetch(newsApiUrl)
    .then(response => response.json())
    .then(data => {
      let newsHTML = '';
      data.articles.forEach(article => {
        newsHTML += `
                    <div class="news-item">
                        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                        <p>${article.description}</p>
                    </div>
                `;
      });
      document.getElementById('news-container').innerHTML = newsHTML;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('news-container').innerHTML = 'Failed to load news.';
    });
}

//
// Toggle Dark Mode
const toggleButton = document.getElementById("dark-mode-toggle");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Optional: change button text/icon
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Light Mode";
  } else {
    toggleButton.textContent = "Dark Mode";
  }
});

