import type { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { IGoodsSpec } from '@xiaoshop/schema'
import { EXCEPTION_BAD_REQUEST, EXCEPTION_EXISTS, EXCEPTION_NOT_FOUND } from '~/common/exception'
import { createNestApplication, createTestingModule, truncateTable } from '~~/tests/application'
import { GoodsModule } from '@/goods/goods.module'
import { GoodsService } from '@/goods/manage/service'

const tables = [
  'shop_goods',
  'shop_goods_category',
  'shop_goods_group',
  'shop_goods_tag',
  'shop_goods_brand',
  'shop_goods_spec',
  'shop_goods_sku',
  'shop_goods_attribute_template',
  'shop_goods_addition',
  'shop_goods_protection',
  'shop_goods_export',

  // Middle Tables
  'shop_goods_has_additions',
  'shop_goods_has_categories',
  'shop_goods_has_protections',
]

describe('Goods Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await createNestApplication([
      GoodsModule,
    ])
    await app.init()

    await truncateTable(tables)
  })

  // Attribute Template
  describe('Attribute Template', () => {
    it('Create Goods Attribute Template', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/attribute-template/create')
        .send({
          name: '家具参数模板',
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Attribute Template', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/attribute-template/update?id=1')
        .send({
          name: '家具参数模板 (修改)',
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Attribute Template Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/attribute-template/update?id=2')
        .send({
          name: '家具参数模板',
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Attribute Template Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/attribute-template/create')
        .send({
          name: '家具参数模板 (存在)',
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/attribute-template/update?id=1')
        .send({
          name: '家具参数模板 (存在)',
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Attribute Template Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/attribute-template/create')
        .send({
          name: 123,
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Attribute Template Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/attribute-template/create')
        .send({
          name: '家具参数模板 (存在)',
          desc: '家具参数模板介绍',
          options: [
            {
              name: '树种',
              type: 'checkbox',
              options: [
                '黑胡桃',
                '橡木',
                '榆木',
              ],
              defaultValue: [
                '黑胡桃',
              ],
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Attribute Template Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/attribute-template/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('家具参数模板 (修改)')
    })

    it('Goods Attribute Template Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/attribute-template/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Attribute Template List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/attribute-template/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Attribute Template Dict List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/attribute-template/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[1]).length).toEqual(2)
    })

    it('Delete Goods Attribute Template', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/attribute-template/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Group
  describe('Group', () => {
    it('Create Goods Group', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/group/create')
        .send({
          name: 'test 1',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Group', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/group/update?id=1')
        .send({
          name: 'test change',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Group Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/group/update?id=2')
        .send({
          name: 'test change 2',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Group Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/group/create')
        .send({
          name: 'test 2',
          sort: 1,
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/group/update?id=1')
        .send({
          name: 'test 2',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Group Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/group/create')
        .send({
          name: 111,
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Group Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/group/create')
        .send({
          name: 'test change',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Group Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/group/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('test change')
    })

    it('Goods Group Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/group/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Group List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/group/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Group Dict List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/group/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(2)
    })

    it('Delete Goods Group', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/group/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Tag
  describe('Tag', () => {
    it('Create Goods Tag', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/tag/create')
        .send({
          name: 'test 1',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Tag', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/tag/update?id=1')
        .send({
          name: 'test change',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Tag Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/tag/update?id=2')
        .send({
          name: 'test change 2',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Tag Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/tag/create')
        .send({
          name: 'test 2',
          sort: 1,
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/tag/update?id=1')
        .send({
          name: 'test 2',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Tag Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/tag/create')
        .send({
          name: 111,
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Tag Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/tag/create')
        .send({
          name: 'test change',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Tag Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/tag/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('test change')
    })

    it('Goods Tag Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/tag/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Tag List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/tag/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Tag Dict List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/tag/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(2)
    })

    it('Delete Goods Tag', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/tag/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Brand
  describe('Brand', () => {
    it('Create Goods Brand', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '品牌名称',
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Brand', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/brand/update?id=1')
        .send({
          name: '品牌名称 (修改)',
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Brand Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/brand/update?id=2')
        .send({
          name: '品牌名称 (修改)',
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Brand Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '品牌名称',
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/brand/update?id=1')
        .send({
          name: '品牌名称',
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Brand Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: 123,
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Brand Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '品牌名称',
          desc: '品牌名称介绍',
          logo: 'https://www.example.com/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Brand Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/brand/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('品牌名称 (修改)')
    })

    it('Goods Brand Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/brand/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Brand List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/brand/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Brand Dict List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/brand/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(2)
    })

    it('Delete Goods Brand', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/brand/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Brand Without Logo', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '品牌名称 (无图)',
          desc: '品牌名称介绍',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Brand With Logo Is Empty String', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '品牌名称 (无图) 1',
          desc: '品牌名称介绍',
          logo: '',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Category
  describe('Category', () => {
    it('Create Goods Category', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '分类名称',
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Category', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/category/update?id=1')
        .send({
          parentId: 0,
          name: '分类名称 (修改)',
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Category Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/category/update?id=2')
        .send({
          parentId: 0,
          name: '分类名称',
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Category Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '分类名称',
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/category/update?id=1')
        .send({
          parentId: 0,
          name: '分类名称',
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Category Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: 123,
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Category Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '分类名称',
          image: 'http://xiao.shop/image.png',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Category Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/category/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('分类名称 (修改)')
    })

    it('Goods Category Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/category/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Category List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/category/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Category Root List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/category/root/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(2)
    })

    it('Goods Category Nested List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/category/nested/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(3)
    })

    it('Delete Goods Category', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/category/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Category Without Image', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '分类名称 (无图)',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Category With Image Is Empty', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '分类名称 (无图) 1',
          image: '',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Service - Addition
  describe('Goods Service Addition', () => {
    it('Create Goods Addition Service', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Addition Service', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/addition/update?id=1')
        .send({
          name: '服务 (修改)',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Addition Service Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/addition/update?id=2')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Addition Service Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/addition/update?id=1')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Addition Service Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: 123,
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Addition Service Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Addition Service Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/addition/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('服务 (修改)')
    })

    it('Goods Addition Service Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/addition/detail?id=3')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Addition Service List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/addition/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Addition Service Dict List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/addition/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(4)
    })

    it('Delete Goods Addition Service', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/addition/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Addition Service Without Icon', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '服务 (无图)',
          desc: '介绍',
          sort: 1,
          price: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Addition Service With Icon Is Empty', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '服务 (无图) 1',
          desc: '介绍',
          sort: 1,
          price: 1,
          icon: '',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Service - Protection
  describe('Goods Service Protection', () => {
    it('Create Goods Protection Service', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Protection Service', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/protection/update?id=1')
        .send({
          name: '服务 (修改)',
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Protection Service Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/protection/update?id=2')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Update Goods Protection Service Throw ExistsException', async () => {
      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      const { body } = await request(app.getHttpServer())
        .put('/goods/protection/update?id=1')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Create Goods Protection Service Throw BadRequestException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: 123,
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_BAD_REQUEST)
    })

    it('Create Goods Protection Service Throw ExistsException', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '服务',
          desc: '介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_EXISTS)
    })

    it('Goods Protection Service Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/protection/detail?id=1')
        .expect(200)

      expect(body.data.name).toEqual('服务 (修改)')
    })

    it('Goods Protection Service Detail Throw NotFoundException', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/protection/detail?id=5')
        .expect(200)

      expect(body.code).toEqual(EXCEPTION_NOT_FOUND)
    })

    it('Goods Protection Service List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/protection/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
    })

    it('Goods Protection Service Dict List', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/protection/dict/list')
        .expect(200)

      expect(body.data.length).toEqual(2)
      expect(Object.keys(body.data[0]).length).toEqual(3)
    })

    it('Delete Goods Protection Service', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/protection/delete')
        .send({
          id: 3,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Protection Service Without Icon', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '服务 (无图)',
          desc: '介绍',
          sort: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Create Goods Protection Service With Icon Is Empty', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '服务 (无图) 1',
          desc: '介绍',
          sort: 1,
          icon: '',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Init
  describe('Init Test Data', () => {
    it('Cleanup Database', async () => {
      await truncateTable(tables)
    })

    it('Init Goods Tag', async () => {
      await request(app.getHttpServer())
        .post('/goods/tag/create')
        .send({
          name: '测试标签',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/tag/create')
        .send({
          name: '测试标签 2',
          sort: 1,
        })
        .expect(200)
    })

    it('Init Goods Brand', async () => {
      await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '测试品牌',
          desc: '测试品牌介绍',
          logo: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/brand/create')
        .send({
          name: '测试品牌 2',
          desc: '测试品牌介绍',
          logo: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)
    })

    it('Init Goods Group', async () => {
      await request(app.getHttpServer())
        .post('/goods/group/create')
        .send({
          name: '测试分组',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/group/create')
        .send({
          name: '测试分组 2',
          sort: 1,
        })
        .expect(200)
    })

    it('Init Goods Category', async () => {
      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '测试分类 1',
          image: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '测试分类 2',
          image: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '测试分类 3',
          image: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '测试分类 4',
          image: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '测试分类 5',
          image: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/category/create')
        .send({
          parentId: 0,
          name: '测试分类 6',
          image: 'http://xiao.shop/icon.png',
          sort: 1,
        })
        .expect(200)
    })

    it('Init Goods Protection Service', async () => {
      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '测试保障服务 1',
          desc: '测试保障服务介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '测试保障服务 2',
          desc: '测试保障服务介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '测试保障服务 3',
          desc: '测试保障服务介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '测试保障服务 4',
          desc: '测试保障服务介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '测试保障服务 5',
          desc: '测试保障服务介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/protection/create')
        .send({
          name: '测试保障服务 6',
          desc: '测试保障服务介绍',
          sort: 1,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)
    })

    it('Init Goods Addition Service', async () => {
      await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '测试附加服务 1',
          desc: '测试附加服务介绍',
          sort: 1,
          price: 10,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '测试附加服务 2',
          desc: '测试附加服务介绍',
          sort: 1,
          price: 10,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '测试附加服务 3',
          desc: '测试附加服务介绍',
          sort: 1,
          price: 10,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)

      await request(app.getHttpServer())
        .post('/goods/addition/create')
        .send({
          name: '测试附加服务 4',
          desc: '测试附加服务介绍',
          sort: 1,
          price: 10,
          icon: 'http://xiao.shop/icon.png',
        })
        .expect(200)
    })
  })

  let _goodsId: string
  let _goodsSpecs: IGoodsSpec[]

  // Create Goods
  describe('Create Goods', () => {
    it('Create Goods Basic Info', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/basic/create')
        .send({
          type: 'entity',
          status: 'in_stock',
          source: 'manual',
          video: 'https://www.example.com/video.mp4',
          images: ['https://www.example.com/image.png'],
          categoryIds: [1, 2, 3],
          name: '商品名称',
          shareDesc: '分享描述',
          slogan: '商品卖点',
          tagId: 1,
          groupId: 1,
          brandId: 1,
          protectionIds: [1, 2, 3],
          additionIds: [1, 2, 3],
          attributes: [
            {
              type: 'radio',
              name: '产地',
              options: [
                '中国',
                '日本',
              ],
              values: [
                '中国',
              ],
            },
          ],
          deliveryModes: [
            'express',
          ],
          freight: 0,
          freightTemplateId: 0,
          freightChargeMode: 'template',
          returnsFreightBy: 'buyer',
          publishMode: 'direct',
          autoInStockAt: null,
          buyBtnNameType: 'default',
          buyBtnName: '',
        })
        .expect(200)

      expect(body.data.id).toBeDefined()

      _goodsId = body.data.id
    })

    it('Update Goods Inventory Info', async () => {
      const { body } = await request(app.getHttpServer())
        .put(`/goods/inventory/update?id=${_goodsId}`)
        .send({
          isMultiSkus: 'N',
          skuCode: '123123',
          price: 99,
          originalPrice: 168,
          costPrice: 46,
          inventory: 1000,
          inventoryEarlyWarning: 50,
          weight: 0.25,
          volume: 0.037,
          unit: '件',
          enablePurchaseLimits: 'N',
          purchaseMinQty: 1,
          purchaseMaxQty: 0,
          inventoryDeductMode: 'order',
          enableVipDiscount: 'N',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Specs', async () => {
      const { body } = await request(app.getHttpServer())
        .put(`/goods/spec/update?id=${_goodsId}`)
        .send([
          {
            name: '颜色',
            values: [
              {
                name: '红色',
                image: 'http://xiao.shop/image.png',
              },
              {
                name: '蓝色',
                image: 'http://xiao.shop/image.png',
              },
            ],
            enableImage: 'Y',
          },
        ])
        .expect(200)

      expect(body.data.length).toEqual(1)

      _goodsSpecs = body.data as IGoodsSpec[]
    })

    it('Update Goods Skus', async () => {
      const { body } = await request(app.getHttpServer())
        .put(`/goods/skus/update?id=${_goodsId}`)
        .send({
          skuCode: '',
          skus: [
            {
              name: '商品名称',
              image: '/assets/1.png',
              specs: [
                {
                  specId: _goodsSpecs[0].id,
                  name: '颜色',
                  value: '红色',
                },
              ],
              price: 199,
              originalPrice: 299,
              costPrice: 99,
              inventory: 1000,
              inventoryEarlyWarning: 10,
              weight: 0.2,
              volume: 0.01,
            },
            {
              name: '商品名称1',
              image: '/assets/1.png',
              specs: [
                {
                  specId: _goodsSpecs[0].id,
                  name: '颜色',
                  value: '蓝色',
                },
              ],
              price: 199,
              originalPrice: 299,
              costPrice: 99,
              inventory: 1000,
              inventoryEarlyWarning: 10,
              weight: 0.2,
              volume: 0.01,
            },
          ],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Update Goods Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .put(`/goods/detail/update?id=${_goodsId}`)
        .send({
          detail: '测试商品详情 111',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Fetch Goods Specs', () => {
    it('Fetch Goods Specs List', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/goods/spec/list?id=${_goodsId}`)
        .expect(200)

      expect(body.data.length).toEqual(1)
    })

    it('Fetch Goods Sku List', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/goods/skus/list?id=${_goodsId}`)
        .expect(200)

      expect(body.data.length).toEqual(2)
    })
  })

  describe('Fetch Goods', () => {
    it('Fetch Goods Detail', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/goods/detail?id=${_goodsId}`)
        .expect(200)

      expect(body.data.name).toEqual('商品名称')
      expect(body.data.tag.id).toEqual(1)
      expect(body.data.inventoryDeductMode).toEqual('order')
    })

    it('Fetch Goods Basic Info', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/goods/detail/basic?id=${_goodsId}`)
        .expect(200)

      expect(body.data.name).toEqual('商品名称')
    })

    it('Fetch Goods Inventory Info', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/goods/detail/inventory?id=${_goodsId}`)
        .expect(200)

      expect(body.data.inventory).toEqual(1000)
    })

    it('Fetch Goods Detail Info', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/goods/detail/content?id=${_goodsId}`)
        .expect(200)

      expect(body.data.id).toEqual(_goodsId)
    })
  })

  // Update Goods
  describe('Update Goods', () => {
    it('Batch Update Goods', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/batch/update')
        .send({
          ids: [
            _goodsId,
          ],
          data: {
            tagId: 1,
          },
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Batch Update Goods Status', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/batch/update')
        .send({
          ids: [
            _goodsId,
          ],
          data: {
            status: 'stocked',
          },
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Delete Goods
  describe('Delete Goods', () => {
    it('Soft Delete Goods', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/delete/soft')
        .send({
          id: _goodsId,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Restore Delete Goods', async () => {
      const { body } = await request(app.getHttpServer())
        .put('/goods/delete/restore')
        .send({
          id: _goodsId,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Copy Goods
  describe('Copy Goods', () => {
    it('Copy Goods To Draft', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/copy')
        .send({
          id: _goodsId,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Export Goods
  describe('Export Goods', () => {
    it('Create Goods Export Record', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/goods/export/create')
        .send({
          status: 'in_stock',
          source: 'connect',
          categoryIds: [],
          groupId: 0,
          brandId: 0,
          tagId: 0,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Fetch Goods Export Pages', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/goods/export/pages')
        .expect(200)

      expect(body.data.total).toEqual(1)
    })

    it('Delete Goods Export Record', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/goods/export/delete')
        .send({
          id: 1,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  // Goods Service
  describe('Goods Service', () => {
    it('Update Sold Out Goods', async () => {
      const module = await createTestingModule([
        GoodsModule,
      ]).compile()

      const result = await module.get<GoodsService>(GoodsService).updateSoldOutGoods()

      expect(result).toEqual([])
    })

    it('Update Inventory Early Warning', async () => {
      const module = await createTestingModule([
        GoodsModule,
      ]).compile()

      const result = await module.get<GoodsService>(GoodsService).updateInventoryEarlyWarning()

      expect(result).toEqual([])
    })

    it('Fetch Export List', async () => {
      const module = await createTestingModule([
        GoodsModule,
      ]).compile()

      const result = await module.get<GoodsService>(GoodsService).findExportList({
        status: 'in_stock',
        source: 'connect',
        categoryIds: [],
        groupId: 0,
        brandId: 0,
        tagId: 0,
      })

      expect(result.length).toEqual(0)
    })
  })
})
