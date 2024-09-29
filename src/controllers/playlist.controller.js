'use strict'

/**
 * custom modules
 * 
 */
import * as userApi from '../api/user.api.js';
import * as playerApi from '../api/player.api.js';
import * as playlistApi from '../api/playlist.api.js';
import { msToTimeCode } from '../utils/helpers.util.js';

const playlist = async (req, res) => {

  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // featured playlist 
  const featuredPlaylist = await playlistApi.getFeatured(req)

  res.render('./pages/playlist', {
    currentProfile,
    recentlyPlayedTracks,
    featuredPlaylist
  })

}

const playlistDetail = async (req, res) => {
  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // get playlist deatil 
  const playlistDetail = await playlistApi.getDetail(req)

  res.render('./pages/playlist_detail', {
    currentProfile,
    recentlyPlayedTracks,
    msToTimeCode,
    playlistDetail

  })

}



export {
  playlist,
  playlistDetail
}
