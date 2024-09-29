"use strict";

/**
 * node modules 
 */
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * custom modules
 */

import login from './src/routes/login.routes.js';
import auth from './src/routes/auth.routes.js';
import authenticatedUser from './src/middlewares/auth_user.middleware.js';
import home from './src/routes/home.route.js';
import explore from './src/routes/explore.route.js';
import album from './src/routes/album.route.js';
import playlist from './src/routes/playlist.route.js';
import profile from './src/routes/profile.route.js';
import search from './src/routes/search.route.js';
import artist from './src/routes/artist.route.js';
import track from './src/routes/track.route.js';
import logout from './src/routes/logout.route.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**
 * EJS Setting
 */

const app = express();
app.set('views', path.join(__dirname, 'views')); 

app.set('view engine', 'ejs');

/**
 * Static file serving 
 */
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Enabel cors nd cookie parser
 */
app.use(cors()).use(cookieParser())
     
/**
 *  Enalble post request body
 */
app.use(express.urlencoded({extended:true}))

/**
 * login page
 */
app.use('/login', login)

/**
 * logout page
 */
app.use('/logout',logout)

/**
 * auth page
 */
app.use('/auth',auth)

/**
 * checkuser authentication
 */
app.use(authenticatedUser)

/**
 * home page
 */
app.use('/',home)

/**
 * Explore page
 */
app.use('/explore',explore)

/**
 * Album page
 */
app.use('/album',album)

/**
 * Album page
 */
app.use('/playlist',playlist)

/**
 * profile page
 */
app.use('/me',profile)

/**
 * search result page
 */
app.use('/search',search)
   
/**
 * artist  page
 */
app.use('/artist',artist)   
/**
 * track  page
 */
app.use('/track',track)   
/**
 * 404 page 
 */
app.use((req,res)=> {
    res.render('./pages/404');
 })

app.listen(5500,()=>{
    console.log(`Server listening at http://localhost:5500 `);
})