const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=448601986ad3c6935cb1893ea9844f74&query=" +
    latitude +
    "," +
    longitude +
    " &units=m";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to Weather services!`, undefined);
    } else if (body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
