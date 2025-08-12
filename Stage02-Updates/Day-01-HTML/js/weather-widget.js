  this.apiKey = apiKey;
  this.weatherAPI = new WeatherAPI();
  if (apiKey) this.weatherAPI.setApiKey(apiKey);

  this.currentCity = window.storage.get('weather_city') || 'London';
  this.isLoading = false;

  this.init();
}

init() {
  this.render();
  this.setupEventListeners();
  this.loadWeather();
  this.setupAutoRefresh();
}

render() {
  this.container.innerHTML = `
    <div class="project-card weather-widget">
      <div class="weather-header">
        <h3>🌤️ Weather Today</h3>
        <div class="weather-controls">
          <input 
            type="text" 
            id="cityInput" 
            placeholder="Enter city name..." 
            value="${this.currentCity}"
            class="city-input"
          />
          <button id="searchWeather" class="weather-search-btn">Search</button>
          <button id="refreshWeather" class="weather-refresh-btn">🔄</button>
        </div>
      </div>
      
      <div class="weather-content">
        <div class="weather-loading" style="display: none;">
          <div class="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
        
        <div class="weather-error" style="display: none;">
          <p class="error-message">Failed to load weather data</p>
          <button class="retry-btn">Try Again</button>
        </div>
        
        <div class="weather-data" style="display: none;">
          <div class="weather-main">
            <div class="weather-icon">
              <img src="Stage02-Updates/Day-01-HTML/assets/images/download.png" alt="Weather icon" id="weatherIcon"/>
            </div>
            <div class="weather-info">
              <h4 class="city-name" id="cityName">-</h4>
              <div class="temperature" id="temperature">--°C</div>
              <div class="weather-description" id="description">-</div>
            </div>
          </div>
          
          <div class="weather-details">
            <div class="weather-detail">
              <span class="detail-label">Feels like</span>
              <span class="detail-value" id="feelsLike">--°C</span>
            </div>
            <div class="weather-detail">
              <span class="detail-label">Humidity</span>
              <span class="detail-value" id="humidity">--%</span>
            </div>
            <div class="weather-detail">
              <span class="detail-label">Wind Speed</span>
              <span class="detail-value" id="windSpeed">-- km/h</span>
            </div>
            <div class="weather-detail">
              <span class="detail-label">Pressure</span>
              <span class="detail-value" id="pressure">-- hPa</span>
            </div>
          </div>
          
          <div class="weather-meta">
            <small class="last-updated" id="lastUpdated">Last updated: Never</small>
          </div>
        </div>
      </div>
      
      <div class="weather-footer">
        <small>
          ${this.apiKey ? 'Live weather data from OpenWeatherMap' : 'Add API key for live data'}
        </small>
      </div>
    </div>
  `;
}

setupEventListeners() {
  const searchBtn = document.getElementById('searchWeather');
  const refreshBtn = document.getElementById('refreshWeather');
  const cityInput = document.getElementById('cityInput');
  const retryBtn = this.container.querySelector('.retry-btn');

  searchBtn?.addEventListener('click', () => this.searchWeather());
  refreshBtn?.addEventListener('click', () => this.refreshWeather());
  retryBtn?.addEventListener('click', () => this.loadWeather());

  cityInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      this.searchWeather();
    }
  });

  cityInput?.addEventListener('change', (e) => {
    const val = e.target.value?.trim();
    if (val) {
      this.currentCity = val;
      window.storage.set('weather_city', val);
    }
  });
}

async searchWeather() {
  const cityInput = document.getElementById('cityInput');
  const city = cityInput?.value.trim();

  if (!city) {
    window.errorHandler.displayNotification('Please enter a city name', 'warning');
    return;
  }

  this.currentCity = city;
  window.storage.set('weather_city', city);
  await this.loadWeather();
}

async refreshWeather() {
  if (this.weatherAPI.cache) {
    this.weatherAPI.cache.delete(`weather_${this.currentCity}`);
  }
  await this.loadWeather();
}

