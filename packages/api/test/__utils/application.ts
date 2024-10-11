import { Test, TestingModule } from '@nestjs/testing'

import { Server } from '~/server'

export async function createTestingApplication() {
  if (!globalThis.__APP__) {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Server,
      ],
    }).compile()

    const app = module.createNestApplication()
    await app.init()

    globalThis.__APP__ = app
  }

  return globalThis.__APP__
}
