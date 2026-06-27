const jwt = require("jsonwebtoken");
const User = require("../model/user.js");

const userAuth = async (req,res,next)=>{
  try{
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token) throw new Error('something broken')
    const decodedObject = await jwt.verify(token, "DevTinder@Rakesh")
    const {_id} = decodedObject
    if(!_id){
      throw new Error('something broken')
    }
    const user = await User.findById(_id);
    if(!user){
      throw new Error('something broken')
    }
    req.user = user;
    next();

  }catch(err){
     res.status(401).send(err.message);
  }
}

module.exports = {
    userAuth,
}