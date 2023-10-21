import emitter from '../helpers/emitter'
import {} from './const'

export default (error) => {
  let errorRes

  console.log('error', error)

  const code = error?.data?.code ? `(-${error?.data?.code})` : ''
  emitter.emit('callMessager', {
    message: `您好，目前無法取得資訊，請稍後再試或與客服人員聯繫，謝謝${code}`,
    action: () => close(),
  })

  errorRes = {
    code: error.data.code,
    message: error.data.message,
  }
  return errorRes
}
