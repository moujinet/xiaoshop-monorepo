import { getTestApplication } from './utils'

beforeAll(async () => {
  await getTestApplication()
}, 10000)

afterAll(async () => {
  await getTestApplication().then(
    app => app.close(),
  )
}, 10000)
