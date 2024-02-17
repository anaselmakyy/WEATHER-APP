import { createStore } from "redux";


const initialState = {
    city:"",
    country:"",
    condition:"",
    temp:null,
    wind:null,
    picture:"",
    is_day:null,
    humidity:null,

};

const reducer = (state = initialState, action) => {
    if (action.type === "UPDATE_CITY") {
      const data = action.payload;
      return {
        ...state,
        city: data.location.name,
        country: data.location.country,
        condition: data.current.condition.text,
        temp: data.current.temp_c,
        wind: data.current.wind_kph,
        picture: data.current.condition.icon,
        is_day: data.current.is_day,
        humidity: data.current.humidity,
      };
    }
    return state;
  };
  

const store = createStore(reducer);
export default store;