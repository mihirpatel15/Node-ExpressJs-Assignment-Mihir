const express = require('express');
const app = express()
const port=5050

app.get('/',(req,res,next)=>{
	res.send('this is main page responce')
})

app.get('/home',(req,res,next)=>{
	res.send('this is home page response')
})

app.listen(port,()=>{
	console.log('server is runnig on '+port+' port');
})