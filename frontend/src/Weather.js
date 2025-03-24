import React, { useState } from 'react';
import axios from 'axios';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaSmog } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState('metric');

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://rain-or-shine-backend.onrender.com`, {
                params: { city, unit },
            });
            setWeather(response.data);
        } catch (err) {
            setError('City not found');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'clear':
                return <FaSun size={190} color="orange" />;
            case 'clouds':
                return <FaCloud size={190} color="rgb(85, 85, 85)" />;
            case 'rain':
                return <FaCloudRain size={190} color="blue" />;
            case 'snow':
                return <FaSnowflake size={190} color="skyblue" />;
            case 'thunderstorm':
                return <FaBolt size={190} color="yellow" />;
            case 'mist':
            case 'haze':
            case 'fog':
                return <FaSmog size={190} color="rgb(222, 222, 222)" />;
            case 'dust':
            case 'smoke':
                return <FaSmog size={190} color="rgb(128, 128, 128)" />;
            default:
                return null;
        }
    };

    return (
        <div className="weather-container">
            <header>
                <img src="https://img.icons8.com/?size=100&id=15340&format=png&color=000000" alt="weather" className="logo" />
                <h2>Rain or Shine - Weather App</h2>
            </header>

            <div className="weather-card">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="city-input"
                />

                <button onClick={fetchWeather} className="get-weather-btn">
                    Get Weather
                </button>

                {loading && <Spinner animation="border" />}

                {error && <div className="error-message">{error}</div>}

                {weather && (
                    <div>
                        <div className="weather-details">
                            <div className="icon-section">
                                {getWeatherIcon(weather.weather[0].main)}
                            </div>
                            <div className="info-section">
                                <p className="temperature">{weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                                <p className="description">{weather.weather[0].description}</p>
                                <p className="location">{weather.name}</p>
                            </div>
                        </div>

                        <div className="additional-info">
                            <div className="humidity">
                                <img src="https://img.icons8.com/?size=60&id=15365&format=png&color=000000" alt="Humidity" />
                                <span>{weather.main.humidity}%</span>
                                <p>Humidity</p>
                            </div>
                            <div className="wind-speed">
                                <img src="https://img.icons8.com/?size=60&id=NFarzlQfH1Dz&format=png&color=ffffff" alt="Wind-Speed" />
                                <span>{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
                                <p>Wind Speed</p>
                            </div>
                        </div>

                        <div className="unit-selection">
                            <label>
                                <input
                                    type="radio"
                                    value="metric"
                                    checked={unit === 'metric'}
                                    onChange={() => setUnit('metric')}
                                /> Metric
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="imperial"
                                    checked={unit === 'imperial'}
                                    onChange={() => setUnit('imperial')}
                                /> Imperial
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
