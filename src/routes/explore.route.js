'use strict'

const router = require('express').Router()

/**
 * custom modules
 */

const {explore ,exploreDetail }= require('../controllers/explore.controller')

router.get(['/','/page/:page'],explore)

router.get(['/:categoryId','/:categoryId/page/:page'],exploreDetail)

module.exports = router 
