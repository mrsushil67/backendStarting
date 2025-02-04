const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blackListToken');
const userModel = require('../models/userModel');

const userRegister = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const { name, role, email, password } = req.body

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: "user already exist" })
        }

        const hashpassword = await userModel.hashPassword(password)

        const newUser = new userModel({
            name,
            role,
            email,
            password:hashpassword
        })

        const user = await newUser.save();

        const token = newUser.generateToken();

        console.log("user : ", token, user)
        return res.status(201).json({ token, user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const userLogin = async( req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    
   const { email, password} = req.body;

   try {
        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.status(401).json({message : "user does not Exist"});
        }

        const user = await userModel.findOne({email}).select('+password');

        const token = user.generateToken();

        return res.status(200).json({token,user})

   } catch (error) {
        return res.status(500).json({message: "internal server error"});
   }
}

const userProfile = async(req, res) => {

    try {
        const user = await userModel.findById(req.user._id);
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

const userLogout = async(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"invalid token"})
    }
    try {
        const blacklistedtoken = new blacklistTokenModel({token});
        console.log("ab ye black : ",blacklistedtoken)
        await blacklistedtoken.save();
    
        return res.status(200).json({message:"user logged out successfully"});
    } catch (error) {
        return res.status(500).json({message:"internal server error"});
    }
}

module.exports = {
    userRegister,
    userLogin,
    userProfile,
    userLogout,
}