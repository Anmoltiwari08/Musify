'use strict '

/**
 * node modules
 */

const router = require('express').Router()

/**
 * custom modules
 */
const {home} = require('../controllers/home.controllers')

router.get('/',home)

module.exports = router

