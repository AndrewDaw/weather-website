const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const dayTemps = require('./utils/daytemps')

require('dotenv').config();

const path = require('path')
const express = require('express')
const hbs = require('hbs')

//open api keys required 
const weatherKey = process.env.OPEN_WEATHER_API_KEY //openweathermap.org
const mapboxKey = process.env.MAPBOX_API_KEY //mapbox.com
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
        name,
        message: "Hi im andrew, a software developer currently living in the"
         +" Wellington region of New Zealand. This is a little web app I made to play"
         +" around with node.js"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name,
        message: "Type your the name of a town or city in the search box on the"+
        " weather page to get started. If the location is wrong try adding the name"+
        " of the country, region, or postal code."
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


app.get('/day-temps', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, mapboxKey, language, (error, {lat, lng} = {}) => {

        
        if(error){
            return res.send({error})
        }
        dayTemps(lat, lng,
                weatherKey, language, (error, {temps}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                temps
            })
        })      
    })
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



