"use strict";

/**
 * node modules 
 */

import { Router } from 'express';

/**
 * custom modules
 */

import { trackDetail } from '../controllers/track.controller.js';

const router = Router();

router.get('/:trackId', trackDetail);

export default router
