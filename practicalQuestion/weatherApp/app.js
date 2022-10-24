
const express = require('express');
const hbs = require('hbs')
const path = require('path');
const url = require('url');
const app = express();

//const { send } = require('process');
//const { createSecretKey } = require('crypto');
//const { isTypedArray } = require('util/types');


const {searchCountry,getCountries,searchCity,getWeather} = require('./myModule');


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './view'))
app.use(express.static('public'));



app.get('/', function (req, res, next) {
	res.render('home')
})


app.get('/getCountries', function (req, res, next) {
	getCountries((result)=>{
		// console.log(result);
		res.send(result);
	});
	
})


app.get('/searchCountry', async function (req, res, next) {


	const sear = await req.query.sear
	let country= await searchCountry(sear);
	//console.log(country);
	res.send(country)

	
})

app.post('/searchCity',async function (req, res, next) {
	const country =  req.query.country
	city= await searchCity(country);
	res.send(city)

	

})

app.post('/getWeather',async(req,res)=>{
	const citylatlong= req.query.citylatlong;
	let weather = await getWeather(citylatlong)
	res.send(weather)

})




app.get('/test', function (req, res, next) {

	let t= testfun()
	console.log(t);

})

app.listen(5050, function () {
	console.log('server is running on 5050 port');
})



