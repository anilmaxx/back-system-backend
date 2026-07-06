const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    accountType: {
        type: String,
        enum: ['savings', 'current'],
        required: true,
        lowercase: true
    },
    balance:{
        type: Number,
        default: 0
    },
    status:{
        type: String,
        enum: ['active', 'blocked'],
        default:'active'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema)