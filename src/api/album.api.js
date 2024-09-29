'use strict'

/**
 * custom modules
 */
import { getData } from '../config/axios.config.js';


import {getUrlQuery}  from '../utils/helpers.util.js';


const getNewRelease = async (req,itemLimit)=>{
      const {limit,offset,page} = getUrlQuery(req.params,itemLimit)
      
      const {data:{ albums:newRelease }} = await getData(`/browse/new-releases?Limit=${limit}&offset=${offset}`,req.cookies.access_token)
    
      return {baseUrl:req.baseUrl,page, ...newRelease} 
      
}

const getDetail = async (req)=>{
     const { albumId} = req.params

     const {data:albumDetail} = await getData(`/albums/${albumId}`,req.cookies.access_token)

     return albumDetail
}

export{
  getNewRelease,
  getDetail
              
}
  
