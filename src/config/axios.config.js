"use strict";

/** node modules  */

import axios from 'axios';
import queryString from 'querystring';
import dotenv from 'dotenv';

dotenv.config();

/**
 * custom modules 
 */
import * as apiConfig from '../config/api.config.js';
/** axios instance for access token and refresh token request  */

const token = axios.create({
    baseURL: apiConfig.TOKEN_BASE_URL,
    headers: {
        'Authorization': `Basic ${Buffer.from(apiConfig.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded',
    }
});

/** 
 * axios instance for all api request 
 */

const api = axios.create({ baseURL: apiConfig.BASE_URL });

const getData = async (apiUrl, access_token) => {
    try {
        const response = await api.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        //   console.log(response);
        return response;

    } catch (error) {
        console.log('error is ', error);

    }
};

/** 
 * axios instance for track lyrics request to Musixmatch
*/

const musixmatch = axios.create({ baseURL: apiConfig.MUSIXMATCH_BASE_URL });

const musixmatchApi = async (endpoint, parameters) => {
    try {

        const apiUrl = `${endpoint}${queryString.stringify(parameters)}&apikey=${apiConfig.MUSIXMATCH_API_KEY}`;

        const response = await musixmatch.get(apiUrl);

        return response.data;

    } catch (err) {
        console.log(err);

    }
};

export {
    token,
    getData,
    musixmatchApi
}