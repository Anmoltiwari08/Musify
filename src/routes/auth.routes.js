"use strict";

/**
 * node modules 
 *  */

import { Router } from 'express';

/**
 * custom modules  
 */ 

import { auth, callback } from '../controllers/auth.controller.js';
import { refreshToken } from '../controllers/refresh_token.controller.js';

const router = Router();

router.get('/', auth);
router.get('/callback', callback);
router.get('/refresh_token', refreshToken);

export default router;