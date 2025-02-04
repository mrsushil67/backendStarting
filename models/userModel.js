const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    role:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        select:false
    }
},{timestamps:true})

userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id:this._id,name:this.name,email:this.email,role:this.email},process.env.JWT_SECRET,{ expiresIn : '12h'})
    return token;
}

userSchema.statics.hashPassword = async function (password) {
    console.log("pass : ",password)
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;