import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { EXCEPTION_EXISTS, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { createNestApplication, truncateTable } from '~~/tests/application'
import { AssetsModule } from '@/assets/assets.module'

describe('Assets Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createNestApplication([
      AssetsModule,
    ])
    await app.init()

    await truncateTable([
      'app_assets',
      'app_assets_group',
    ])

    const defaultGroups = [
      { name: '设计素材', parentId: 0, type: 'image', enableCompress: 'N', enableWatermark: 'N', enableThumbnail: 'N' },
      { name: '图标', parentId: 1, type: 'image', enableCompress: 'N', enableWatermark: 'N', enableThumbnail: 'N' },
      { name: '广告', parentId: 1, type: 'image', enableCompress: 'N', enableWatermark: 'N', enableThumbnail: 'N' },
      { name: '商品图片', parentId: 0, type: 'image', enableCompress: 'N', enableWatermark: 'N', enableThumbnail: 'N' },
      { name: '商品主图', parentId: 4, type: 'image', enableCompress: 'Y', enableWatermark: 'Y', enableThumbnail: 'Y' },
      { name: '商品视频', parentId: 0, type: 'video', enableCompress: 'N', enableWatermark: 'Y', enableThumbnail: 'N' },
    ]

    defaultGroups.forEach(async (group) => {
      await request(app.getHttpServer())
        .post('/assets/group/create')
        .send(group)
    })
  })

  afterAll(async () => {
    await app.close()
  })

  describe('Asset Group', () => {
    it('[Assets/Group] Create Asset Group', async () => {
    // #1
      const { body } = await request(app.getHttpServer())
        .post('/assets/group/create')
        .send({
          parentId: 0,
          type: 'image',
          name: 'test',
          enableCompress: 'Y',
          enableWatermark: 'Y',
          enableThumbnail: 'Y',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('[Assets/Group] Asset Group Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/group/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('设计素材')
    })

    it('[Assets/Group] Update Asset Group', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/assets/group/update?id=7')
        .send({
          parentId: 0,
          type: 'image',
          name: 'test 1',
          enableCompress: 'Y',
          enableWatermark: 'Y',
          enableThumbnail: 'Y',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('[Assets/Group] Asset Group List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/group/list?type=image')
        .expect(200)

      const test = body.data.find(d => d.id === 1)
      expect(test.name).toEqual('设计素材')
    })

    it('[Assets/Group] Asset Group Root List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/group/root/list?type=image')
        .expect(200)

      const test = body.data.find(d => d.id === 1)
      expect(test.name).toEqual('设计素材')
    })

    it('[Assets/Group] Asset Group Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/group/detail?id=99')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('[Assets/Group] Create Asset Group Throw ExistsException', async () => {
      return await request(app.getHttpServer())
        .post('/assets/group/create')
        .send({
          parentId: 0,
          type: 'image',
          name: 'test 1',
          enableCompress: 'Y',
          enableWatermark: 'Y',
          enableThumbnail: 'Y',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(EXCEPTION_EXISTS)
        })
    })

    it('[Assets/Group] Update Asset Group Throw NotFoundException', async () => {
      return await request(app.getHttpServer())
        .put('/assets/group/update?id=99')
        .send({
          parentId: 0,
          type: 'image',
          name: 'test',
          enableCompress: 'Y',
          enableWatermark: 'Y',
          enableThumbnail: 'Y',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
        })
    })

    it('[Assets/Group] Update Asset Group Throw ExistsException', async () => {
      return await request(app.getHttpServer())
        .put('/assets/group/update?id=7')
        .send({
          parentId: 0,
          type: 'image',
          name: '设计素材',
          enableCompress: 'Y',
          enableWatermark: 'Y',
          enableThumbnail: 'Y',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(EXCEPTION_EXISTS)
        })
    })

    it('[Assets/Group] Delete Asset Group', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/assets/group/delete')
        .send({ id: 7 })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Asset', () => {
    it('[Assets/Asset] Upload Image Asset', async () => {
      await request(app.getHttpServer())
        .post('/assets/upload/image')
        .attach('file', 'tests/upload/fixtures/image/pass/1.jpg')
        .field('groupId', 1)
        .field('type', 'image')
        .field('enableCompress', 'Y')
        .field('enableThumbnail', 'Y')
        .field('enableWatermark', 'Y')
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })

    it('[Assets/Asset] Asset Pages Search Type', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/pages?type=image')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('[Assets/Asset] Asset Pages Search Group', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/pages?type=image&groupId=2')
        .expect(200)

      expect(body.data.total).toEqual(0)
    })

    it('[Assets/Asset] Asset Pages Search Name', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/pages?type=image&name=1')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('[Assets/Asset] Asset Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/assets/detail?id=1')
        .expect(200)

      expect(body.data.group.enableCompress).toEqual('N')
    })

    it('[Assets/Asset] Upload Video Asset', async () => {
      return await request(app.getHttpServer())
        .post('/assets/upload/video')
        .attach('file', 'tests/upload/fixtures/video/pass/1.mp4')
        .field('groupId', 6)
        .field('type', 'video')
        .expect(200)
        .then(({ body }) => {
          expect(body.code).toEqual(0)
        })
    })
  })
})
