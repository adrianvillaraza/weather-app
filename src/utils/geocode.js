const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYWRyaWFudmlsbGFyYXphIiwiYSI6ImNrdHdhYXo1azJoeW8ycG8zb2UybjVodjMifQ.QrzLacN2TN-lcx2mkJT0iQ&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to Weather services!`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to find location`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
