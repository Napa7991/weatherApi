import React, { useEffect, useState } from "react";
import "./Style.css";

const TryHome = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  async function fetchWeather() {
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=cbd662859de44b87b6250119230612&q=${city}&days=3&aqi=no`
      );
      const data = await res.json();
      if (res.ok) {
        setWeatherData(data);
        console.log(data);
      } else {
        console.log(`Error in else`);
      }
    } catch (error) {
      console.log(`Error in catch ${error}`);
    }
  }

  const getDayOfWeek = (offset) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayIndex = (today.getDay() + offset) % 7;
    return daysOfWeek[dayIndex];
  };

  return (
    <>
      <div className="container">
        <div className="container-Main">
          <div className="searchBox">
            <input
              className="searchInp"
              type="search"
              placeholder="Enter city name"
              onChange={(e) => setCity(e.target.value)}
            />
            <h3>City Name: {city}</h3>
          </div>
          <div className="container-box">
            <div className="part1">
              <div className="left">
                Condition: {weatherData?.current?.condition?.text}
              </div>
              <div className="right">
                <p>Wind: {weatherData?.current?.wind_kph} km/h</p>
                <p>Precip: {weatherData?.current?.precip_mm}</p>
                <p>Pressure: {weatherData?.current?.pressure_in}</p>
                <h4>Degree: {weatherData?.current?.wind_degree}</h4>
              </div>
            </div>
            <div className="part2">
              {weatherData?.forecast?.forecastday
                .slice(0, 3)
                .map((day, index) => (
                  <div key={day.date}>
                    <div>{getDayOfWeek(index)}</div>
                    <p>Temp: {day.day.maxtemp_f}</p>
                    <p>--------</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={fetchWeather}>Fetch data</button>
      {weatherData && <pre>{JSON.stringify(weatherData)}</pre>}

      <h3>Wind: {weatherData?.current?.wind_kph} km/h</h3>
      <h2>Temp: {weatherData?.current?.temp_f}</h2>
    </>
  );
};

export default TryHome;
