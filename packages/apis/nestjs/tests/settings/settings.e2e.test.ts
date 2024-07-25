import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { EXCEPTION_EXISTS, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { createNestApplication, truncateTable } from '~~/tests/application'
import { SettingsModule } from '@/settings/settings.module'

describe('Settings Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createNestApplication([
      SettingsModule.register(),
    ])
    await app.init()

    await truncateTable([
      'manage_settings',
    ])
  })

  afterAll(async () => {
    await app.close()
  })

  it('Create Settings', async () => {
    return await request(app.getHttpServer())
      .post('/settings/create')
      .send([
        {
          key: 'test.key',
          value: 'test',
        },
        {
          key: 'test.key2',
          value: 'test',
        },
        {
          key: 'test.key3',
          value: 'test',
        },
      ])
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Settings', async () => {
    return await request(app.getHttpServer())
      .put('/settings/update')
      .send([
        {
          key: 'test.key',
          value: 'test update',
        },
      ])
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Settings List', async () => {
    return await request(app.getHttpServer())
      .get('/settings/list')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined()

        const test = body.data.find(d => d.key === 'test.key')
        expect(test.value).toEqual('test update')
      })
  })

  it('Create Settings Throw ExistsException', async () => {
    return await request(app.getHttpServer())
      .post('/settings/create')
      .send([
        {
          key: 'test.key',
          value: '1',
        },
      ])
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(EXCEPTION_EXISTS)
      })
  })

  it('Update Settings Throw NotFoundException', async () => {
    return await request(app.getHttpServer())
      .put('/settings/update')
      .send([
        {
          key: 'store.bad',
          value: '1',
        },
      ])
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
      })
  })

  it('Delete Settings', async () => {
    return request(app.getHttpServer())
      .delete('/settings/delete')
      .send({ keys: ['test.key', 'test.key3', 'test.key2'] })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })
})
