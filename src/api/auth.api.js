'use strict'

const { REDIRECT_URI } = require("../config/api.config")

/**
 * custom modules
 */

const apiConfig = require('../config/api.config')
const axiosConfig = require('../config/axios.config')

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

module.exports ={
    getToken
}

