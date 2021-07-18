const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email id']
    },
    role: {
        type: String,
        enum: ['manager', 'developer'],
        default: 'developer'
    },
    skillset: {
        type: String,
        required: [true, 'Please enter your skillset'],
        enum: ['frontend', 'backend', 'fullstack', 'ML', 'android', 'ios', 'design', 'blockchain', 'manager']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire : Date

}, {
    timestamps: true
})

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  // Sign JWT and return
  UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Match user entered password to hashed password in database
  UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


  //Generate and hash Password token
  UserSchema.methods.getResetPasswordToken = function(){
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')


    //Hash the token and set it to reset password token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set expire
    this.resetPasswordExpire = Date.now() + 10*60*1000


    return resetToken;
  }

module.exports = mongoose.model('User', UserSchema)