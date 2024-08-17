import type { IGoodsSpec } from '@xiaoshop/schema'
import { getRequest, runSQL, truncateTable } from '~~/tests/utils'

describe('Goods Module - Goods', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_goods',
      'shop_goods_sku',
      'shop_goods_spec',
      'shop_goods_category',
      'shop_goods_group',
      'shop_goods_tag',
      'shop_goods_brand',
      'shop_goods_attribute_template',
      'shop_goods_addition',
      'shop_goods_protection',

      // Middle Tables
      'shop_goods_has_additions',
      'shop_goods_has_categories',
      'shop_goods_has_protections',
    ])

    // Init Database
    await runSQL([
      // Goods Tags
      `INSERT INTO \`shop_goods_tag\` (\`name\`) VALUES ('标签1'), ('标签2'), ('标签3')`,
      // Goods Groups
      `INSERT INTO \`shop_goods_group\` (\`name\`) VALUES ('分组1'), ('分组2'), ('分组3')`,
      // Goods Brands
      `INSERT INTO \`shop_goods_brand\` (\`name\`) VALUES ('品牌1'), ('品牌2'), ('品牌3')`,
      // Goods Categories
      `INSERT INTO \`shop_goods_category\` (\`name\`) VALUES ('分类1'), ('分类2'), ('分类3')`,
      // Goods Additions
      `INSERT INTO \`shop_goods_addition\` (\`name\`) VALUES ('附加1'), ('附加2'), ('附加3')`,
      // Goods Protections
      `INSERT INTO \`shop_goods_protection\` (\`name\`) VALUES ('保障1'), ('保障2'), ('保障3')`,
    ])
  })

  let _goodsId: string
  let _goodsSpecs: IGoodsSpec[]

  describe('Create Goods', () => {
    it('Create Goods Basic Info', async () => {
      const { body } = await getRequest('post', '/goods/basic/create')
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
              options: ['中国', '日本'],
              values: ['中国'],
            },
          ],
          deliveryModes: ['express'],
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
      const { body } = await getRequest('put', `/goods/inventory/update`)
        .query({ id: _goodsId })
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
      const { body } = await getRequest('put', `/goods/spec/update`)
        .query({ id: _goodsId })
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
      const { body } = await getRequest('put', `/goods/skus/update`)
        .query({ id: _goodsId })
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
      const { body } = await getRequest('put', `/goods/detail/update`)
        .query({ id: _goodsId })
        .send({
          detail: '测试商品详情 111',
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Update Goods', () => {
    it('Update Goods Base Info', async () => {
      const { body } = await getRequest('put', `/goods/basic/update`)
        .query({ id: _goodsId })
        .send({
          name: '商品名称',
          tagId: 1,
          groupId: 1,
          brandId: 1,
          protectionIds: [1, 2, 3],
          additionIds: [1, 2, 3],
          categoryIds: [1, 2, 3],
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Batch Update Goods Status', async () => {
      const { body } = await getRequest('put', `/goods/batch/update`)
        .send({
          ids: [_goodsId],
          data: {
            status: 'stocked',
          },
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Batch Update Goods', async () => {
      const { body } = await getRequest('put', `/goods/batch/update`)
        .send({
          ids: [_goodsId],
          data: {
            tagId: 2,
            groupId: 2,
            brandId: 2,
            categoryIds: [1, 2, 3],
            protectionIds: [1, 2, 3],
            additionIds: [1, 2, 3],
          },
        })
        .expect(200)

      expect(body).toMatchInlineSnapshot(`
        {
          "code": 0,
          "message": "ok",
        }
      `)

      expect(body.code).toEqual(0)
    })
  })

  describe('Copy Goods', () => {
    it('Copy Goods To Draft', async () => {
      const { body } = await getRequest('post', `/goods/copy`)
        .send({
          id: _goodsId,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })

  describe('Fetch Goods Detail', () => {
    it('Fetch Goods Detail', async () => {
      const { body } = await getRequest('get', `/goods/detail`)
        .query({ id: _goodsId })
        .expect(200)

      expect(body.data.name).toEqual('商品名称')
      expect(body.data.tag.id).toEqual(1)
      expect(body.data.inventoryDeductMode).toEqual('order')
    })

    it('Fetch Goods Basic Info', async () => {
      const { body } = await getRequest('get', `/goods/detail/basic`)
        .query({ id: _goodsId })
        .expect(200)

      expect(body.data.name).toEqual('商品名称')
    })

    it('Fetch Goods Inventory Info', async () => {
      const { body } = await getRequest('get', `/goods/detail/inventory`)
        .query({ id: _goodsId })
        .expect(200)

      expect(body.data.inventory).toEqual(1000)
    })

    it('Fetch Goods Detail Info', async () => {
      const { body } = await getRequest('get', `/goods/detail/content`)
        .query({ id: _goodsId })
        .expect(200)

      expect(body.data.id).toEqual(_goodsId)
    })
  })

  describe('Delete Goods', () => {
    it('Soft Delete Goods', async () => {
      const { body } = await getRequest('delete', `/goods/delete/soft`)
        .send({
          id: _goodsId,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })

    it('Restore Delete Goods', async () => {
      const { body } = await getRequest('put', `/goods/delete/restore`)
        .send({
          id: _goodsId,
        })
        .expect(200)

      expect(body.code).toEqual(0)
    })
  })
})
