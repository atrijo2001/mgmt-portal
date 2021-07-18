const express = require('express')
const {protect, authorize} = require('../middleware/auth')
const {createProject} = require('../controllers/Project')

const router = express.Router()

router.route('/').post(protect, authorize('manager'), createProject)

module.exports = router