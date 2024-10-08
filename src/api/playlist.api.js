"use strict";

// const { BASE_URL } = require('../config/api.config');
/** 
 * custom modules  
 */  

import { getData } from '../config/axios.config.js';

import {getUrlQuery}  from '../utils/helpers.util.js';

/**
 * get a list of Spotify featured playlists
 * */

const getFeatured = async (req, itemLimit) => {
    const { offset, limit, page } = getUrlQuery(req.params, itemLimit);

    const { data: featuredPlaylists } = await getData(`/browse/featured-playlists?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    // console.log(featuredPlaylists);

    return { baseUrl: req.baseUrl, page, ...featuredPlaylists };
};

const getCategoryPlaylist = async (req, itemLimit) => {
    const { limit, offset, page } = getUrlQuery(req.params, itemLimit);
    const { categoryId = 'party' } = req.params;

    // console.log(categoryId);

    const { data: catgoryPlaylist } = await getData(`/browse/categories/${categoryId}/playlists?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    // console.log(catgoryPlaylist);

    const baseUrl = `${req.baseUrl}/${categoryId}`;

    return { baseUrl, page, ...catgoryPlaylist };
};

const getDetail = async (req) => {
    const { playlistId } = req.params;
    const { data: playlistDetail } = await getData(`/playlists/${playlistId}?fields=description,external_urls,followers(total),id,images,name,owner(display_name),tracks(total,items(track(album(images,name),artists,duration_ms,name,id,uri))),type,uri`, req.cookies.access_token);

    return playlistDetail;
};

export {
    getFeatured,
    getCategoryPlaylist,
    getDetail
};