async loadWeather() {
  if (this.isLoading) return;

  this.isLoading = true;
  this.showLoading(true);
  this.showError(false);
  this.showData(false);

  try {
    let weatherData;

    if (this.apiKey) {
      weatherData = await this.weatherAPI.getWeatherByCity(this.currentCity);
    } else {
      weatherData = this.getMockWeatherData();
      if (window.AsyncUtils?.delay) {
        await window.AsyncUtils.delay(1000);
      } else {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    this.displayWeatherData(weatherData);
    this.showData(true);
  } catch (error) {
    console.error('Weather loading failed:', error);
    this.showError(true, error.message || 'Failed to load weather data');
    window.errorHandler.logError(error, 'WeatherWidget');
  } finally {
    this.isLoading = false;
    this.showLoading(false);
  }
}

displayWeatherData(data) {
  const elements = {
    cityName: document.getElementById('cityName'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    feelsLike: document.getElementById('feelsLike'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    weatherIcon: document.getElementById('weatherIcon'),
    lastUpdated: document.getElementById('lastUpdated')
  };

  const name = data?.name || this.currentCity;
  const temp = Math.round(data?.main?.temp ?? 20);
  const feels = Math.round(data?.main?.feels_like ?? 20);
  const humidity = data?.main?.humidity ?? 60;
  const pressure = data?.main?.pressure ?? 1013;
  const windKmh = Math.round(((data?.wind?.speed ?? 5) * 3.6));
  const firstWeather = Array.isArray(data?.weather) ? data.weather : undefined;
  const description = firstWeather?.description || 'Clear sky';
  const icon = firstWeather?.icon || null;
  const weatherMain = firstWeather?.main || 'Clear';

  if (elements.cityName) elements.cityName.textContent = name;
  if (elements.temperature) elements.temperature.textContent = `${temp}°C`;
  if (elements.description) elements.description.textContent = description;
  if (elements.feelsLike) elements.feelsLike.textContent = `${feels}°C`;
  if (elements.humidity) elements.humidity.textContent = `${humidity}%`;
  if (elements.windSpeed) elements.windSpeed.textContent = `${windKmh} km/h`;
  if (elements.pressure) elements.pressure.textContent = `${pressure} hPa`;
  if (elements.lastUpdated) elements.lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;

  if (elements.weatherIcon) {
    if (icon) {
      elements.weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      elements.weatherIcon.alt = description;
    } else {
      elements.weatherIcon.alt = description;
    }
  }

  this.updateWeatherTheme(weatherMain);
}

updateWeatherTheme(weatherMain = 'Clear') {
  const widget = this.container.querySelector('.weather-widget');
  if (!widget) return;

  widget.classList.remove('weather-sunny', 'weather-cloudy', 'weather-rainy', 'weather-snowy');

  switch ((weatherMain || '').toLowerCase()) {
    case 'clear':
      widget.classList.add('weather-sunny');
      break;
    case 'clouds':
      widget.classList.add('weather-cloudy');
      break;
    case 'rain':
    case 'drizzle':
      widget.classList.add('weather-rainy');
      break;
    case 'snow':
      widget.classList.add('weather-snowy');
      break;
    default:
      break;
  }
}

getMockWeatherData() {
  const mockData = [
    {
      name: 'London',
      main: { temp: 18, feels_like: 16, humidity: 65, pressure: 1013 },
      weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
      wind: { speed: 3.2 }
    },
    {
      name: 'New York',
      main: { temp: 22, feels_like: 24, humidity: 55, pressure: 1015 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 2.1 }
    },
    {
      name: 'Tokyo',
      main: { temp: 25, feels_like: 27, humidity: 70, pressure: 1008 },
      weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
      wind: { speed: 4.5 }
    }
  ];

  const found = mockData.find(city =>
    city.name.toLowerCase().includes(this.currentCity.toLowerCase())
  );
  return found || mockData;
}

showLoading(show) {
  const loading = this.container.querySelector('.weather-loading');
  if (loading) loading.style.display = show ? 'flex' : 'none';
}

showError(show, message = null) {
  const errorDiv = this.container.querySelector('.weather-error');
  if (errorDiv) {
    errorDiv.style.display = show ? 'block' : 'none';
    if (message) {
      const errorMsg = errorDiv.querySelector('.error-message');
      if (errorMsg) errorMsg.textContent = message;
    }
  }
}

showData(show) {
  const data = this.container.querySelector('.weather-data');
  if (data) data.style.display = show ? 'block' : 'none';
}

setupAutoRefresh() {
  setInterval(() => {
    if (!this.isLoading) {
      this.refreshWeather();
    }
  }, 10 * 60 * 1000);
}

setApiKey(apiKey) {
  this.apiKey = apiKey;
  this.weatherAPI.setApiKey(apiKey);
  this.loadWeather();
}
