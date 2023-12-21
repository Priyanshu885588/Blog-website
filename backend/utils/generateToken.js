const jwt = require('jsonwebtoken');

const generateToken = (res,userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    });//generates a JWT using the 'jwt.sign' method
    //here {userId} is used as payload to retrieve the data of that particular user

    res.cookie('jwt',token,{
        httpOnly:true,//Cookie can only be accessed by the server, not by client-side scripts.
        secure:process.env.NODE_ENV !== 'development',//secure: process.env.NODE_ENV !== 'development': Cookie is only sent over HTTPS, not over unsecured HTTP.
        sameSite:'strict',//sameSite: 'strict': Cookie is only sent in first-party contexts, not with cross-site requests.
        maxAge:30*24*60*60*1000
    })
}

module.exports = generateToken