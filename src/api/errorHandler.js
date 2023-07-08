import emitter from '../helpers/emitter';
import {
  TokenErrorCodes,
  HttpStatus,
  CODE_TIMEOUT,
  UNKNOWN_ERROR,
} from './const';

/**
 * Handle error from api
 * @param error error from response
 * @param requestTimes number of request times
 * @param requestTimesLimit limit of request times
 */
export default (error, requestTimes, requestTimesLimit) => {
  let errorRes;
  const noPhoneNumber = true;

  if (!error || !error.status || error.status !== HttpStatus.OK) {
    console.error(JSON.parse(JSON.stringify(error)));
    emitter.emit('callMessager', {
      message: '您好，目前無法取得資訊，請稍後再試或與客服人員聯繫，謝謝',
      action: () => close(),
      noPhoneNumber,
    });
    errorRes = {
      code: UNKNOWN_ERROR,
      message: UNKNOWN_ERROR,
    };
    return errorRes;
  }

  if (error.code === CODE_TIMEOUT) {
    if (requestTimes === requestTimesLimit - 1) {
      emitter.emit('callMessager', {
        message: '您好，目前無法取得資訊，請稍後再試或與客服人員聯繫，謝謝.',
        action: () => close(),
      });
    }
    errorRes = {
      code: CODE_TIMEOUT,
      message: 'Api timeout',
    };
    return errorRes;
  }

  if (TokenErrorCodes.includes(error.data.code)) {
    emitter.emit('callMessager', {
      message: `您好，目前無法取得資訊，請稍後再試或與客服人員聯繫，謝謝(${error.data.code})`,
      action: () => close(),
      noPhoneNumber,
    });
  } else {
    emitter.emit('callMessager', {
      message: `您好，目前無法取得資訊，請稍後再試或與客服人員聯繫，謝謝(-${error.data.code})`,
      action: () => close(),
    });
  }

  errorRes = {
    code: error.data.code,
    message: error.data.message,
  };
  return errorRes;
};
