"use strict";

/**
 *  custom modules
*/

import *as userApi from '../api/user.api.js';
import *as playerApi from '../api/player.api.js';
import *as apiConfig from '../config/api.config.js';
import *as artistApi from '../api/artist.api.js';
import *as trackApi from '../api/track.api.js';
import { msToTimeCode } from '../utils/helpers.util.js';

const trackDetail = async (req, res) => {
    // current user profile
    const currentProfile = await userApi.getProfile(req);

    // recently played tracks
    const recentlyPlayed = await playerApi.getRecentlyPlayed(req);
    const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track);

    // track detail
    const trackDetail = await trackApi.getDetail(req);
    console.log("track detail is ", trackDetail);

    // track artist detail
    const artistIds = trackDetail.artists.map(({ id }) => id);
    console.log(" artist Id  is ", artistIds);
    console.log(" artist Id's are  is ", artistIds.join(','));
    const idss = artistIds.join(',').replace(/\s+/g, ''); // remove spaces
    const trackArtists = await artistApi.getSeveralDetail(req, idss);
    console.log("track artist is ", trackArtists);

    // first artist top track
    const [firstArtistId] = artistIds;
    const artistTopTracks = await artistApi.getTopTracks(req, firstArtistId);

    // related artist
    const relatedArtist = await artistApi.getArtistRelated(req, firstArtistId);

    // track lyrics
    const { name, artists, external_ids: { isrc } } = trackDetail;

    const trackLyrics = await trackApi.getLyrics(name, artists[0].name, isrc);
    console.log("lyrics", trackLyrics);

    res.render('./pages/track_detail', {
        currentProfile,
        recentlyPlayedTracks,
        trackArtists,
        artistTopTracks,
        relatedArtist,
        trackDetail,
        trackLyrics,
        msToTimeCode
    });
};

export {
    trackDetail
};
