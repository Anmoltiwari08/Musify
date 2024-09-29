"use strict";

import { Router } from 'express';

/**
 * custom modules
 */

import { home } from '../controllers/home.controllers.js';

const router = Router();

router.get('/', home);

export default router;