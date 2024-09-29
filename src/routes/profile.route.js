/**
 * user route
 */

/**
 * node modules
 * 
 */

import { Router } from 'express';

/**
 * custom modules
 * 
 */


import { profile, topArtist, topTrack } from '../controllers/profile.controller.js';

const router = Router();

router.get('/', profile);

router.get(['/top/artist', '/top/artist/page/:page'], topArtist);

router.get(['/top/track', '/top/track/page/:page'], topTrack);

export default router;