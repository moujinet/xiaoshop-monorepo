import { runSQL, truncateTable, useRequest } from '~~/tests/utils'

describe('Product Module - Product', () => {
  beforeAll(async () => {
    await truncateTable([
      'shop_product',
      'shop_product_addition',
      'shop_product_brand',
      'shop_product_category',
      'shop_product_commitment',
      'shop_product_group',
      'shop_product_tag',
      'shop_product_sku',
      'shop_product_has_additions',
      'shop_product_has_categories',
      'shop_product_has_commitments',
    ])

    await runSQL([
      // Addition
      `INSERT INTO \`shop_product_addition\` (name) VALUES ('addition 1'), ('addition 2')`,
      // Commitment
      `INSERT INTO \`shop_product_commitment\` (name) VALUES ('commitment 1'), ('commitment 2')`,
      // Category
      `INSERT INTO \`shop_product_category\` (name) VALUES ('category 1'), ('category 2')`,
      // Group
      `INSERT INTO \`shop_product_group\` (name) VALUES ('group 1'), ('group 2')`,
      // Tag
      `INSERT INTO \`shop_product_tag\` (name) VALUES ('tag 1'), ('tag 2')`,
      // Brand
      `INSERT INTO \`shop_product_brand\` (name) VALUES ('brand 1'), ('brand 2')`,
    ])
  })

  it('Create Product', async () => {
    await useRequest('post', '/product/create')
      .send({
        type: 'entity',
        source: 'manual',
        skus: [
          {
            skuCode: 'test code 1',
            name: 'test sku 1',
            attributes: [{ name: 'color', value: 'blue' }],
            image: 'path/to/image',
            price: 100,
            originalPrice: 200,
            costPrice: 10,
            inventory: 100,
            inventoryEarlyWarning: 10,
            weight: 1,
            volume: 1,
            unit: 'kg',
          },
          {
            skuCode: 'test code 2',
            name: 'test sku 2',
            attributes: [{ name: 'color', value: 'red' }],
            image: 'path/to/image',
            price: 100,
            originalPrice: 200,
            costPrice: 10,
            inventory: 100,
            inventoryEarlyWarning: 10,
            weight: 1,
            volume: 1,
            unit: 'kg',
          },
        ],
        categoryIds: [1],
        tagId: 1,
        groupId: 1,
        brandId: 1,
        name: 'test',
        desc: 'test desc',
        slogan: 'test slogan',
        images: ['path/to/image/1.png', 'path/to/image/2.png'],
        video: 'path/to/video',
        attributes: [
          { name: 'color', value: 'blue' },
          { name: 'size', value: 'large' },
        ],
        commitmentIds: [1],
        additionIds: [1],
        enableVipDiscount: 'Y',
        enablePurchaseLimits: 'Y',
        purchaseMaxQty: 10,
        purchaseMinQty: 1,
        inventoryDeductMode: 'order',
        deliveryMethods: ['express'],
        freightChargeMode: 'template',
        freightTemplateId: 1,
        freight: 0,
        returnsFreightBy: 'buyer',
        publishMode: 'stocked',
        autoInStockAt: '',
        buyBtnNameType: 'custom',
        buyBtnName: 'Buy Now',
        detail: 'test detail',
        sort: 100,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Update Product', async () => {
    await useRequest('put', '/product/update')
      .query({ id: 1 })
      .send({
        type: 'entity',
        source: 'manual',
        skus: [
          {
            id: 1,
            skuCode: 'test code 1 updated',
            name: 'test sku 1',
            attributes: [{ name: 'color', value: 'blue' }],
            image: 'path/to/image',
            price: 100,
            originalPrice: 200,
            costPrice: 10,
            inventory: 100,
            inventoryEarlyWarning: 10,
            weight: 1,
            volume: 1,
            unit: 'kg',
          },
          {
            id: 2,
            skuCode: 'test code 2 updated',
            name: 'test sku 2',
            attributes: [{ name: 'color', value: 'red' }],
            image: 'path/to/image',
            price: 100,
            originalPrice: 200,
            costPrice: 10,
            inventory: 100,
            inventoryEarlyWarning: 10,
            weight: 1,
            volume: 1,
            unit: 'kg',
          },
          {
            skuCode: 'test code 3',
            name: 'test sku 3',
            attributes: [{ name: 'color', value: 'red' }],
            image: 'path/to/image',
            price: 50,
            originalPrice: 200,
            costPrice: 10,
            inventory: 100,
            inventoryEarlyWarning: 10,
            weight: 1,
            volume: 1,
            unit: 'kg',
          },
        ],
        categoryIds: [1, 2],
        tagId: 2,
        groupId: 2,
        brandId: 2,
        name: 'test update',
        desc: 'test desc',
        slogan: 'test slogan',
        images: ['path/to/image/1.png', 'path/to/image/2.png'],
        video: 'path/to/video',
        attributes: [
          { name: 'color', value: 'blue' },
          { name: 'size', value: 'large' },
        ],
        commitmentIds: [1, 2],
        additionIds: [1, 2],
        enableVipDiscount: 'Y',
        enablePurchaseLimits: 'Y',
        purchaseMaxQty: 10,
        purchaseMinQty: 1,
        inventoryDeductMode: 'order',
        deliveryMethods: ['express'],
        freightChargeMode: 'template',
        freightTemplateId: 1,
        freight: 0,
        returnsFreightBy: 'buyer',
        publishMode: 'stocked',
        autoInStockAt: '',
        buyBtnNameType: 'custom',
        buyBtnName: 'Buy Now',
        detail: 'test detail',
        sort: 100,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Detail', async () => {
    const { body } = await useRequest('get', '/product/detail')
      .query({ id: 1 })
      .expect(200)

    expect(body.data.price).toEqual(50)
    expect(body.data.skus.length).toEqual(3)
  })

  it('Copy Product', async () => {
    await useRequest('post', '/product/copy')
      .send({ id: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toEqual(2)
      })
  })

  it('Batch Update Product Properties', async () => {
    await useRequest('put', '/product/batch/update')
      .send({
        ids: [1, 2],
        data: {
          enableVipDiscount: 'Y',
          enablePurchaseLimits: 'Y',
          purchaseMaxQty: 10,
          purchaseMinQty: 1,
          categoryIds: [1],
          additionIds: [1],
          commitmentIds: [1],
        },
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Batch Update Product Status', async () => {
    await useRequest('put', '/product/status/batch/update')
      .send({
        ids: [1, 2],
        status: 'draft',
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Pages', async () => {
    const { body } = await useRequest('get', '/product/pages')
      .expect(200)

    expect(body.data.total).toEqual(2)
    expect(body.data.result[0].categories.length).toEqual(1)
  })

  it('Fetch Product SKU List', async () => {
    const { body } = await useRequest('get', '/product/sku/list')
      .query({ productId: 1 })
      .expect(200)

    expect(body.data.length).toEqual(3)
  })

  it('Soft Delete Product', async () => {
    await useRequest('delete', '/product/delete/soft')
      .send({
        ids: [1, 2],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Pages After Soft Delete', async () => {
    const { body } = await useRequest('get', '/product/pages')
      .query({ isDeleted: 'Y' })
      .expect(200)

    expect(body.data.total).toEqual(2)
  })

  it('Restore Delete Product', async () => {
    await useRequest('put', '/product/restore')
      .send({
        ids: [1],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Pages After Restore Delete', async () => {
    const { body } = await useRequest('get', '/product/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })

  it('Delete Product', async () => {
    await useRequest('delete', '/product/delete')
      .send({
        ids: [2],
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Pages After Real Delete', async () => {
    const { body } = await useRequest('get', '/product/pages')
      .query({ isDeleted: 'Y' })
      .expect(200)

    expect(body.data.total).toEqual(0)
  })
})
