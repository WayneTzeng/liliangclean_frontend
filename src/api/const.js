export const ApiResponseCode = {
  NoPermission: 0, // 無權限
  Success: 1, // 成功
  Fail: 2, // 失敗
  Empty: 3, // 空資料
};

export const ErrorCodes = [
  ApiResponseCode.NoPermission,
  ApiResponseCode.Fail,
  ApiResponseCode.Empty,
];

export const TokenErrorCodes = [ApiResponseCode.NoPermission];

export const HttpStatus = {
  OK: 200,
};

export const Methods = {
  GET: 'GET',
  POST: 'POST',
};

export const CODE_TIMEOUT = 'ECONNABORTED';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
