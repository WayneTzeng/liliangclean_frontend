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
