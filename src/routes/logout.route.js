'use strict'

/**
 * node modules
 */
   
const router = require('express').Router()

   /**
   * custom modules
   */

const {logout}=  require('../controllers/logout.controller')

router.get('/',logout)

module.exports = router