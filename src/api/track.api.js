'use strict'


/**
 * custom modules
 */



import {
    getData,
    musixmatchApi
} from '../config/axios.config.js';



const getRecommondations = async (req, trackSeed, itemLimit) => {
    const { data: recommendedTracks } = await getData(`/recommendations?seed_tracks=${trackSeed}&limit=${itemLimit}`, req.cookies.access_token)
    return recommendedTracks

}

const getDetail = async (req) => {
    const { trackId } = req.params;
    const { data: trackDetail } = await getData(`/tracks/${trackId}`, req.cookies.access_token)
    return trackDetail

}

const getLyrics = async (trackName, artistName, isrc = null) => {

    const { message: { body: { lyrics } } } = await musixmatchApi('matcher.lyrics.get?', {
        q_track: trackName.toLowerCase(),
        q_artist: artistName.toLowerCase(),
        track_isrc: isrc
    });

    return lyrics;

}

export{
    getRecommondations,
    getDetail,
    getLyrics
}
