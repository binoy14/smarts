import axios from 'axios';

import { WEATHER_API_KEY } from '../../config';

const uri = `https://api.wunderground.com/api/${WEATHER_API_KEY}/forecast/q/NY/Newark.json`;

export default function forecast() {
  return axios
    .get(uri)
    .then(response => response.data)
    .then(body => body
        .forecast
        .simpleforecast
        .forecastday
        .map(day => ({
          rain: day.pop,
          temperature: day.high.fahrenheit || day.low.fahrenheit,
          icon: day.icon,
        })))
    .catch(error => console.error(error));
}
