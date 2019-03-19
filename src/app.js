const path = require('path');

const express = require('express');
          
const geocode = require('./utils/geocode'),
     forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;


/******************/
/* Configurations */
/******************/
app.set('view engine', 'ejs'); //defines the html renderer
app.set('views', path.join(__dirname, '../views'));  //defines which directory to look for the views folder

app.use(express.static(path.join(__dirname, '../public')))//defines the public folder as the root for static files





// renders the home page
app.get('/', (req, res) => {
  res.render('home.ejs', {
    title: 'Weather App',
    name: 'Gonçalo'
  })
})

// renders the about page
app.get('/about', (req, res) => {
  res.render('about.ejs', {
    title: 'About Me',
    name: 'Gonçalo'
  })
})

// renders the help page
app.get('/help', (req, res) => {
  res.render('help.ejs',  {
    title: 'Help page',
    name: 'Gonçalo',
    message: 'This is the help page'
  })
})

// renders the help article page
app.get('/help/*', (req, res) => {
  res.render('404.ejs', {
    title: 404,
    name: 'Gonçalo',
    error: 'Help article not found',
  })
})












app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    return res.send({error: 'location must be provided'})
  }
  // requests the geocode api with the query adress
  geocode(req.query.adress, (error , {location, latitude, longitude} = {}) => {
    if (error) {
      return res.send({ error }) 
    }
    // requests the weather with the returned location from the api
    forecast(latitude, longitude, (error, {temperature, precipitation}) => {
      if (error) {
        return res.send({ error })
      } 

      res.send({
        location,
        temperature,
        precipitation
      })
    })
  })
})




app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})











// renders the error page
app.get('*', (req, res) => {
  res.render('404.ejs', {
    title: 404,
    name: 'Gonçalo',
    error: 'Page not found',
  })
})




app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})


