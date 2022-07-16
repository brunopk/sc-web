const API_ENDPOINTS = {
  GET_TOKEN: {
    URL: 'http://HOST:PORT/o/token/',
    METHOD: 'POST'
  },
  GET_COLOR: {
    URL: 'http://HOST:PORT/resources/color',
    METHOD: 'GET'
  },
  CMD_SCRPI_STATUS: {
    URL: 'http://HOST:PORT/commands/scrpi/status',
    METHOD: 'PATCH'
  },
  CMD_SCRPI_CONNECT: {
    URL: 'http://HOST:PORT/commands/scrpi/connect',
    METHOD: 'PATCH'
  }
}

export default API_ENDPOINTS
