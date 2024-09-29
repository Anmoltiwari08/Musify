'use strict'

/**
 * custom Modules
 */
import * as userApi from '../api/user.api.js';
import * as playerApi from '../api/player.api.js';
import * as albumApi from '../api/album.api.js';
import * as artistApi from '../api/artist.api.js';
import * as apiConfig from '../config/api.config.js';
import { msToTimeCode } from '../utils/helpers.util.js';
const album = async (req, res) => {

  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // new release albums 
  const newRelease = await albumApi.getNewRelease(req)

  res.render('./pages/album', {
    title: 'New Release',
    currentProfile,
    recentlyPlayedTracks,
    albums: newRelease

  })

}

const albumDetail = async (req, res) => {
  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // album detail
  const albumDetails = await albumApi.getDetail(req)
  //   console.log(albumDetails);

  // more by artists 
  const [firstArtist] = albumDetails.artists
  const moreByArtists = await artistApi.getAlbum(req, apiConfig.LOW_LIMIT, firstArtist.id)


  res.render('./pages/album_detail', {
    currentProfile,
    recentlyPlayedTracks,
    albumDetails,
    moreByArtists: { firstArtist, ...moreByArtists },
    msToTimeCode
  })

}

export {
  album,
  albumDetail
}
