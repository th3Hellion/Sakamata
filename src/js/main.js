import { updateTimer } from "./modules/time.js"
import YouTubePlayer from "youtube-player"

const URL = "https://sakamata-api.onrender.com/livestream-status"
const videoPlayer = document.getElementById("video-player")
const timer = document.getElementById("timer")
videoPlayer.style.display = "none"

let playing = false
let lastBroadcast

// Get the data from the server
async function getData() {
  let player
  let isLive = "none"
  let videoID

  try {
    const response = await fetch(URL)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    isLive = data.livestreamStatus
    videoID = data.videoId
    if (isLive !== "none") {
      lastBroadcast = "Stream is Live"
    } else lastBroadcast = new Date(data.updated)

    if (isLive !== "none") {
      videoPlayer.style.display = "flex"
      if (!playing) {
        timer.style.display = "none"
        player = YouTubePlayer("video-player")
        player.loadVideoById(videoID)
        playing = true
      }
    } else {
      videoPlayer.style.display = "none"
      timer.style.display = "flex"
      playing = false
    }
  } catch (error) {
    console.error(error)
  }
}

// Fetch the data on page load
document.addEventListener("DOMContentLoaded", function () {
  getData()
  setInterval(() => {
    getData()
  }, 10 * 1000)

  setInterval(() => {
    if (lastBroadcast === "Stream is Live") {
      return
    }
    const currentTime = Date.now()
    updateTimer(currentTime, lastBroadcast)
  }, 1000)
})
