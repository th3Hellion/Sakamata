function getTimeDifference(currentTime, lastBroadcast) {
  let timeDifference = currentTime - lastBroadcast
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  return {
    days: Math.abs(days).toString(),
    hours: Math.abs(hours).toString().padStart(2, "0"),
    minutes: Math.abs(minutes).toString().padStart(2, "0"),
    seconds: Math.abs(seconds).toString().padStart(2, "0"),
  }
}

// Function that updates the timer
export function updateTimer(currentTime, lastBroadcast) {
  // Get the time difference
  let timeDifference = getTimeDifference(currentTime, lastBroadcast)
  let days = document.getElementById("days")
  let hours = document.getElementById("hours")
  let minutes = document.getElementById("minutes")
  let seconds = document.getElementById("seconds")

  if (timeDifference.seconds === "60") {
    timeDifference.seconds = "00"
  }

  // if NaN then set to 0
  if (isNaN(timeDifference.days)) {
    timeDifference.days = "."
    //Add style
    days.className = "bounce"
  }
  if (isNaN(timeDifference.hours)) {
    timeDifference.hours = "."
    hours.className = "bounce"
  }
  if (isNaN(timeDifference.minutes)) {
    timeDifference.minutes = "."
    minutes.className = "bounce"
  }
  if (isNaN(timeDifference.seconds)) {
    timeDifference.seconds = "."
    seconds.className = "bounce"
  } else {
    //Remove style
    days.className = ""
    hours.className = ""
    minutes.className = ""
    seconds.className = ""
  }

  // Change textcontent to "Day" if ends with 1
  if (timeDifference.days.endsWith("1") && !timeDifference.days.endsWith("11")) {
    document.getElementById("days-text").textContent = "Day"
  } else {
    document.getElementById("days-text").textContent = "Days"
  }

  // Display
  days.innerHTML = timeDifference.days
  hours.innerHTML = timeDifference.hours
  minutes.innerHTML = timeDifference.minutes
  seconds.innerHTML = timeDifference.seconds
}
