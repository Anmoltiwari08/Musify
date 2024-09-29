"use strict";

/**
 * node modules
 */

import dotenv from 'dotenv';
dotenv.config();

// The base address of web api
const BASE_URL = 'https://api.spotify.com/v1';

// The base address of spotify authentication token
const TOKEN_BASE_URL = 'https://accounts.spotify.com/api';

// Spotify client ID
const CLIENT_ID = process.env.CLIENT_ID;

// Redirect url for spotify authorization code flow
const REDIRECT_URI = process.env.REDIRECT_URI;

// Scope of spotify api request
const SCOPE = process.env.SCOPES;

// Authentication state key
const STATE_KEY = 'spotify_auth_state';

// Api request queries
const MARKET = "US";
const LOW_LIMIT = 12;
const DEFAULT_LIMIT = 20;

// Musicmatch base url for track lyrics
const MUSIXMATCH_BASE_URL = 'https://api.musixmatch.com/ws/1.1/';

// Musicmatch api key
const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

export {
    STATE_KEY,
    SCOPE,
    REDIRECT_URI,
    CLIENT_ID,
    TOKEN_BASE_URL,
    BASE_URL,
    MARKET,
    LOW_LIMIT,
    DEFAULT_LIMIT,
    MUSIXMATCH_BASE_URL,
    MUSIXMATCH_API_KEY
};
