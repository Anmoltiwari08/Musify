"use strict";

import { Router } from 'express';

/**
 *  custom modules
 */

import { artistDetail, artistAlbum } from '../controllers/artist.controller.js';

const router = Router();

router.get('/:artistId', artistDetail);

router.get(['/:artistId/album', '/:artistId/album/page/:page'], artistAlbum);

export default router;