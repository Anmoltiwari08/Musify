"use strict";

/**
 * node modules
 */

import { Router } from 'express';

/**
 * custom modules
*/

import { album, albumDetail } from '../controllers/album.controller.js';

const router = Router();

router.get(['/','/page/:page'], album);

router.get('/:albumId', albumDetail);

export default router;
