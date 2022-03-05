import "./App.css";
import { useState } from "react";
function App() {
  const api = {
    url: "https://api.openweathermap.org/data/2.5",
    key: process.env.REACT_APP_WEATHER_APP,
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  const [query, setquery] = useState("");
  const [Weather, setcWeather] = useState({});
  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.url}/weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setcWeather(res);
          setquery("");
        });
    }
  };
  return (
    <div
      className={`${
        Weather.main && Weather.main.temp > 16 ? "App warm" : "App"
      }`}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search...."
            className="search-bar"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {Weather.main && (
          <>
            <div className="location-box">
              <div className="location">
                {Weather.name},{Weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(Weather.main.temp)}°C</div>
              <div className="weather">{Weather.weather[0].main}</div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
