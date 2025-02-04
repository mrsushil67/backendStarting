const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires: 12 * 60 * 60
    }
})

const blacklistTokenModel = mongoose.model('blacklistedToken',blacklistTokenSchema);

module.exports = blacklistTokenModel;