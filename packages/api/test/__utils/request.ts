import request from 'supertest'

export function useRequest(method: string, url: string) {
  const app = globalThis.__APP__
  const token = globalThis.__TOKEN__
  const agent = request(app.getHttpServer())

  return agent[method](url)
    .auth(token, { type: 'bearer' })
    .set('x-client-ip', '114.114.114.114')
}
