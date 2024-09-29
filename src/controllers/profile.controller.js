'use strict'

/**
 * custom modules
*/
import * as userApi from '../api/user.api.js';
import * as playerApi from '../api/player.api.js';
import * as apiConfig from '../config/api.config.js';
import { msToTimeCode } from '../utils/helpers.util.js';

const profile = async (req, res) => {
  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // current user top artists 
  const userTopArtist = await userApi.getTopArtists(req, apiConfig.LOW_LIMIT)

  // current user top tracks 
  const userTopTracks = await userApi.getTopTracks(req, 6)

  // current user followed artist 
  const userFolloweedArtist = await userApi.getFollowedArtist(req)

  res.render('./pages/profile', {
    currentProfile,
    recentlyPlayedTracks,
    userTopArtist,
    userTopTracks,
    userFolloweedArtist,
    msToTimeCode

  })

}

const topArtist = async (req, res) => {

  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // current user top artists 
  const userTopArtist = await userApi.getTopArtists(req, apiConfig.LOW_LIMIT)

  res.render('./pages/user_top_artist', {
    currentProfile,
    recentlyPlayedTracks,
    artists: userTopArtist,
    title: 'Your top artists'

  })

}

const topTrack = async (req, res) => {

  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // current user top tracks 
  const userTopTrack = await userApi.getTopTracks(req, 50)

  res.render('./pages/user_top_track', {
    currentProfile,
    recentlyPlayedTracks,
    tracks: userTopTrack,
    title: 'Your top tracks',
    msToTimeCode

  })

}

export {
  profile,
  topArtist,
  topTrack
}
