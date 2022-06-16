const jwt = require("jsonwebtoken")

function verify(req,res,next){
  const authHeader = req.headers.token;
      // console.log(authHeader);
  if (authHeader) {
  
    try {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json("Token is not valid!");
         req.user = user;
          next();
      });
        
        
     
    } catch (error) {
      console.log(error);
    }
    
  } else {
    return res.status(401).json("You are not authorized!");
  }
      
   
}
module.exports = verify;