// Professional API Client Implementation

class APIClient {
    constructor(baseURL = '', defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
        this.interceptors = {
            request: [],
            response: []
        };
    }
    
    // Add request interceptor
    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }
    
    // Add response interceptor
    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }
    
    // Apply request interceptors
    async applyRequestInterceptors(config) {
        let modifiedConfig = config;
        for (const interceptor of this.interceptors.request) {
            modifiedConfig = await interceptor(modifiedConfig);
        }
        return modifiedConfig;
    }
    
    // Apply response interceptors
    async applyResponseInterceptors(response) {
        let modifiedResponse = response;
        for (const interceptor of this.interceptors.response) {
            modifiedResponse = await interceptor(modifiedResponse);
        }
        return modifiedResponse;
    }
    
    // Main request method
    async request(endpoint, options = {}) {
        try {
            // Prepare request configuration
            let config = {
                url: this.baseURL + endpoint,
                method: 'GET',
                headers: { ...this.defaultHeaders },
                ...options
            };
            
            // Apply request interceptors
            config = await this.applyRequestInterceptors(config);
            
            // Make the request
            const response = await fetch(config.url, {
                method: config.method,
                headers: config.headers,
                body: config.body,
                signal: config.signal // For abortion
            });
            
            // Check if response is ok
            if (!response.ok) {
                throw new APIError(
                    `HTTP Error: ${response.status} ${response.statusText}`,
                    response.status,
                    endpoint
                );
            }
            
            // Apply response interceptors
            const interceptedResponse = await this.applyResponseInterceptors(response);
            
            return interceptedResponse;
            
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request was cancelled');
            } else if (error instanceof APIError) {
                throw error;
            } else {
                throw new NetworkError('Network request failed', error);
            }
        }
    }
    
    // GET request
    async get(endpoint, params = {}) {
        const url = new URL(this.baseURL + endpoint);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        
        const response = await this.request(url.pathname + url.search);
        return await response.json();
    }
    
    // POST request
    async post(endpoint, data) {
        return await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    // PUT request
    async put(endpoint, data) {
        return await this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    // DELETE request
    async delete(endpoint) {
        return await this.request(endpoint, {
            method: 'DELETE'
        });
    }
}

// Weather API Integration
class WeatherAPI {
    constructor() {
        this.apiKey = ''; // You'll need to get a free API key from OpenWeatherMap
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.client = new APIClient(this.baseURL);
        this.cache = new Map();
        this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
    }
    
    // Set API key (user needs to get free key from OpenWeatherMap)
    setApiKey(key) {
        this.apiKey = key;
    }
    
    // Get weather by city name
    async getWeatherByCity(cityName) {
        if (!this.apiKey) {
            throw new Error('API key is required. Get a free key from OpenWeatherMap');
        }
        
        const cacheKey = `weather_${cityName}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }
        
        try {
            const data = await this.client.get('/weather', {
                q: cityName,
                appid: this.apiKey,
                units: 'metric'
            });
            
            // Cache the result
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            throw new APIError(`Failed to fetch weather data: ${error.message}`, 0, '/weather');
        }
    }
    
    // Get 5-day forecast
    async getForecast(cityName) {
        if (!this.apiKey) {
            throw new Error('API key is required');
        }
        
        try {
            return await this.client.get('/forecast', {
                q: cityName,
                appid: this.apiKey,
                units: 'metric'
            });
        } catch (error) {
            throw new APIError(`Failed to fetch forecast: ${error.message}`, 0, '/forecast');
        }
    }
}

// GitHub API Integration (for portfolio projects)
class GitHubAPI {
    constructor() {
        this.baseURL = 'https://api.github.com';
        this.client = new APIClient(this.baseURL);
    }
    
    // Get user repositories
    async getUserRepos(username) {
        try {
            return await this.client.get(`/users/${username}/repos`, {
                sort: 'updated',
                per_page: 10
            });
        } catch (error) {
            throw new APIError(`Failed to fetch GitHub repos: ${error.message}`, 0, `/users/${username}/repos`);
        }
    }
    
    // Get user profile
    async getUserProfile(username) {
        try {
            return await this.client.get(`/users/${username}`);
        } catch (error) {
            throw new APIError(`Failed to fetch GitHub profile: ${error.message}`, 0, `/users/${username}`);
        }
    }
}

// Quote API for inspirational quotes
class QuoteAPI {
    constructor() {
        this.baseURL = 'https://api.quotable.io';
        this.client = new APIClient(this.baseURL);
    }
    
    // Get random quote
    async getRandomQuote() {
        try {
            return await this.client.get('/random');
        } catch (error) {
            // Fallback quotes if API fails
            const fallbackQuotes = [
                { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" }
            ];
            return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            

        }
    }
    
    // Get quote by tag
    async getQuoteByTag(tag) {
        try {
            return await this.client.get('/random', { tags: tag });
        } catch (error) {
            return await this.getRandomQuote(); // Fallback
        }
    }
}

// Initialize API clients
const weatherAPI = new WeatherAPI();
const githubAPI = new GitHubAPI();
const quoteAPI = new QuoteAPI();

// Request manager for handling multiple requests
class RequestManager {
    constructor() {
        this.activeRequests = new Map();
        this.requestQueue = [];
        this.maxConcurrent = 5;
        this.processing = false;
    }
    
    // Add request to queue
    async enqueue(requestFunc, priority = 1) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({
                requestFunc,
                priority,
                resolve,
                reject,
                id: Date.now() + Math.random()
            });
            
            this.requestQueue.sort((a, b) => b.priority - a.priority);
            this.processQueue();
        });
    }
    
    // Process request queue
    async processQueue() {
        if (this.processing || this.requestQueue.length === 0) return;
        if (this.activeRequests.size >= this.maxConcurrent) return;
        
        this.processing = true;
        
        while (this.requestQueue.length > 0 && this.activeRequests.size < this.maxConcurrent) {
            const request = this.requestQueue.shift();
            this.executeRequest(request);
        }
        
        this.processing = false;
    }
    
    // Execute individual request
    async executeRequest(request) {
        const { requestFunc, resolve, reject, id } = request;
        
        this.activeRequests.set(id, request);
        
        try {
            const result = await requestFunc();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.activeRequests.delete(id);
            this.processQueue();
        }
    }
    
    // Cancel all requests
    cancelAll() {
        this.requestQueue.length = 0;
        this.activeRequests.forEach(request => {
            request.reject(new Error('Request cancelled'));
        });
        this.activeRequests.clear();
    }
}

// Initialize request manager
const requestManager = new RequestManager();

// Export for global use
window.APIClient = APIClient;
window.WeatherAPI = WeatherAPI;
window.GitHubAPI = GitHubAPI;
window.QuoteAPI = QuoteAPI;
window.RequestManager = RequestManager;
window.weatherAPI = weatherAPI;
window.githubAPI = githubAPI;
window.quoteAPI = quoteAPI;
window.requestManager = requestManager;
