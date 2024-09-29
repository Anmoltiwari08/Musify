'use strict '

/**
 * custom modules
 */

import * as apiConfig from '../config/api.config.js';
import * as userApi from '../api/user.api.js';
import * as playerApi from '../api/player.api.js';
import * as trackApi from '../api/track.api.js';
import * as artistApi from '../api/artist.api.js';
import * as albumApi from '../api/album.api.js';
import * as playlistApi from '../api/playlist.api.js';


const home = async (req, res) => {
  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)
  // console.log(recentlyPlayedTracks);

  // recommended tracks
  const trackIds = recentlyPlayedTracks.map(({ id }) => id)
  const trackseed = trackIds.slice(0, 5).join(',');
  const recommendedTracks = await trackApi.getRecommondations(req, trackseed, apiConfig.LOW_LIMIT)

  // recommended albums
  const recommendedAlbums = await recommendedTracks.tracks

  // recommended artists

  const artistIds = recommendedAlbums.map(({ artists }) => artists[0].id)
  const uniqueArtistsIds = [... new Set(artistIds.flat(1))].join(',')

  const recommendedArtists = await artistApi.getSeveralDetail(req, uniqueArtistsIds)

  // new release albums
  const newRelease = await albumApi.getNewRelease(req, apiConfig.LOW_LIMIT)
  // console.log(newRelease);

  // featured playlists
  const featuredPlaylist = await playlistApi.getFeatured(req, apiConfig.LOW_LIMIT)

  // Top Playlists
  const topPlaylist = await playlistApi.getCategoryPlaylist(req, apiConfig.LOW_LIMIT)
  // console.log(topPlaylist);


  res.render( 'pages/home', {
    currentProfile,
    recommendedAlbums,
    recommendedArtists,
    newRelease,
    featuredPlaylist,
    topPlaylist,
    recentlyPlayedTracks

  })

}

export { home }
