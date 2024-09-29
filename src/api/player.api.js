"use strict";

/**
 * custom modules
 */

import { getData } from '../config/axios.config.js';
import *as apiConfig from '../config/api.config.js';

const getRecentlyPlayed = async (req, itemLimit = apiConfig.DEFAULT_LIMIT) => {
    const { data: recentlyPlayed } = await getData(`/me/player/recently-played?limit=${itemLimit}`, req.cookies.access_token);
    console.log(recentlyPlayed);

    return recentlyPlayed;
};

export { getRecentlyPlayed };