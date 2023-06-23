const express = require('express')
const router = express.Router()
const {index} = require('../contollers/index')

router.route('/').get(index)

module.exports = router