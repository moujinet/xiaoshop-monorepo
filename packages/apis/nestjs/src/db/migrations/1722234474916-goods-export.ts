import { MigrationInterface, QueryRunner } from 'typeorm'

export class GoodsExport1722234474916 implements MigrationInterface {
  name = 'GoodsExport1722234474916'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`shop_goods_export\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` varchar(32) NOT NULL COMMENT '导出状态' DEFAULT 'pending', \`conditions\` text NULL COMMENT '导出条件', \`count\` int UNSIGNED NOT NULL COMMENT '导出数量' DEFAULT '1', \`result\` varchar(255) NOT NULL COMMENT '导出结果' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_export\` (\`status\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品导出记录表"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_export\` ON \`shop_goods_export\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_export\``)
  }
}
