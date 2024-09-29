'use strict'

/**
 * custom modules
 */

import { getData } from '../config/axios.config.js';

import  {getUrlQuery}  from '../utils/helpers.util.js';

const getProfile = async (req) => {
    const /** {object}  */  { data: currentProfile } = await getData('/me', req.cookies.access_token)
    // {data:currentProfile}
    // console.log({data:currentProfile});

    return currentProfile;

}

const getTopTracks = async (req, itemLimit) => {
    const { limit, offset, page } = getUrlQuery(req.params, itemLimit)

    const { data: topTracks } = await getData(`/me/top/tracks?limit=${limit}&offset=${offset}`, req.cookies.access_token)

    const baseUrl = `${req.baseUrl}/top/track`

    return { baseUrl, page, ...topTracks }


}

const getTopArtists = async (req, itemLimit) => {
    const { limit, offset, page } = getUrlQuery(req.params, itemLimit)

    const { data: topArtist } = await getData(`/me/top/artists?limit=${limit}&offset=${offset}`, req.cookies.access_token)
    const baseUrl = `${req.baseUrl}/top/artist`

    return { baseUrl, page, ...topArtist }


}

const getFollowedArtist = async (req) => {
    const { data: { artists: followedArtist } } = await getData('/me/following?type=artist', req.cookies.access_token)

    return followedArtist
}

export {
    getProfile,
    getTopArtists,
    getTopTracks,
    getFollowedArtist
}
