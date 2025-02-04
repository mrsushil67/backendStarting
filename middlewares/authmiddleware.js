const jwt = require('jsonwebtoken')
const blackListToken = require('../models/blackListToken')

const authenticatedUser = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "invalid token" });
    }

    console.log("token : ",token)
    const isBlackListedToken = await blackListToken.findOne({token});
    console.log("Blacklist : ",isBlackListedToken)
    if(isBlackListedToken){
        return res.status(401).json({message:"blacklisted token"})
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server errorye"})
    }
}

module.exports = authenticatedUser;