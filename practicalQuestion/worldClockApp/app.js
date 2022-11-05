const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const colors = require('colors');


const myModule = require('./myModule.js');
const { rmSync } = require('fs');


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './view'))
app.use(express.static('public'));


app.get('/', async function (req, res, next) {
	res.render('home')
})

app.post('/getAllCountry', async function (req, res, next) {
	let object = await myModule.getCountries();
	res.send(await myModule.getCountries())
})



app.post('/clienttime', async function (req, res, next) {


	try {

		const CountryNzoneName = req.query.CountryNzoneName;

		if (typeof CountryNzoneName !== 'undefined' ||  CountryNzoneName !== null) {


			const clientTimeData = await myModule.getTimeandDate(CountryNzoneName);
			
			console.log(clientTimeData);

			res.json(clientTimeData)

		} else {

			const clientTimeData = await myModule.getTimeandDate();
			console.log(clientTimeData);
			//res.json(clientTimeData)
		}




	} catch (err) {
		console.log(err)
	}

})


app.post('/getTimeByzoneName', async function (req, res, next) {

	try {

		const CountryNzoneName = req.query.CountryNzoneName;
		console.log(typeof CountryNzoneName);

		if (typeof CountryNzoneName !== 'undefined') {
			res.json({ val: CountryNzoneName })
		} else {
			console.log('#');
			res.json({ 'Error': 'notdefine' })
		}


	} catch (err) {
		console.log(err.message)
	}

})

app.post('/test', async function (req, res, next) {

	const { Country, State, City } = require('country-state-city');




		res.json(await Country.getAllCountries())
	

	//undefine
	//null

	// console.log(a);//undefined
	// console.log(b);//null
	// console.log(c);//undefined

	// let r = (typeof a !== 'undefined')?'defined':'undefined'
	// console.log(r);//undefined




	// function checkVariable(variable) {

	// 	if (variable == null) {
	// 		console.log('The variable is undefined or null');
	// 	}
	// 	else {
	// 		console.log('The variable is neither undefined nor null');
	// 	}
	// }

	// checkVariable(c)

	let age;
	// if(typeof age!=='undefined' || age !== null ){
	// 	console.log('undefined');
	// }else{
	// 	console.log('define');
	// }

})







app.listen(5050, function () {
	console.log('server is running on 5050 port');
})



