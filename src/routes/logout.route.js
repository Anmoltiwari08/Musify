"use strict";

/**
 * node modules
 */

import { Router } from 'express';

/**
 * custom modules
 */

import { logout } from '../controllers/logout.controller.js';

const router = Router();

router.get('/', logout);

export default router;
