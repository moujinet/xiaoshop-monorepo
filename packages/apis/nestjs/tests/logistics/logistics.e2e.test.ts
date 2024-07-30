import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { createNestApplication, truncateTable } from '~~/tests/application'
import { LogisticsModule } from '@/logistics/logistics.module'

describe('Logistics Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createNestApplication([
      LogisticsModule,
    ])
    await app.init()

    await truncateTable([
      'manage_logistics_company',
      'manage_logistics_freight_template',
    ])
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Logistics Company', () => {
    it('Create Company', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/logistics/company/create')
        .send({
          name: 'test',
          desc: 'test desc',
          url: 'http://www.test.com',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Company', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/logistics/company/update?id=1')
        .send({
          name: 'test update',
          desc: 'test desc',
          url: 'http://www.test.com',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Company List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/logistics/company/list')
        .expect(200)

      const test = body.data.find(d => d.id === 1)
      expect(test.name).toEqual('test update')
    })

    it('Company Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/logistics/company/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('test update')
    })

    it('Find Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/logistics/company/detail?id=2')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Create Company Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/logistics/company/create')
        .send({
          name: 'test update',
          desc: 'test desc',
          url: 'http://www.test.com',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Update Company Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/logistics/company/update?id=3')
        .send({
          name: 'test new',
          desc: 'test desc',
          url: 'http://www.test.com',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Company Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/logistics/company/create')
        .send({
          name: 'test new',
          desc: 'test desc',
          url: 'http://www.test.com',
          sort: 1,
        })

      const { body } = await request(app.getHttpServer())
        .put('/logistics/company/update?id=1')
        .send({
          name: 'test new',
          desc: 'test desc',
          url: 'http://www.test.com',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Company Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/logistics/company/create')
        .send({
          name: 'test update new',
          desc: 'test desc',
          url: '111',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Delete Company', async () => {
      await request(app.getHttpServer())
        .delete('/logistics/company/delete')
        .send({
          id: 1,
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .get('/logistics/company/detail?id=1')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })
  })

  describe('Logistics Freight Template', () => {
    it('Create Freight Template', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/freight-template/create')
        .send({
          name: 'template 1',
          calcMode: 'count',
          rules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              first: 1,
              firstPrice: 2,
              continue: 3,
              continuePrice: 4,
            },
          ],
          enableFreeRules: 'Y',
          freeRules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              overCount: 1,
              overAmount: 10,
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Freight Template Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/freight-template/create')
        .send({
          name: 'template 1',
          calcMode: 'count',
          rules: [],
          enableFreeRules: 'Y',
          freeRules: [],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Freight Template Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/freight-template/create')
        .send({
          name: 'template 2',
          calcMode: 'count',
          rules: [],
          enableFreeRules: 'Y',
          freeRules: [],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Freight Template Throw BadRequestException 2', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/freight-template/create')
        .send({
          name: 'template 2',
          calcMode: 'count',
          rules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              first: 1,
              firstPrice: 2,
              continue: 3,
              continuePrice: 4,
            },
          ],
          enableFreeRules: 'Y',
          freeRules: [],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Freight Template Throw BadRequestException 3', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/freight-template/create')
        .send({
          name: 'template 2',
          calcMode: 'count',
          rules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              first: 1,
              firstPrice: 2,
              continue: 3,
              continuePrice: 4,
            },
          ],
          enableFreeRules: 'Y',
          freeRules: '[]',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Freight Template 2', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/freight-template/create')
        .send({
          name: 'template 2',
          calcMode: 'count',
          rules: [
            {
              locations: [[{ code: '11', name: '北京市' }]],
              first: 1,
              firstPrice: 2,
              continue: 3,
              continuePrice: 4,
            },
          ],
          enableFreeRules: 'N',
          freeRules: [],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Freight Template List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/freight-template/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Update Freight Template', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/freight-template/update?id=1')
        .send({
          name: 'template 1',
          calcMode: 'count',
          rules: [
            {
              locations: [
                [{ code: '11', name: '北京市' }],
              ],
              first: 10,
              firstPrice: 20,
              continue: 30,
              continuePrice: 40,
            },
          ],
          enableFreeRules: 'Y',
          freeRules: [
            {
              locations: [
                [{ code: '11', name: '北京市' }],
              ],
              overCount: 2,
              overAmount: 20,
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Freight Template Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/freight-template/detail?id=1')
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Freight Template 2', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/freight-template/update?id=1')
        .send({
          name: 'template 1',
          calcMode: 'count',
          rules: [
            {
              locations: [
                [{ code: '11', name: '北京市' }],
              ],
              first: 10,
              firstPrice: 20,
              continue: 30,
              continuePrice: 40,
            },
          ],
          enableFreeRules: 'N',
          freeRules: [],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Freight Template Detail 2', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/freight-template/detail?id=1')
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Delete Freight Template', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/freight-template/delete')
        .send({ id: 1 })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })
})
