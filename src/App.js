import "./App.css";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import BackgroundImage from "./components/BackgroundImage";
import { WEATHER_API_URL, WEATHER_API_KEY, IMAGE_API_CLIENT } from "./API";
import { useState, useEffect } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [place, setPlace] = useState();
  const date = new Date();
  // const [image, setImage] = useState(null);

  const handleOnSearchChange = searchData => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async response => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ weatherResponse });
        setForecast({ forecastResponse });
        setPlace(forecastResponse.city.name);
      })
      .catch(err => console.log(err));

    //PROBLEM: if city search returns 0 resulsts there is no background, perhaps base background of the cloud/forecast?
    // IMAGE_API_CLIENT.photos.search({ query, per_page: 1 }).then(response => { setImage(response) });
  };

  return (
    <div className="App">
      <div>
        <Search onSearchChange={handleOnSearchChange} place={place} />
        {currentWeather && (
          <CurrentWeather currentWeather={currentWeather} date={date} />
        )}
      </div>
      {forecast && <Forecast forecast={forecast} date={date} />}
      {/* {image && <BackgroundImage image={image} />} */}
    </div>
  );
}

export default App;
