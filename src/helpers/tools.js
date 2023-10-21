export const getAdultDate = () => {
  const now = new Date()

  const _year = now.getFullYear()
  const _month = `${now.getMonth() + 1}`
  const _date = `${now.getDate()}`
  const _hour = `${now.getHours()}`
  const _min = `${now.getMinutes()}`
  const _sec = `${now.getSeconds()}`

  const adultDate = `${_year - 20}-${_month.padStart(2, '0')}-${_date.padStart(
    2,
    '0'
  )}T${_hour.padStart(2, '0')}:${_min.padStart(2, '0')}:${_sec.padStart(
    2,
    '0'
  )}+08:00`

  return new Date(adultDate)
}

export const formatNumberWithCommas = (number) => {
  if (isNaN(number)) {
    return 'Invalid number'
  }

  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return number ? parts.join('.') : number
}
