const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse')
const generateToken = require('../utils/generateToken')


//@desc Register a user
//POST api/auth/register
//access Public 
exports.addUser = asyncHandler(async(req, res)=>{
    const {name, email, role, skillset, password} = req.body

    const user = await User.create({
        name,
        email,
        role,
        skillset,
        password
    })

    res.status(200).json({
        message: "success",
        data: {
            name,
            email,
            role,
            skillset,
            password,
            token: generateToken(user._id)
        }
    })
})


//@desc authenticate a user
//POST  api/auth/login
//access Public
exports.login = asyncHandler(async(req, res)=> {
    const {email, password} = req.body

    //Validate email and password
    if(!email || !password){
        throw new ErrorResponse('Please provide an email or password', 400)
    }

    //Check for user
    const user = await User.findOne({email}).select('+password')


    if(!user){
        throw new ErrorResponse('Invalid credentials', 401)
    }

    //Authenticate the user
    if(await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            skillset: user.skillset,
            token: generateToken(user._id)
        })
    } else{
        throw new ErrorResponse('Email and Paswords do not match', 401)
    }
})

//@desc Get logged in user
//GET api/auth/user
//access Private
exports.getLoggedInUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user.id)

    if(user){
        res.json(user)
    } else{
        throw new ErrorResponse('Couldnt get logged in user', 404)
    }
})