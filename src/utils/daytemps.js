const request = require('request')

const dayTemps = (lat, lng, weatherKey, language, callback) => {
    const url = 
    'http://api.openweathermap.org/data/2.5/forecast?lat='+ encodeURIComponent(lat) +
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
            tempMorn : body.list[0].main.temp,
            tempLunch: body.list[2].main.temp,
            tempEve: body.list[4].main.temp
            })
        }
    
    })

}

module.exports = dayTemps