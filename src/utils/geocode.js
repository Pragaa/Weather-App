const request = require('request');


const geocode = (adress, callback) => {
  let geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoicHJhZ2FhIiwiYSI6ImNqdDRpc2loODFrNzkzem14NjJndjNrcGkifQ._ZM8BhLrSdexRYPwdyD_QQ`

  request( {url: geocodeUrl, json: true}, (error, response) => {
   

    if(error) {
      callback('unable to connect to location')
    } else if (response.body.features.length === 0) {
      callback('unable to find location. Try another search')
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
      })
    }
  })
}





module.exports = geocode