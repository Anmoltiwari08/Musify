'use strict'

/**
 * custom Modules
 */

const userApi = require("../api/user.api")
const playerApi = require('../api/player.api')
const albumApi = require('../api/album.api')
const artistApi = require('../api/artist.api')
const apiConfig = require('../config/api.config')
const  {msToTimeCode}       = require('../utils/helpers.util')

const album = async (req,res) =>{

  //current user profile
  const currentProfile = await userApi.getProfile(req);
  
  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)
  
  // new release albums 
  const newRelease = await albumApi.getNewRelease(req)
  
  res.render('./pages/album',{
    title:'New Release',
    currentProfile,
    recentlyPlayedTracks,
    albums: newRelease

  })

}

const albumDetail = async (req,res)=>{
      //current user profile
  const currentProfile = await userApi.getProfile(req);
  
  // recently played tracks 
  const recentlyPlayed = await playerApi.getRecentlyPlayed(req)
  const recentlyPlayedTracks = recentlyPlayed.items.map(({ track }) => track)

  // album detail
  const albumDetails  = await albumApi.getDetail(req)
//   console.log(albumDetails);
  
// more by artists 
const [firstArtist] = albumDetails.artists
const moreByArtists = await artistApi.getAlbum(req,apiConfig.LOW_LIMIT,firstArtist.id)


  res.render('./pages/album_detail',{
    currentProfile,
    recentlyPlayedTracks,
    albumDetails,
    moreByArtists :{firstArtist,...moreByArtists},
    msToTimeCode
  }) 

}

module.exports={
    album,
    albumDetail
}
