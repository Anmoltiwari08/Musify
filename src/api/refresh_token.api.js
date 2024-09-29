"use strict";

/**
 * custom modules
 */

import * as axiosConfig from '../config/axios.config.js';

const getRefreshToken = async (refreshToken) => {
    try {
        const response = await axiosConfig.token.post('/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default getRefreshToken;