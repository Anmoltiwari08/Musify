'use strict'

/**
 * node modules 
 */

const querystring = require('querystring')

/**
 * custom modules
 */

const apiConfig = require('../config/api.config')
const utils = require('../utils/helpers.util')
const { response } = require('express')
const { getToken } = require('../api/auth.api')

const auth = (req, res) => {
  const /**{string} */state = utils.generateRandomString(16)
  res.cookie(apiConfig.STATE_KEY, state)
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: apiConfig.CLIENT_ID,
      scope: apiConfig.SCOPE,
      redirect_uri: apiConfig.REDIRECT_URI,
      state
    })
  )

}

const callback = async (req, res) => {
  const milllseconds = 1000
  const one_week = 604800000

  const {
    code = null,
    state = null,
    error = null
  } = req.query

  const /**{string} */  storedState = req.cookies[apiConfig.STATE_KEY]
  console.log(storedState)

  if (error || !state || state !== storedState) {
    return res.redirect('/login')
  }else {
    res.clearCookie(apiConfig.STATE_KEY)
    const response = await getToken(code)

    if (response.status === 200) {
      console.log(response.data);
      
      const {
        refresh_token,
        expires_in,
        access_token
      } = response.data

      res.cookie('access_token', access_token, { maxAge: expires_in * milllseconds })
      res.cookie('refresh_token', refresh_token, { maxAge: one_week })
      res.redirect('/')

    }else{
      res.redirect('/login')
    }

  }

}

module.exports = {
  auth,
  callback
}
