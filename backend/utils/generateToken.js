const jwt = require('jsonwebtoken');

const generateToken = (res,userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    });//generates a JWT using the 'jwt.sign' method
    //here {userId} is used as payload to retrieve the data of that particular user

    return token
}

module.exports = generateToken