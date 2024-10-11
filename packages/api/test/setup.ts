import { createTestingApplication } from '#/__utils/application'

beforeAll(async () => {
  await createTestingApplication()
}, 20000)

afterAll(async () => {
  await createTestingApplication().then(
    app => app.close(),
  )
}, 20000)
