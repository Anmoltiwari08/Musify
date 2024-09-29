"use strict";

import { Router } from 'express';

/**
 * custom modules
 */

import { login } from '../controllers/login.controller.js';

const router = Router();

router.get('/', login);

export default router;