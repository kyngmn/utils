type ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
type ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
type ERR_BAD_OPTION = 'ERR_BAD_OPTION';
type ERR_NETWORK = 'ERR_NETWORK';
type ERR_DEPRECATED = 'ERR_DEPRECATED';
type ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
type ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
type ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
type ERR_INVALID_URL = 'ERR_INVALID_URL';
type ERR_CANCELED = 'ERR_CANCELED';
type ECONNABORTED = 'ECONNABORTED';
type ETIMEDOUT = 'ETIMEDOUT';
type ERR_SSL_PROTOCOL_ERROR = 'ERR_SSL_PROTOCOL_ERROR';
type ERR_SSL_BAD_CERT = 'ERR_SSL_BAD_CERT';

type NetworkErrorInfo = {
  message?: string;
  customMessage?: string;
  code?:
    | ERR_FR_TOO_MANY_REDIRECTS
    | ERR_BAD_OPTION_VALUE
    | ERR_BAD_OPTION
    | ERR_NETWORK
    | ERR_DEPRECATED
    | ERR_BAD_RESPONSE
    | ERR_BAD_REQUEST
    | ERR_NOT_SUPPORT
    | ERR_INVALID_URL
    | ERR_CANCELED
    | ECONNABORTED
    | ETIMEDOUT
    | ERR_SSL_PROTOCOL_ERROR
    | ERR_SSL_BAD_CERT
    | string;
  status?: number;
};

export default function formatNetworkErrorMessage({
  message,
  customMessage,
  code,
  status,
}: NetworkErrorInfo): string {
  let formatted = '';
  switch (code) {
    case 'ERR_FR_TOO_MANY_REDIRECTS':
      formatted = '리다이렉션이 너무 많습니다. 요청을 다시 시도해 주세요.';
      break;
    case 'ERR_BAD_OPTION_VALUE':
      formatted = '잘못된 옵션 값이 있습니다. 설정을 확인해 주세요.';
      break;
    case 'ERR_BAD_OPTION':
      formatted = '잘못된 옵션이 있습니다. 설정을 확인해 주세요.';
      break;
    case 'ERR_NETWORK':
      formatted = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.';
      break;
    case 'ERR_DEPRECATED':
      formatted = '더 이상 지원되지 않는 요청입니다.';
      break;
    case 'ERR_BAD_RESPONSE':
      formatted = '서버로부터 잘못된 응답을 받았습니다.';
      break;
    case 'ERR_BAD_REQUEST':
      formatted = '잘못된 요청입니다. 입력 값을 확인하세요.';
      break;
    case 'ERR_NOT_SUPPORT':
      formatted = '지원되지 않는 기능입니다.';
      break;
    case 'ERR_INVALID_URL':
      formatted = '잘못된 URL입니다.';
      break;
    case 'ERR_CANCELED':
      formatted = '요청이 취소되었습니다.';
      break;
    case 'ECONNABORTED':
      formatted = '요청 시간이 초과되었습니다. 나중에 다시 시도하세요.';
      break;
    case 'ETIMEDOUT':
      formatted = '요청 시간이 초과되었습니다. 인터넷 연결을 확인하세요.';
      break;
    case 'ERR_SSL_PROTOCOL_ERROR':
      formatted = 'SSL 프로토콜 오류가 발생했습니다. 보안 연결을 확인하세요.';
      break;
    case 'ERR_SSL_BAD_CERT':
      formatted =
        '서버의 SSL 인증서가 유효하지 않습니다. 보안 연결을 확인하세요.';
      break;
  }

  switch (status) {
    case 400:
      formatted = '잘못된 요청입니다. 입력 값을 확인하세요.';
      break;
    case 401:
      formatted = '인증이 필요합니다. 로그인 후 다시 시도하세요.';
      break;
    case 403:
      formatted = '접근이 금지되었습니다.';
      break;
    case 404:
      formatted = '요청한 리소스를 찾을 수 없습니다.';
      break;
    case 500:
      formatted = '서버에 문제가 발생했습니다. 잠시 후 다시 시도하세요.';
      break;
  }

  return (
    formatted || customMessage || message || '알 수 없는 오류가 발생했습니다.'
  );
}
