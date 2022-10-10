const express = require('express')
const app=express()
const port =5050

app.get('/', (req,res,next)=>{
    res.send('Hello world')
})

app.listen(port,()=>{
    console.log(`server is running on port no:${port}`);
})