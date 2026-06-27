const express = require('express')
const { connectDb } = require('./config/database')
const User = require('./model/user')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const { userAuth } = require('./middlewares/auths')

const app = express();

app.use(express.json())
app.use(cookieParser())

app.post('/signup', async (req, res) => {
  try {
    const {password} = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    console.log(password, hashPassword)
    const user = new User({
      ...req.body, password: hashPassword
    })
    await user.save();
    res.send('user inserted successfully');
  } catch (err) {
    res.send('couldnt insert the user')
    console.log(err, 'uhfeu')
  }
})

app.post('/login', async (req,res) => {
  try{
    const {emailId : email, password} = req.body;
    console.log(email,password,'rfjnrjb ')
    const user = await User.findOne({emailId: email})
    console.log(user,'jrnjnjcf')
    if(!user){
       res.send('login unsuccessfull')
       return
      }
    const storedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, storedPassword);
    console.log(isValidPassword,'hrdufnjrnj')
    if(!isValidPassword){
      res.send('login successfull')
      return
    }
    const token = await user.getJwt()
    console.log(token,'trnjnrjngfjn')
    if(!token){
       res.send('login unsuccessfull')
       return
      }
    res.cookie("token", token);
    res.send('login successfull')
    return
  } catch (err) {
    console.log(err,'jrnjnrjn')
    res.send('login unsuccessfull')
  }
})

app.get('/profile', userAuth, async (req,res) => {
  try{
    const user = req.user
    res.send(user)

  }catch(err){
    res.send('profile not found');
  }
})

app.get('/user', async (req, res) => {
  try {
    const userEmail = req.body.emailId
    const user = await User.findOne({
      emailId: userEmail
    })
    if (!user) {
      res.status(404).send('user not found')
    } else {
      res.send(user)
    }
  } catch (err) {
    res.status(400).send('something went wrong')
  }
})

app.delete('/user', async (req, res) => {
  try {
    const user_id = req.body.userId
    await User.findByIdAndDelete(user_id)
    res.send('Deleted successfully')
  } catch (err) {
    res.status(400).send('something went wrong')
  }
})

app.patch('/user/:userid', async (req, res) => {
  try {
    const data = req.body
    const user_id = req.body.userId
    const updated = await User.findByIdAndUpdate(user_id, data)
    console.log(updated,'urhfhbrdbhrd')
    res.send('updated successfully')
  } catch (err) {
    res.status(400).send('something went wrong')
  }
})

app.get('/feed', async (req, res) => {
  try {
    const users = await User.find({})
    if (users.length <= 0) {
      res.status(404).send('users not found')
    } else {
      res.send(users)
    }
  } catch (err) {
    res.status(400).send('something went wrong')
  }
})
app.get('/feed/id', async (req, res) => {
  try {
    const users = await User.find({})
    if (users.length <= 0) {
      res.status(404).send('users not found')
    } else {
      res.send(users)
    }
  } catch (err) {
    res.status(400).send('something went wrong')
  }
})

connectDb().then(() => {
  console.log('mongodb connected succesfully')
  app.listen('7777', () => {
    console.log('server listening on 7777')
  })
}).catch((err) => {
  console.log('db connection error',err)
})