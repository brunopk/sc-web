import API_ENDPOINTS from './endpoints'
import ApiError from './ApiError'
import 'buffer'

/**
 * Send request to API
 * @param {string} url
 * @param {string} token
 * @param {string} method
 * @param {object} body
 * @returns {Promise<object>} result
 */
async function sendRequest({ url, token = null, method = 'GET', body = null }) {
  const host = localStorage.getItem('masterAddress')
  const port = localStorage.getItem('masterPort')
  const fetchParams = { method }

  url = url.replace('HOST', host).replace('PORT', port)

  if (body != null) {
    fetchParams.body = JSON.stringify({ ...body })
    fetchParams.headers = { 'Content-Type': 'application/json' }
  }

  if (token != null) {
    fetchParams.headers = typeof fetchParams.headers !== 'undefined' ? fetchParams.headers : {}
    fetchParams.headers.Authorization = `Bearer ${token}`
  }

  const resp = await fetch(url, fetchParams)
  if (resp.ok) {
    return resp.json()
  }
  throw new ApiError(resp.status, resp.statusText)
}

async function getToken({ username, password }) {
  const host = localStorage.getItem('masterAddress')
  const port = localStorage.getItem('masterPort')
  const url = API_ENDPOINTS.GET_TOKEN.URL.replace('HOST', host).replace('PORT', port)
  const details = {
    username,
    password,
    grant_type: 'password',
    scope: 'write read commands resources'
  }

  let formBody = []

  Object.entries(details).forEach((entry) => {
    const encodedKey = encodeURIComponent(entry[0])
    const encodedValue = encodeURIComponent(entry[1])
    formBody.push(`${encodedKey}=${encodedValue}`)
  })

  formBody = formBody.join('&')

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line max-len
      Authorization: `Basic ${Buffer.from('FTKrjbWmIWQNmeBWIfwHj0duKmZYJLUzdKSEmflR:VmxFzDnhLNoCaLw27J7JzlXQQx8RoOmIZ5jTfy6nG5kBLRDVo4VuMkmPky3Wf6ZlddaZq0BEDaLAxM6feZfDKOXj9qxIo3B0GUvWGrhZsBRt19xNOXQUq8HhHAxTw2Ee').toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })

  if (resp.ok) {
    return resp.json()
  }
  throw new ApiError(resp.status, resp.statusText)
}

export { sendRequest, getToken }
