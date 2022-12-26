const { addHours } = require("date-fns")

const customAddHours = (date) => {
  const hoursToAdd = process.env.CUSTOM_ENV === "production" ? 3 : 0

  return addHours(date, hoursToAdd)
}

module.exports = customAddHours
