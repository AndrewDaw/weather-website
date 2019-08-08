const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

require('dotenv').config();

const path = require('path')
const express = require('express')
const hbs = require('hbs')

//open api keys required 
const weatherKey = process.env.OPEN_WEATHER_API_KEY //openweathermap.org
const mapboxKey = process.env.MAPBOX_API_KEY //mapbox.com
console.log("mapboxKey: "+mapboxKey)
const language = 'en'

const app = express()
const port = process.env.PORT || 3000

//express paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directories
app.use(express.static(publicDirectoryPath))

//constants
const name = 'Andrew Daw'


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name,
        message: "This a help page where you will find helpful"+ 
        "information to help you"
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, mapboxKey, language, (error, {lat, lng, location} = {}) => {

        
        if(error){
            return res.send({error})
        }
        forecast(lat, lng,
                weatherKey, language, (error, {temp, describe}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: describe,
                location,
                temp,
                given_address: req.query.address
            })

        })
        
             
    })
        
   


   

})
app.get('/products', (req,res) =>{ 
    
    
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title: "error - 404",
        message: 'Well, thats not very helpful'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title: "error - 404",
        message: 'Well, try looking for something else I guess'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})



