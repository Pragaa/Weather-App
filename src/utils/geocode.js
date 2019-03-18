const request = require('request');


const geocode = (adress, callback) => {
  let geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoicHJhZ2FhIiwiYSI6ImNqdDRpc2loODFrNzkzem14NjJndjNrcGkifQ._ZM8BhLrSdexRYPwdyD_QQ`

  request( {url: geocodeUrl, json: true}, (error, {body}) => {
    let {features: geo} = body;

    if(error) {
      callback('unable to connect to location')
    } else if (geo.length === 0) {
      callback('unable to find location. Try another search')
    } else {
      callback(undefined, {
        location: geo[0].place_name,
        latitude: geo[0].center[1],
        longitude: geo[0].center[0],
      })
    }
  })
}





module.exports = geocode