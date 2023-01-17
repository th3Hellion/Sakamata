import { updateTimer } from "./modules/time.js"
import YouTubePlayer from "youtube-player"

const URL = "https://sakamata-api.onrender.com/livestream-status"
const videoPlayer = document.getElementById("video-player")
const timer = document.getElementById("timer")
videoPlayer.style.display = "none"

let isLive = "none"
let lastBroadcast
let videoID
let player
let playing = false

// Get the data from the server
async function getData() {
  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    isLive = data.status
    lastBroadcast = new Date(data.updated)
    videoID = data.videoId

    if (isLive !== "none") {
      videoPlayer.style.display = "flex"
      //console.log("channel is live")
      if (!playing) {
        timer.style.display = "none"
        player = YouTubePlayer("video-player")
        player.loadVideoById(videoID)
        playing = true
      } else {
        //console.log("playing")
      }
    } else {
      //console.log("channel is not live")
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch the data on page load
getData()

// Fetch the data every 10 seconds afterwards
setInterval(getData, 10 * 1000)

// Update the timer
setInterval(() => {
  const currentTime = Date.now()
  updateTimer(currentTime, lastBroadcast)
}, 1000)
