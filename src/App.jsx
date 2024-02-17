import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
function App() {
  const [city, setCity] = useState("");
  const [link, setLink] = useState("");
  const [data, setData] = useState([]);

  const cityName = useSelector((state)=>state.city);
  const country = useSelector((state)=>state.country);
  const status = useSelector((state)=>state.status);
  const temp = useSelector((state)=>state.temp);
  const wind = useSelector((state)=>state.wind);
  const picture = useSelector((state)=>state.picture);
  const is_day = useSelector((state)=>state.is_day);
  const humidity = useSelector((state)=>state.humidity);

  const dispatch = useDispatch();

  const findCity = () => {
    let cityInput = document.getElementById("city");
    let cityValue = cityInput.value;
    setCity(cityValue);
    let url = `https://api.weatherapi.com/v1/current.json?key=fddedcfb8498435ab2b124409241702&q=${cityValue}&aqi=no`;

    setLink(url);
  };
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=fddedcfb8498435ab2b124409241702&q=${city}&aqi=no`);
        if (response.ok) {
          const datafetched = await response.json();
          console.log(datafetched);
          setData(datafetched);
          dispatch({type:"UPDATE_CITY", payload:datafetched});
        }
      } catch (error) {
        console.error("ERROR FETCHING DATA:", error);
      }
    }

    if (city) {
      getData();
    }
  }, [city, dispatch]);

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-white text-white">
      <h1 className="text-black text-4xl mb-6">Enter your city below:</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          id="city"
          className="p-2 rounded-l-md text-black"
        />
        <button
          onClick={findCity}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {cityName && (
        <div id="cityComponent" className="text-center">
          <h1 className="text-black text-4xl font-bold mb-2">{cityName}</h1>
          <h1 className="text-black text-2xl mb-2">{country}</h1>
          <h1 className="text-black text-xl mb-2">{status}</h1>
          <h1 className="text-black text-6xl font-bold mb-2">{temp}°C</h1>
          <h1 className="text-black text-xl mb-2">Wind: {wind} km/h</h1>
          <img
            src={picture}
            alt={status}
            className="text-black  mx-auto mb-2"
          />
          <h1 className="text-black text-lg mb-2">
            {is_day ? "Day" : "Night"}
          </h1>
          <h1 className="text-black text-xl mb-2">Humidity: {humidity}%</h1>
        </div>
      )}


    </div>
  );
}

export default App;
