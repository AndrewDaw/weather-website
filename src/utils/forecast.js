/*Forecast api
*Exports forecast function
*lat, lng: Coordinates for weather data
*mapBoxKey: api key. aquire from openweathermap.org
*language: prefferred language of result e.g. en
*callback:function that will be called when results are available
*/


const request = require('request')

const forecast = (lat, lng, weatherKey, language, callback) => {
    const url = 
    'http://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(lat) +
    '&lon='+ encodeURIComponent(lng) +
    '&appid=' + encodeURIComponent(weatherKey) +
    '&units=metric' +
    '&lang=' + encodeURIComponent(language)

    request({ url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to get weather', undefined)
        } else if (body.cod === '400'){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
            temp : body.main.temp,
            describe: body.weather[0].description,
            place: body.name
            })
        }
    
    })

}

module.exports = forecast