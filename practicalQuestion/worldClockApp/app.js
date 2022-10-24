const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs')


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './view'))
app.use(express.static('public'));


app.get('/', function (req, res, next) {
	res.render('home')
})


app.listen(5050, function () {
	console.log('server is running on 5050 port');
})



