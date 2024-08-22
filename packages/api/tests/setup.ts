import { getTestApplication } from './utils'

beforeAll(async () => {
  await getTestApplication()
}, 5000)

afterAll(async () => {
  await getTestApplication().then(
    app => app.close(),
  )
}, 1000)
