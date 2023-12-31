// https://developer.mozilla.org/ja/docs/Web/HTTP/Status
export const ERROR_MAP: { [key: number]: { message: string } } = {
  400: { message: 'Bad Request' },
  401: { message: 'Unauthorized' },
  403: { message: 'Forbidden' },
  404: { message: 'Not Found' },
  405: { message: 'Method Not Allowed' },
  406: { message: 'Not Acceptable' },
  407: { message: 'Proxy Authentication Required' },
  408: { message: 'Request Timeout' },
  409: { message: 'Conflict' },
  410: { message: 'Gone' },
  411: { message: 'Length Required' },
  412: { message: 'Precondition Failed' },
  413: { message: 'Payload Too Large' },
  414: { message: 'URI Too Long' },
  415: { message: 'Unsupported Media Type' },
  416: { message: 'Range Not Satisfiable' },
  417: { message: 'Expectation Failed' },
  418: { message: "I'm a teapot" },
  421: { message: 'Misdirected Request' },
  422: { message: 'Unprocessable Entity' },
  423: { message: 'Locked' },
  424: { message: 'Failed Dependency' },
  426: { message: 'Upgrade Required' },
  428: { message: 'Precondition Required' },
  429: { message: 'Too Many Requests' },
  431: { message: 'Request Header Fields Too Large' },
  451: { message: 'Unavailable For Legal Reasons' },
  500: { message: 'Internal Server Error' },
  501: { message: 'Not Implemented' },
  502: { message: 'Bad Gateway' },
  503: { message: 'Service Unavailable' },
  504: { message: 'Gateway Timeout' },
  505: { message: 'HTTP Version Not Supported' },
  507: { message: 'Insufficient Storage' },
  508: { message: 'Loop Detected' },
  510: { message: 'Not Extended' },
  511: { message: 'Network Authentication Required' },
};
