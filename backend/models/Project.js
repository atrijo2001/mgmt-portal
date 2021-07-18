const mongoose = require('mongoose');

const ProjectSchema = new mongoose.model({
    name: {
        type: String,
        required: [true, 'Please enter a name of the project']
    },
    desciption: {
        type: String,
        required: [true, 'Please enter a description of a project']
    },
    aim: {
        type: String,
        required: [true, 'Please enter the aim of your project']
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter the users associated with the user']
    }],
    techStack: {
        type: String,
        required: [true, 'Please enter the tech stack for the project']
    },
    startDate: {
        type: Date,
        required: [true, 'Enter the start date of the user']
    },
    endDate: {
        type: Date,
        required: [true, 'Please enter the deadline for the projects']
    }
})

module.exports = mongoose.model('Project', ProjectSchema);