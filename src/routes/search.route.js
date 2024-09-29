"use strict";

/**
 * node modules
 */

import { Router } from 'express';

/**
 * custom modules
 */

import {
    searchRequest,
    searchAll,
    searchAlbum,
    searchArtist,
    searchPlaylists,
    searchTracks
} from '../controllers/search.controller.js';

const router = Router();

router.post('/', searchRequest);

router.get('/all/:query', searchAll);

router.get(['/albums/:query', '/albums/:query/page/:page'], searchAlbum);

router.get(['/artists/:query', '/artists/:query/page/:page'], searchArtist);

router.get(['/playlists/:query', '/playlists/:query/page/:page'], searchPlaylists);

router.get(['/tracks/:query', '/tracks/:query/page/:page'], searchTracks);

export default router;