export const phoneHandler = (tel) => {
  let _tel = tel
  if (String(tel).indexOf('886') === 0) {
    _tel = `+${tel}`
  }

  return _tel
}

export const dateSorter = (array, targetField) => {
  return array.sort((a, b) => a[`${targetField}`] - b[`${targetField}`])
}

export const dateFormatter = (dateAndTime, format) => {
  const week = ['日', '一', '二', '三', '四', '五', '六']
  const date = new Date(dateAndTime)

  const _year = date.getFullYear()
  const _month = `${date.getMonth() + 1}`
  const _date = `${date.getDate()}`
  const _hour = `${date.getHours()}`
  const _min = `${date.getMinutes()}`
  const _sec = `${date.getSeconds()}`
  const _day = `${week[date.getDay()]}`

  let result = ''
  result = format.replace('yyyy', _year)
  result = result.replace('mm', _month.padStart(2, '0'))
  result = result.replace('dd', _date.padStart(2, '0'))
  result = result.replace('HH', _hour.padStart(2, '0'))
  result = result.replace('MM', _min.padStart(2, '0'))
  result = result.replace('SS', _sec.padStart(2, '0'))
  result = result.replace('ww', _day)

  return result
}

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

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0
}
