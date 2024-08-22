const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoibmFtZWxvY3lub3QiLCJhIjoiY2x4b3oyMjVrMGg5ODJxc2V4Z2d0MWJ3eiJ9.9S1Dlcf5q4Raz2Cdh_fXdQ";
  request(
    {
      url, //shorthand syntax
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to geo location service");
      } else if (body.features.length === 0) {
        callback(
          `Error returned from geo location service | Error : 'no data returned'`
        );
      } else {
        const place = body.features[0];
        callback(undefined, {
          longitude: place.properties.coordinates.longitude,
          latitude: place.properties.coordinates.latitude,
          address: place.properties.full_address,
        });
      }
    }
  );
};

module.exports = geocode;
