const jwt = require("jsonwebtoken");


const genToken = async (userId) => {
    try{
        let token = await jwt.sign({userId} , process.env.JWTKEY , {expiresIn:"7d"})
        return token
    }catch(err){
     console.log("token error"+err)
    }
}


const genToken1 = async (email) => {
       try {
        let token = await jwt.sign({email} , process.env.JWTKEY , {expiresIn:"7d"})
        return token
       } catch (error) {
         console.log("token error")
       }
}

module.exports = {
    genToken ,
    genToken1
}