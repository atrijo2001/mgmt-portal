const express = require('express')
const router = express.Router()
const {addUser, login, getLoggedInUser} = require('../controllers/User')
const {protect} = require('../middleware/auth')

router.route('/register').post(addUser)
router.route('/login').post(login)
router.route('/user').get(protect, getLoggedInUser)

module.exports = router