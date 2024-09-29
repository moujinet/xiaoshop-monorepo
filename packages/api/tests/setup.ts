import { getTestApplication } from './utils'

beforeAll(async () => {
  await getTestApplication()
}, 20000)

afterAll(async () => {
  await getTestApplication().then(
    app => app.close(),
  )
}, 20000)
