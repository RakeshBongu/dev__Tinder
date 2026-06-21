const profileAuth = (req,res,next)=>{
  const authToken = 'abcdefgh';
  if (authToken != 'abcdefgh') {
    res.status(401).send('unauthorized');
  }
  next();
}

module.exports = {
    profileAuth,
}