import { getTestApplication } from './utils'

beforeAll(async () => {
  await getTestApplication()
}, 1000)

afterAll(async () => {
  await getTestApplication().then(
    app => app.close(),
  )
}, 1000)
