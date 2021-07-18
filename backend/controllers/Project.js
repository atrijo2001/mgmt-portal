const Project = require('../models/Project')
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../utils/errorResponse')


//@desc  Create a Project
//POST api/project
//access  Private
exports.createProject = asyncHandler(async(req, res)=>{
    const {name, description, aim, users, techStack, startDate, endDate} = req.body
    const project = await Project.create({
        name, 
        description, 
        aim, 
        users, 
        techStack, 
        startDate,
        endDate
    })

    if(project){
        res.status(200).json({
            message: "success",
            data: project
        })
    } else{
        throw new ErrorResponse('Couldnt create a user', 404)
    }
})