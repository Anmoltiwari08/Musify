'use strict'

/**
 * custom modules
 */

import { cookies, transferPlayback, play } from "./client_player.api.js"
import { addEventOnElems, msToTimeCode } from "../utils.js"

const /**{Array<HTMLElement} */ $players = document.querySelectorAll('[data-player]')
const /**{Array<HTMLElement} */ $playerNextBtn = document.querySelector('[data-player-next-btn]')
const /**{Array<HTMLElement} */ $playerPrevBtn = document.querySelector('[data-player-prev-btn]')

const updatePlayerInfo = (playerState, $player) => {

    const /**{HTMLElement} */ $trackBanner = $player.querySelector('[data-track-banner]')
    const /**{HTMLElement} */ $trackName = $player.querySelector('[data-track-name]')

    const /**{HTMLElement} */ $trackArtist = $player.querySelector('[data-track-artist]')

    // destructure current playerState
    const {
        track_window: {
            current_track: {
                album: { images: trackImages },
                artists: trackArtists,
                name: trackName,
            }
        }
    } = playerState

    const {
        url = '/images/track-banner.png',
        width,
        height
    } = trackImages.find(item => item.width > 200 && item.width < 400)

    const /** {string} */ artistName = trackArtists.map(({ name }) => name).join(', ')

    $trackBanner.src = url;
    $trackBanner.width = width
    $trackBanner.height = height

    $trackBanner.alt = trackName
    $trackName.textContent = trackName
    $trackArtist.textContent = artistName
    $player.classList.remove('hide')
    $player.classList.remove('disabled')

}

let /**{Array<HTMLElement | undefined } */ $lastActivePlayBtns = []

const updateCardPlayBtnState = (playerState) => {

    const {
        paused,
        context: { uri },
        track_window: {
            current_track: { uri: trackUri }
        }
    } = playerState

    const  /** {Array<HTMLElement>} */ $cardPlayBtns = document.querySelectorAll(`[data-uri="${uri}"]`)

    const /** {Array<HTMLElement>} */  $trackPlayBtn = document.querySelectorAll(`[data-track-uri="${trackUri}"]`)

    const /** {Array<HTMLElement>} */  $currentActivePlayBtns = [...$cardPlayBtns, ...$trackPlayBtn]

    $lastActivePlayBtns.forEach($playBtns => {
        $playBtns.classList.remove('active')
        $playBtns.dataset.playBtn = 'play'

    })

    $currentActivePlayBtns.forEach($playBtns => {
        $playBtns.classList[paused ? 'remove' : 'add']('active')
        $playBtns.dataset.playBtn = paused ? 'play' : 'pause'

    })

    $lastActivePlayBtns = $currentActivePlayBtns

}

const updatePlayerBtnState = (playerState, $player) => {
    const  /*** {HTMLElement} */ $playerControlPlay = $player.querySelector('[data-player-control-play]')

    const { paused } = playerState

    $playerControlPlay.classList[paused ? 'remove' : 'add']('active')
    $playerControlPlay.dataset.playBtn = paused ? 'play' : 'pause';

}
 
const /**{string} */ DocumentTitle = document.title

const updateDocumentTitle = (playerState) => {

    const {
        paused,
        track_window: {
            current_track: {
                artists: trackArtists,
                name: trackName
            }
        }
    } = playerState

    const /** {string} */ artistNameStr = trackArtists.map(({ name }) => name).join(', ')

    document.title = paused ? DocumentTitle : `${trackName} • ${artistNameStr} | Musify `


}

const /** {HTMLElement } */ $playerLgProgress = document.querySelector('[data-player-progress-lg]')

const /** {HTMLElement } */ $playerSmProgress = document.querySelector('[data-player-progress-sm]')

const /** {HTMLElement } */ $playerLgProgressPos = document.querySelector('[data-progress-pos]')

const /** {HTMLElement } */ $playerLgProgressDuration = document.querySelector('[data-progress-duration]')

let /** {NodeJs.Timeout | undefined } */ lastProgressInterval;


const updatePlayerProgress = (playerState) => {

    const {
        position,
        duration,
        paused
    } = playerState
    // console.log(position);

    // progress initial value 
    let currentPosition = position;
    $playerLgProgress.max = duration;
    $playerSmProgress.max = duration
    $playerLgProgress.value = currentPosition;
    $playerSmProgress.value = currentPosition
    $playerLgProgressDuration.textContent = msToTimeCode(duration)
    $playerLgProgressPos.textContent = msToTimeCode(currentPosition)

    lastProgressInterval && clearInterval(lastProgressInterval)

    if (!paused) {
        const currentProgressInterval = setInterval(() => {
            currentPosition += 1000

            $playerLgProgress.value = currentPosition
            $playerSmProgress.value = currentPosition
            $playerLgProgressPos.textContent = msToTimeCode(currentPosition)
        }, 1000)
        lastProgressInterval = currentProgressInterval
    }


}

