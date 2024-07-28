import { MigrationInterface, QueryRunner } from 'typeorm'

export class GoodsSettings1722070809894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`manage_settings\` (\`key\`, \`value\`) VALUES
      ('goods.preference.enableGoodsStock', '1'),
      ('goods.preference.enableGoodsSales', '1'),
      ('goods.preference.enableGoodsOriginalPrice', '1'),
      ('goods.preference.defaultGoodsImage', ''),
      ('goods.crawler.apiKey', '')
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`manage_settings\` WHERE \`key\` IN (
      'goods.preference.enableGoodsStock',
      'goods.preference.enableGoodsSales',
      'goods.preference.enableGoodsOriginalPrice',
      'goods.preference.defaultGoodsImage',
      'goods.crawler.apiKey'
    )`)
  }
}

// @ID: goods
// @CREATE: [{"key":"preference.enableGoodsStock","value":"1"},{"key":"preference.enableGoodsSales","value":"1"},{"key":"preference.enableGoodsOriginalPrice","value":"1"},{"key":"preference.defaultGoodsImage","value":""},{"key":"crawler.apiKey","value":""}]
// @UPDATE: []
// @RESTORE: []
// @REMOVE: []
// -------------------------------------------------
// Generated by XiaoShop API Client
