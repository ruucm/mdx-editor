export const ONE_DAY = 60 * 60 * 24
export const timeStringToSeconds = hms => {
  const a = hms.includes(";") ? hms.split(";") : hms.split(":") // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const seconds =
    // +a[0] * 60 * 60 + // this line for hours
    +a[1] * 60 + +a[2] + +a[3] / 60
  return seconds
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const MONTHS_KO = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
]

export const timeStampToDate = (timeStamp, details = false) => {
  if (timeStamp) {
    var a = new Date(timeStamp * 1000)

    var year = a.getFullYear()
    var month = MONTHS[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + " " + month + " " + year
    if (details) time = time + " " + hour + ":" + min + ":" + sec
    // + " " + hour + ":" + min + ":" + sec
    return time
  }
}

export const timeGap = timeStamp => {
  const now = new Date().getTime()
  const gap = (now - timeStamp) / 1000 / 60
  if (gap < 60) return Math.round(gap) + "min"
  else if (60 < gap && gap < 60 * 24) return Math.round(gap / 60) + "h"
  else return Math.round(gap / (60 * 24)) + "d"
}

export function toTimestamp(strDate) {
  var datum = Date.parse(strDate)
  return datum / 1000
}

export function currentMonth({ intl }) {
  const month = new Date().getMonth()
  return intl.locale === "ko" ? MONTHS_KO[month] : MONTHS[month]
}
