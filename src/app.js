const express = require('express')
const { profileAuth } = require('./middlewares/auths')

const app = express();

app.use("/getAllData",(req,res,next)=>{

  throw new Error('DB Error');
  res.send('completed Successfully');

})

app.use('/',(err,req,res,next)=>{
  if(err){
    res.status(500).send('something went wrong');
  }
}) 


// app.use('/profile',profileAuth,(req,res,next)=>{
//   const authToken = 'abcdefghij';
//   if (authToken != 'abcdefgh') {
//     res.status(401).send('unauthorized');
//   }
//   next();
// }
// );

// app.use('/profile',profileAuth)

// app.use('/profile',(req, res, next) => {
//   res.send('Rakesh profile')
// },
//   (req, res, next) => {
//     console.log('hiiiiii')
//     res.send('ok');
//   }
// )

app.listen('7777',()=>{
  console.log('server listening on 7777')
})