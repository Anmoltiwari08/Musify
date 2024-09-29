"use strict";

/**
 * node modules
 * 
 */

import { Router } from 'express';

/**
 * custom modules
 * 
 */

import { playlist, playlistDetail } from '../controllers/playlist.controller.js';

const router = Router();

router.get(['/','/page/:page'], playlist);

router.get('/:playlistId', playlistDetail);

export default router;
