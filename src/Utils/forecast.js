const request = require("request");

const forecast = (longitude, latitude, address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ceb1bb1105657bc486c6a9eca6565a83&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";

  request(
    {
      url, //shorthand syntax
      json: true, //response is json
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weather service");
      } else if (body.error) {
        callback(
          `Error returned from weather service | Error : ${body.error.code}`
        );
      } else {
        // const data = JSON.parse(response.body);
        // console.log(response.body.current);
        const current = body.current;
        callback(undefined, {
          address: address,
          description: current.weather_descriptions[0],
          temperature: current.temperature,
          feelslike: current.feelslike,
        });
      }
    }
  );
};

module.exports = forecast;
