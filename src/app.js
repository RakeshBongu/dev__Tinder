const express = require('express')

const app = express();

app.use("/wish",(req,res)=>{
  res.send('Hello Rakesh, Godd Evening')
})

app.listen('7777')