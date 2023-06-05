import React, { useState, useEffect } from "react";
import "./style.css";
import clearImage from "../public/images/clear.png";
import cloudImage from "../public/images/clouds.png";
import rainImage from "../public/images/rain.png";
import snowImage from "../public/images/snow.png";
import humidityImage from "../public/images/humidity.png";
import drizzleImage from "../public/images/drizzle.png";
import mistImage from "../public/images/mist.png";
import windImage from "../public/images/wind.png";

const Weather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = "d3d48be238ecb6ee1713db189f686066";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
          setIsLoading(false);
          // Perform error handling, e.g., display an error message to the user
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setIsLoading(false);
      // Perform error handling, e.g., display an error message to the user
    }
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    setIsLoading(true);
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsLoading(false);
      // Perform error handling, e.g., display an error message to the user
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (location) {
      fetchWeatherByLocation();
    }
  };

  const selectWeatherImage = (description) => {
    if (description.includes("clear")) {
      return clearImage;
    } else if (description.includes("cloud")) {
      return cloudImage;
    } else if (description.includes("rain")) {
      return rainImage;
    } else if (description.includes("snow")) {
      return snowImage;
    } else if (description.includes("haze")) {
      return humidityImage;
    } else if (description.includes("drizzle")) {
      return drizzleImage;
    } else if (description.includes("mist")) {
      return mistImage;
    } else if (description.includes("wind")) {
      return windImage;
    } else {
      return null;
    }
  };

  const fetchWeatherByLocation = async () => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Location not found"
            : "Failed to fetch weather data"
        );
      }
      const data = await response.json();
      if (!data || !data.main || !data.weather) {
        throw new Error("No weather data available");
      }
      setWeatherData(data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
      setErrorMessage(error.message);
    }
  };

  return (
    <React.Fragment>
      <h1>Weather App</h1>
      <div className="container">
        {isLoading ? (
          <div class="loader">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        ) : (
          <React.Fragment>
              {weatherData ? (
              <div className="weather-details">
                <h2>{weatherData.name}</h2>
                <img
                  src={selectWeatherImage(weatherData.weather[0].description)}
                  alt={weatherData.weather[0].description}
                />
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Description: {weatherData.weather[0].description}</p>
              </div>
            ) : (
              errorMessage
            )}
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={handleLocationChange}
              />
              <button type="submit">Search</button>
            </form>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Weather;
