import { cleanDirs, runSQL, truncateTable, useRequest } from '~~/tests/utils'

const basePath = 'tests/__fixtures__'

describe('Product Module - Export', () => {
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
      'shop_product_export',
    ])

    await runSQL([
      // Addition
      `INSERT INTO \`shop_product_addition\` (\`name\`) VALUES ('addition 1'), ('addition 2')`,
      // Commitment
      `INSERT INTO \`shop_product_commitment\` (\`name\`) VALUES ('commitment 1'), ('commitment 2')`,
      // Category
      `INSERT INTO \`shop_product_category\` (\`name\`) VALUES ('category 1'), ('category 2')`,
      // Group
      `INSERT INTO \`shop_product_group\` (\`name\`) VALUES ('group 1'), ('group 2')`,
      // Tag
      `INSERT INTO \`shop_product_tag\` (\`name\`, \`color\`) VALUES ('tag 1', 'red'), ('tag 2', 'red')`,
      // Brand
      `INSERT INTO \`shop_product_brand\` (\`name\`) VALUES ('brand 1'), ('brand 2')`,
      // Product
      `INSERT INTO \`shop_product\` (\`uuid\`, \`type\`, \`source\`, \`is_multi_skus\`, \`name\`, \`tag_id\`, \`group_id\`, \`brand_id\`) VALUES
      ('uuid-1', 1, 1, 1, 'test product 1', 1, 1, 1),
      ('uuid-2', 1, 1, 1, 'test product 2', 2, 2, 2)`,
      // Product Skus
      `INSERT INTO \`shop_product_sku\` (\`uuid\`, \`product_id\`, \`product_uuid\`, \`name\`, \`sku_code\`, \`price\`, \`attributes\`, \`original_price\`, \`cost_price\`, \`inventory\`, \`inventory_early_warning\`, \`weight\`, \`volume\`, \`unit\`) VALUES
      ('sku-uuid-1', 1, 'uuid-1', 'product-1-sku-1', 'sku-code-1', 100, '[{"name":"color","value":"blue"}]', 200, 10, 100, 10, 1, 1, 'kg'),
      ('sku-uuid-2', 2, 'uuid-2', 'product-2-sku-2', 'sku-code-2', 100, '[{"name":"color","value":"red"}]', 200, 10, 100, 10, 1, 1, 'kg')`,

      // Product Categories
      `INSERT INTO \`shop_product_has_categories\` (\`product_id\`, \`category_id\`) VALUES (1, 1), (2, 2)`,
      // Product Additions
      `INSERT INTO \`shop_product_has_additions\` (\`product_id\`, \`addition_id\`) VALUES (1, 1), (2, 2)`,
      // Product Commitments
      `INSERT INTO \`shop_product_has_commitments\` (\`product_id\`, \`commitment_id\`) VALUES (1, 1), (2, 2)`,
    ])

    await cleanDirs([`${basePath}/upload/**/*.xlsx`])
  })

  it('Export Product', async () => {
    await useRequest('post', '/product/export/create')
      .send({
        type: 1,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.code).toEqual(0)
      })
  })

  it('Fetch Product Export Pages', async () => {
    const { body } = await useRequest('get', '/product/export/pages')
      .expect(200)

    expect(body.data.total).toEqual(1)
  })
})
