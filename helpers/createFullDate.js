const { addHours, getDate, getISOWeek, getMonth, getYear } = require("date-fns")
const customAddHours = require("./customAddHours")

const createFullDate = (fromDateString) => {
  const date = !!fromDateString ? new Date(fromDateString) : new Date()
  const now = customAddHours(date)

  const fullDate = {
    unixDate: +now,
    date: now.toString(),
    day: getDate(now),
    weekOfYear: getISOWeek(now, {
      weekStartsOn: 1,
    }),
    month: getMonth(now) + 1,
    year: getYear(now),
  }

  return fullDate
}

module.exports = createFullDate
