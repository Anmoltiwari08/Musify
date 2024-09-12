"use strict"

/**
 * node modules 
 */

const cors = require('cors');
const cookieParser = require('cookie-parser')


// initial express app
const express = require("express");
const app = express()

/**
 * custom modules
 */
const login = require('./src/routes/login.routes')
const auth = require('./src/routes/auth.routes')
const authenticatedUser = require('./src/middlewares/auth_user.middleware')
const home = require('./src/routes/home.route')
const explore = require('./src/routes/explore.route')
const album = require('./src/routes/album.route')
const playlist = require('./src/routes/playlist.route')
const profile = require('./src/routes/profile.route')
const search = require('./src/routes/search.route')
const artist = require('./src/routes/artist.route')
const track = require('./src/routes/track.route')
const logout = require('./src/routes/logout.route')

/**
 * EJS Setting
 */
app.set('view engine', 'ejs')

/**
 * Setting static files 
*/

app.use(express.static(`${__dirname}/public`))

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
  