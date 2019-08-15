const request = require('request')

const dayTemps = (lat, lng, weatherKey, language, callback) => {
    const url = 
    'https://api.openweathermap.org/data/2.5/forecast?lat='+ encodeURIComponent(lat) +
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
const utNow = Math.floor(new Date() / 1000);
const utPlus = utNow + 87000
            callback(undefined, {

                // const keepNotes = notes.filter((note) => note.title !== title)

            temps : body.list.filter((forecast) => forecast.dt > utNow && forecast.dt < utPlus)
            })
        }
    
    })

}

module.exports = dayTemps