import * as request from 'supertest'

export function useRequest(method: string, url: string, isAdmin = true) {
  const app = globalThis.__APP__
  const token = globalThis.__TOKEN__

  const agent = request(app.getHttpServer())

  if (method === 'get') {
    return agent.get(prepareUrl(url, isAdmin))
      .auth(token, { type: 'bearer' })
      .set('x-client-ip', '114.114.114.114')
  }
  else if (method === 'post') {
    return agent.post(prepareUrl(url, isAdmin))
      .auth(token, { type: 'bearer' })
      .set('x-client-ip', '114.114.114.114')
  }
  else if (method === 'put') {
    return agent.put(prepareUrl(url, isAdmin))
      .auth(token, { type: 'bearer' })
      .set('x-client-ip', '114.114.114.114')
  }
  else if (method === 'delete') {
    return agent.delete(prepareUrl(url, isAdmin))
      .auth(token, { type: 'bearer' })
      .set('x-client-ip', '114.114.114.114')
  }
}

/**
 * 拼接 URL
 *
 * @param url string
 * @param isAdmin boolean
 * @returns string
 */
export function prepareUrl(url: string, isAdmin = false): string {
  return isAdmin ? `/admin${url}` : url
}
