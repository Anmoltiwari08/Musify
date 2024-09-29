'use strict'

/**
 * custom Modules
 */

import * as userApi from '../api/user.api.js';
import * as playerApi from '../api/player.api.js';
import * as categoryApi from '../api/category.api.js';
import * as playlistApi from '../api/playlist.api.js';

const explore = async (req, res) => {

  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // get several categories
  const categories = await categoryApi.getSeveralDetail(req)

  res.render('./pages/explore', {
    currentProfile,
    recentlyPlayedTracks,
    categories

  })


}

const exploreDetail = async (req, res) => {

  //current user profile
  const currentProfile = await userApi.getProfile(req);

  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // get category detail 
  const catInfo = await categoryApi.getDetail(req)
  // console.log(catInfo);

  // get category playlist   
  const catPlaylist = await playlistApi.getCategoryPlaylist(req)
  // console.log(catPlaylist);

  res.render('./pages/explore_detail', {
    currentProfile,
    recentlyPlayedTracks,
    catInfo,
    catPlaylist

  })

}

export {
  explore,
  exploreDetail
}

