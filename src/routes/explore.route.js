"use strict";

import { Router } from 'express';

/**
 * custom modules
 */

import { explore, exploreDetail } from '../controllers/explore.controller.js';

const router = Router();

router.get(['/','/page/:page'], explore);

router.get(['/:categoryId','/:categoryId/page/:page'], exploreDetail);

export default router;