const playerStateChanged = (playerState) => {
    const { track_window } = playerState

    // update player ui
    $players.forEach(item => updatePlayerInfo(playerState, item))

    // update card play btn ui state play, pause , 
    updateCardPlayBtnState(playerState)

    // update player control  play-btn ui state after state change 
    $players.forEach(player => updatePlayerBtnState(playerState, player))

    // update document title when playing track 
    updateDocumentTitle(playerState)

    // update player progress
    updatePlayerProgress(playerState)

    // disable next and prev button if there is no track available 
    //    console.log(track_window);

    $playerNextBtn.disabled = !track_window.next_tracks.length
    $playerPrevBtn.disabled = !track_window.previous_tracks.length


}

/** Toggle Play */

const togglePlay = async function (player) {

    const /** string */ deviceId = localStorage.getItem('device_id')

    const {
        context: { uri: currentUri },
        track_window: {
            current_track: { uri: currenTrackUri }
        }
    } = await player.getCurrentState()

    const {
        uri: btnUri,
        trackUri: btnTrackUri,
        playBtn
    } = this.dataset

    if (playBtn === 'play') {
        const /** {boolean} */ lastPlayed = currentUri === btnUri || currenTrackUri === btnTrackUri;

        if ((!btnUri && !btnTrackUri) || lastPlayed) {
            return await player.resume()
        }

        const  /** {object} */ reqBody = {}

        btnUri ? reqBody.context_uri = btnUri : null
        btnTrackUri ? reqBody.uris = [btnTrackUri] : null

        await play(deviceId, reqBody)
        
    } else {
        await player.pause()
    }

}

const  /** {HTMLElement} */ $volumeProgress = document.querySelector('[data-volume-progress]')

const   /** {HTMLElement} */ $volumeBtnIcon = document.querySelector('[data-volume-btn] .icon')

const setVolumeIcon = function (volume) {

    // the name of the volume icon to be displayed

    const volumeIcon =
        volume > 66 ? 'volume_up' :
            volume > 33 ? 'volume_down' :
                volume > 0 ? 'volume_mute' : "volume_off"

    $volumeBtnIcon.textContent = volumeIcon
    

}

const updatePlayerVolume = async function (player) {
    const  /** {} */ VolumePrecent = this.value

    // seting player volume icon
    setVolumeIcon(VolumePrecent)

    // set volume to player 
    await player.setVolume(VolumePrecent / 100)

    // store volume to localStorage
    localStorage.setItem('volume', VolumePrecent)

}

window.onSpotifyWebPlaybackSDKReady = () => {

    const /** {number} */ volume = localStorage.getItem('volume') ?? 100;

    /**
     * Create spotify player instance
    */

    const player = new Spotify.Player({
        name: 'Musify Web Player',
        getOAuthToken: (callback) => { callback(cookies.get('access_token')) },
        volume: volume / 100
    });
  

    // Player is Ready
    player.addListener('ready', async ({ device_id }) => {
        console.log('Ready with Device ID', device_id);

        // store device_id in localStorage
        localStorage.setItem('device_id', device_id)

        // transfer playback to current device 
        await transferPlayback(device_id)

        const /**{Array<HTMElement} */ $playBtns = document.querySelectorAll('[data-play-btn]')
        addEventOnElems($playBtns, 'click', function () {
            togglePlay.call(this, player)
        })

        // Skip to next track 
        $playerNextBtn.addEventListener('click', async () => {
            await player.nextTrack()
        })

        // Skip to previous track 
        $playerPrevBtn.addEventListener('click', async () => {
            await player.previousTrack()
        })

        // control player seek 
        $playerLgProgress.addEventListener('input', async function () {
            await player.seek(this.value)
            // console.log(this.value);

        })

        // control player volume 
        $volumeProgress.addEventListener('input', updatePlayerVolume.bind($volumeProgress, player))

        //  initially set the volume from the previous one setted 
        await player.getVolume().then(volume => {
            let volume_percentage = volume * 100;
            $volumeProgress.value = volume_percentage
            setVolumeIcon(volume_percentage)
           
          });
          
    });

    // call event when any changes occur in player
    player.addListener('player_state_changed', playerStateChanged)

    // Connect Player  
    player.connect();
    
}   
    
    