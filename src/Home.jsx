import React, { useEffect, useState, useSyncExternalStore } from "react";
import "./Style2.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogin = () => {
    if (username === "demo" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid credentials. Please try again");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    setUsername("");
    setPassword("");
  };

  async function fetchWeather(e) {
    const enteredCity = e.target.value;
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=cbd662859de44b87b6250119230612&q=${enteredCity}&days=3&aqi=no`
      );
      const data = await res.json();
      setCity(enteredCity);
      setWeatherData(data);
      getDayOfWeek();
    } catch (error) {}
  }

  const getDayOfWeek = (offset) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const dayIndex = today.getDay() + offset;
    return daysOfWeek[dayIndex];
  };

  return (
    <>
      <div className="container">
        <div className="container-Main">
          <h2>WELCOME TO MY WEATHER APP</h2>
          {!isLoggedIn ? (
            <div className="logIn">
              <h1>Login To Enter Weather App</h1>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button  className="btn" onClick={handleLogin}>LogIn</button>
            </div>
          ) : (
            <div>
              <button className="btn logoutBtn" onClick={handleLogout}>Logout</button>
              <div className="searchBox">
                <input
                  type="search"
                  className="searchInp"
                  placeholder="Enter city name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchWeather(e);
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className="container-box">
            <h3>CITY NAME: {city}</h3>
            <div className="part1">
              <div className="left">
                <span className="left-header">
                  <h3>WEATHER CONDITION</h3>
                </span>
                <span className="left-body">
                  {weatherData?.current?.condition?.icon && (
                    <img
                      src={`http:${weatherData.current.condition.icon}`}
                      alt="weather icon"
                    />
                  )}
                  {weatherData?.current.condition?.text && (
                    <p>{weatherData.current.condition.text}</p>
                  )}
                </span>
              </div>
              <div className="right">
                <p>Wind:{weatherData?.current?.wind_kph} kph</p>
                <p>Precip: {weatherData?.current?.precip_in} in</p>
                <p>Pressure: {weatherData?.current?.pressure_in} in</p>
                <h4>{weatherData?.current?.temp_f} °f</h4>
              </div>
            </div>
            <div className="part2">
              <h3>UPCOMING 3 DAYS WEATHER REPORT</h3>
              <div className="part2-body">
                {weatherData?.forecast?.forecastday
                  .slice(0, 3)
                  .map((day, index) => (
                    <div key={day.date}>
                      <div>{getDayOfWeek(index)}</div>
                      {day.day.condition.icon && (
                        <img
                          src={`http:${day.day.condition.icon}`}
                          alt={`Weather icon for ${day.date}`}
                        />
                      )}
                      <p>{day.day.maxtemp_f} °f </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
