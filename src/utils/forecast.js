const request = require('request');


const forecast = (latitude, longitude, callback) => {
  let weatherUrl = `https://api.darksky.net/forecast/f4485be64783bd69eb55f889e1c1bd01/${latitude},${longitude}?units=si`

  request({url: weatherUrl, json: true}, (error, response) => {
    if (error) {
      callback('unable to connect to weather service!')
    } else if (response.body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        temperature: response.body.currently.temperature,
        precipitation: response.body.currently.precipProbability*100,
      })
    }
  })
}



module.exports = forecast


