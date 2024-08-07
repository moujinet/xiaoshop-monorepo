import { MigrationInterface, QueryRunner } from 'typeorm'

export class Default1722070828020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`app_assets_group\` (\`parent_id\`, \`name\`, \`enable_compress\`, \`enable_watermark\`, \`enable_thumbnail\`) VALUES
      (0, '系统图片', 'N', 'N', 'N'),
      (1, '默认图片', 'N', 'N', 'N')
    `)

    await queryRunner.query(`INSERT INTO \`app_assets\` (\`name\`, \`path\`, \`size\`, \`groupId\`) VALUES
      ('logo.png', '202407/07/image/b09c0eab-505a-400f-a5a8-43371e151e80', 1508, 2)
    `)

    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = 'http://localhost:3003/upload' WHERE \`key\` = 'upload.customDomain'`)
    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = '202407/07/image/b09c0eab-505a-400f-a5a8-43371e151e80' WHERE \`key\` = 'store.logo'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`app_assets_group\` WHERE \`name\` IN ('系统图片', '默认图片')`)
    await queryRunner.query(`DELETE FROM \`app_assets\` WHERE \`path\` = '202407/07/image/b09c0eab-505a-400f-a5a8-43371e151e80'`)
    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = '' WHERE \`key\` = 'upload.customDomain'`)
    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = '' WHERE \`key\` = 'store.logo'`)
  }
}
