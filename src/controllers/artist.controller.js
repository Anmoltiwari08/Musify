"use strict";

/**
 *  custom modules
 */

import *as playerApi from '../api/player.api.js';
import *as userApi from '../api/user.api.js';
import *as apiConfig from '../config/api.config.js';
import *as artistApi from '../api/artist.api.js';
import { msToTimeCode } from '../utils/helpers.util.js';
       
const artistDetail = async (req, res) => {
    // current user profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // artist albums
    const artistAlbums = await artistApi.getAlbum(req, apiConfig.LOW_LIMIT);

    // artist detail
    const artistDetail = await artistApi.getDetail(req);

    // artist top tracks
    const artistTopTrack = await artistApi.getTopTracks(req);

    // artist related artists
    const relatedArtist = await artistApi.getArtistRelated(req);

    res.render('./pages/artist_detail', {
        currentProfile,
        recentlyPlayedTracks,
        artistAlbums,
        artistDetail,
        artistTopTrack,
        relatedArtist,
        msToTimeCode
    });
};

const artistAlbum = async (req, res) => {
    // current user profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // artist albums
    const artistAlbums = await artistApi.getAlbum(req, apiConfig.LOW_LIMIT);

    // artist detail
    const artistDetail = await artistApi.getDetail(req);

    res.render('./pages/album', {
        currentProfile,
        recentlyPlayedTracks,
        title: artistDetail.name,
        albums: artistAlbums,
        isArtistAlbum: true
    });
};

export {
    artistDetail,
    artistAlbum
};