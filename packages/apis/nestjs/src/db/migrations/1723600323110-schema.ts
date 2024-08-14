import { MigrationInterface, QueryRunner } from 'typeorm'

export class Schema1723600323110 implements MigrationInterface {
  name = 'Schema1723600323110'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_shop_member\` ON \`shop_member\``)
    await queryRunner.query(`CREATE TABLE \`shop_member_points_log\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`member_id\` int NOT NULL COMMENT '会员 ID' DEFAULT '0', \`type\` varchar(32) NOT NULL COMMENT '变更类型' DEFAULT 'set', \`change\` int NOT NULL COMMENT '积分变化' DEFAULT '0', \`points\` int NOT NULL COMMENT '变化后积分' DEFAULT '0', \`reason\` varchar(255) NOT NULL COMMENT '变化原因' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '申请时间' DEFAULT CURRENT_TIMESTAMP(6), INDEX \`IDX_shop_member_points_log\` (\`member_id\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员积分规则表"`)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` DROP COLUMN \`action\``)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` DROP COLUMN \`staffId\``)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` ADD \`staff_id\` int UNSIGNED NOT NULL COMMENT '员工 ID' DEFAULT '0'`)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` ADD \`module\` varchar(64) NOT NULL COMMENT '日志模块' DEFAULT ''`)
    await queryRunner.query(`DROP INDEX \`IDX_manage_staff_log\` ON \`manage_staff_log\``)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` CHANGE \`type\` \`type\` varchar(32) NOT NULL COMMENT '日志类型' DEFAULT 'manual'`)
    await queryRunner.query(`CREATE INDEX \`IDX_manage_staff_log\` ON \`manage_staff_log\` (\`type\`, \`created_time\`)`)
    await queryRunner.query(`CREATE INDEX \`IDX_shop_member\` ON \`shop_member\` (\`status\`, \`last_login_time\`)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_shop_member\` ON \`shop_member\``)
    await queryRunner.query(`DROP INDEX \`IDX_manage_staff_log\` ON \`manage_staff_log\``)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` CHANGE \`type\` \`type\` varchar(32) NOT NULL COMMENT '日志类型' DEFAULT 'operate'`)
    await queryRunner.query(`CREATE INDEX \`IDX_manage_staff_log\` ON \`manage_staff_log\` (\`type\`, \`created_time\`)`)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` DROP COLUMN \`module\``)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` DROP COLUMN \`staff_id\``)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` ADD \`staffId\` int UNSIGNED NULL`)
    await queryRunner.query(`ALTER TABLE \`manage_staff_log\` ADD \`action\` varchar(64) NOT NULL COMMENT '日志操作' DEFAULT ''`)
    await queryRunner.query(`DROP INDEX \`IDX_shop_member_points_log\` ON \`shop_member_points_log\``)
    await queryRunner.query(`DROP TABLE \`shop_member_points_log\``)
    await queryRunner.query(`CREATE INDEX \`IDX_shop_member\` ON \`shop_member\` (\`status\`, \`created_time\`)`)
  }
}
