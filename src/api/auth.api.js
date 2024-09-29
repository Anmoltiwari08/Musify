'use strict'


// import { REDIRECT_URI } from '../config/api.config.js';
/**
 * custom modules
 */

import * as apiConfig from '../config/api.config.js';
import * as axiosConfig from '../config/axios.config.js';


const getToken = async function(code){
    try {
    const response = await axiosConfig.token.post('/token',{
        grant_type : 'authorization_code',
        code,
        redirect_uri:apiConfig.REDIRECT_URI
        
    })
    
    return response;

    } catch (error) {
        console.log(error);
        
    }
}

export{
    getToken
}

