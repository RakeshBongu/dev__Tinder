const express = require('express')

const app = express();

app.use('/user/userId',(req,res,next)=>{
  console.log(req.url)
  res.send('ok')
  next()
},
(req,res,next)=>{
  console.log('hiiiiii')
  res.end();
}
)

app.listen('7777',()=>{
  console.log('server listening on 7777')
})