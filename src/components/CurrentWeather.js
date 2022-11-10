import "./CurrentWeather.css";

const CurrentWeather = ({ currentWeather, date }) => {
  const w = currentWeather.weatherResponse;

  const convertToHM = milliseconds => {
    const midnight = date.setHours(0, 0, 0, 0) / 1000;
    const a = milliseconds - midnight;
    let h, m;

    h = Math.floor(a / 60 / 60);
    m = Math.floor((a / 60 / 60 - h) * 60).toString();

    if (m.length === 1) {
      m = "0" + m;
    }

    return `${h}:${m}`;
  };

  const daylight = () => {
    let h, m, s;
    h = Math.floor(w.sys.sunset - w.sys.sunrise) / 60;
    m = Math.floor(w.sys.sunset - w.sys.sunrise - h) / 60;
    s = Math.floor(w.sys.sunset - w.sys.sunrise - h - m) / 60;

    return `${h}:${m}:${s}`;
  };

  console.log(daylight());

  return (
    <div className="weather">
      <div className="top">
        <div className="twilight">
          <div>
            <img
              src="https://www.svgrepo.com/show/349888/sunrise.svg"
              alt="sunrise"
            />
            <span>{convertToHM(w.sys.sunrise)}</span>
          </div>
          <div>
            <img
              src="https://www.svgrepo.com/show/349889/sunset.svg"
              alt="sunset"
            />
            <span>{convertToHM(w.sys.sunset)}</span>
          </div>
          {/* {daylight().toString()} */}
        </div>

        <p className="temperature">
          {Math.round(w.main.temp - 273.15)}
          {"°C"}
        </p>
        <p className="weather-description">{w.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
