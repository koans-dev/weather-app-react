import React, { useState } from "react";
import { WiThermometer, WiHumidity, WiCloudUp } from "react-icons/wi";
import { BiMap } from "react-icons/bi";
import axios from "axios";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setLocation("");
      });
    }
  };

  return (
    <div className="app">
      <div className="wrapper">
        <header>
          <i>
            <WiCloudUp />
          </i>
          Weather App
        </header>

        <section className="input-part">
          <input
            type="text"
            placeholder="Enter city name"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            spellheck="false"
          />

          <div className="separator"></div>
        </section>
        {data.main ? (
          <section className="weather-part">
            <img
              src={`./assets/${data.weather ? data.weather[0].icon : null}.svg`}
              alt="Weather Icon"
            />
            <div className="temp">
              <span className="numb">
                {data.main ? data.main.temp.toFixed() : null}
              </span>
              <span className="deg">°</span>C
            </div>
            <div className="weather">
              {data.weather ? data.weather[0].main : null}
            </div>
            <div className="location">
              <i>
                <BiMap />
              </i>
              <span>{data.name}</span>
            </div>
            <div className="bottom-details">
              <div className="column feels">
                <i>
                  <WiThermometer />
                </i>
                <div className="details">
                  <div className="temp">
                    <span className="numb">
                      {data.main ? data.main.feels_like.toFixed() : null}{" "}
                    </span>
                    <span className="deg">°</span>C
                  </div>
                  <p>Feels like </p>
                </div>
              </div>
              <div className="column humidity">
                <i>
                  <WiHumidity />
                </i>
                <div className="details">
                  <span className="numb">
                    {" "}
                    {data.main ? data.main.humidity.toFixed() : null}
                  </span>
                  <p> Humidity</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}

export default App;
