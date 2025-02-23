const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: "Home"
  });
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi)
    res.render('beers', {
      allBeers: beersFromApi,
      title: "List of beers"
    })
  })
  .catch(error => console.log(error));
  
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beersFromApi => {
    console.log(beersFromApi[0])
    res.render('random-beer', {
      randomBeer : beersFromApi[0],
      title : "Random Beer"
    });
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// function getBeers(){
//   let promise = new Promise((resolve, reject)=>{
    
//   })
// }