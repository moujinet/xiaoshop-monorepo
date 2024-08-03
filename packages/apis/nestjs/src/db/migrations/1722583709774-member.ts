import { MigrationInterface, QueryRunner } from 'typeorm'

export class Member1722583709774 implements MigrationInterface {
  name = 'Member1722583709774'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`shop_member_tag\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '标签名称' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_member_tag\` (\`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员标签表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_points_rule\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`key\` varchar(32) NOT NULL COMMENT '积分规则标识' DEFAULT '', \`enable\` char NOT NULL COMMENT '积分规则启用状态' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '积分规则名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '积分规则描述' DEFAULT '', \`icon\` varchar(32) NOT NULL COMMENT '积分规则图标' DEFAULT '', \`options\` text NULL COMMENT '积分规则选项', INDEX \`idx_shop_member_points_rule\` (\`enable\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员积分规则表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_logout\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` varchar(32) NOT NULL COMMENT '注销状态' DEFAULT 'pending', \`source\` varchar(32) NOT NULL COMMENT '注销来源' DEFAULT 'manual', \`member_id\` int NOT NULL COMMENT '会员 ID' DEFAULT '0', \`username\` varchar(32) NOT NULL COMMENT '会员账号' DEFAULT '', \`nickname\` varchar(32) NOT NULL COMMENT '会员昵称' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '会员手机号' DEFAULT '', \`reason\` varchar(255) NOT NULL COMMENT '注销原因' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '申请时间' DEFAULT CURRENT_TIMESTAMP(6), \`logout_time\` datetime NULL COMMENT '刷新时间', INDEX \`idx_shop_member_logout\` (\`status\`, \`source\`, \`username\`, \`nickname\`, \`mobile\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员注销申请表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_group\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '群体名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '群体描述' DEFAULT '', \`conditions\` text NULL COMMENT '群体条件', \`total\` int NOT NULL COMMENT '群体人数' DEFAULT '0', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refresh_time\` datetime NULL COMMENT '刷新时间', INDEX \`idx_shop_member_group\` (\`total\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员群体表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_account\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`key\` varchar(32) NOT NULL COMMENT '账户标识' DEFAULT '', \`status\` varchar(32) NOT NULL COMMENT '账户状态' DEFAULT 'enable', \`name\` varchar(32) NOT NULL COMMENT '账户名' DEFAULT '', \`value\` float NOT NULL COMMENT '账户值' DEFAULT '0', \`memberId\` int UNSIGNED NULL, INDEX \`idx_shop_member_account\` (\`status\`, \`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员账户表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_card_binding\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`times\` int UNSIGNED NOT NULL COMMENT '会员卡使用次数' DEFAULT '0', \`due_time\` datetime NULL COMMENT '到期时间', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`cardId\` int UNSIGNED NULL, \`planId\` int UNSIGNED NULL, UNIQUE INDEX \`REL_c15eadbddc1808f73b04698d73\` (\`cardId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员卡绑定表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_card\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '会员卡类型' DEFAULT 'custom', \`is_enabled\` char(1) NOT NULL COMMENT '会员卡启用状态' DEFAULT 'N', \`key\` varchar(32) NOT NULL COMMENT '会员卡标识' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '会员卡名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '会员卡描述' DEFAULT '', \`styles\` text NULL COMMENT '会员卡样式', \`need_exp\` int UNSIGNED NOT NULL COMMENT '所需成长值' DEFAULT '0', \`discount\` float UNSIGNED NOT NULL COMMENT '会员折扣' DEFAULT '0', \`points_ratio\` float UNSIGNED NOT NULL COMMENT '获得积分倍率' DEFAULT '0', \`is_free_shipping\` char(1) NOT NULL COMMENT '是否包邮 (N:否 Y:是)' DEFAULT 'N', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_member_card_custom\` (\`type\`, \`updated_time\`), INDEX \`idx_shop_member_card_level\` (\`type\`, \`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员卡信息表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_card_plan\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '会员卡类型' DEFAULT 'times', \`duration\` int UNSIGNED NOT NULL COMMENT '会员卡套餐有效期' DEFAULT '0', \`price\` float UNSIGNED NOT NULL COMMENT '会员卡套餐价格' DEFAULT '0', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`cardId\` int UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员卡自定义套餐表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` varchar(32) NOT NULL COMMENT '会员状态' DEFAULT 'normal', \`source\` varchar(32) NOT NULL COMMENT '注册来源' DEFAULT 'manual', \`card_no\` varchar(16) NOT NULL COMMENT '会员卡号' DEFAULT '', \`avatar\` varchar(255) NOT NULL COMMENT '会员头像' DEFAULT '', \`username\` varchar(32) NOT NULL COMMENT '会员账号' DEFAULT '', \`nickname\` varchar(32) NOT NULL COMMENT '会员昵称' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '会员手机' DEFAULT '', \`password\` varchar(255) NOT NULL COMMENT '会员密码' DEFAULT '', \`salt\` varchar(32) NOT NULL COMMENT '会员密码盐值' DEFAULT '', \`birthday\` date NULL COMMENT '会员生日', \`gender\` varchar(32) NOT NULL COMMENT '会员性别' DEFAULT 'unknown', \`location\` text NULL COMMENT '注册城市', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_login_time\` datetime NULL COMMENT '最后登录时间', \`bindingId\` int UNSIGNED NULL, \`groupId\` int UNSIGNED NULL, \`tagId\` int UNSIGNED NULL, INDEX \`idx_shop_member\` (\`status\`, \`last_login_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员信息表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_address\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`contract_name\` varchar(32) NOT NULL COMMENT '联系人' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '手机号' DEFAULT '', \`location\` text NULL COMMENT '城市', \`address\` varchar(255) NOT NULL COMMENT '详细地址' DEFAULT '', \`post_code\` varchar(8) NOT NULL COMMENT '邮政编码' DEFAULT '', \`is_default\` char(1) NOT NULL COMMENT '是否默认 (N:否 Y:是)' DEFAULT 'N', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`memberId\` int UNSIGNED NULL, INDEX \`idx_shop_member_address\` (\`is_default\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员地址表"`)
    await queryRunner.query(`ALTER TABLE \`shop_member_card_binding\` ADD CONSTRAINT \`FK_c15eadbddc1808f73b04698d733\` FOREIGN KEY (\`cardId\`) REFERENCES \`shop_member_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`shop_member_card_binding\` ADD CONSTRAINT \`FK_8821652088342503fabffd3785d\` FOREIGN KEY (\`planId\`) REFERENCES \`shop_member_card_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)

    await queryRunner.query(`INSERT INTO \`shop_member_points_rule\` (\`key\`, \`enable\`, \`name\`, \`desc\`, \`icon\`, \`options\`) VALUES
      ('register', 'Y', '注册奖励', '注册会员时赠送的积分', 'mingcute:user-add-2', '{"points": 100}'),
      ('ordering', 'Y', '消费奖励', '会员消费时, 赠送消费金额 100% 的积分', 'mingcute:shopping-bag-3', '{"perOrderRatio": 100}'),
      ('birthday', 'Y', '生日有礼', '会员生日时赠送的积分', 'mingcute:birthday-2', '{"points": 500}'),
      ('sign_in', 'Y', '签到奖励', '会员签到时赠送的积分', 'mingcute:checkbox', '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}'),
      ('deduction', 'Y', '积分抵现', '会员消费时, 积分抵扣一定金额', 'mingcute:cash', '{"limit": 10000, "ratio": 10}')
    `)

    await queryRunner.query(`INSERT INTO \`shop_member_card\` (\`type\`, \`is_enabled\`, \`key\`, \`name\`, \`desc\`, \`styles\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`is_free_shipping\`) VALUES
      ('level', 'Y', 'vip0', '注册会员', '会员等级', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 'N'),
      ('level', 'Y', 'vip1', '普通会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#547183", "bgColor": "#B5D0CD", "bgImage": ""}', 200, 100, 1, 'N'),
      ('level', 'Y', 'vip2', '青铜会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#F3F8F4", "bgColor": "#B38264", "bgImage": ""}', 400, 100, 1.1, 'N'),
      ('level', 'Y', 'vip3', '白银会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#7B86A2", "bgImage": ""}', 800, 100, 1.1, 'N'),
      ('level', 'Y', 'vip4', '黄金会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#E1B60B", "bgImage": ""}', 1600, 100, 1.1, 'N'),
      ('level', 'Y', 'vip5', '铂金会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6177B0", "bgImage": ""}', 3200, 100, 1.2, 'N'),
      ('level', 'Y', 'vip6', '钻石会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6D71A0", "bgImage": ""}', 6400, 100, 1.2, 'N'),
      ('level', 'Y', 'vip7', '星耀会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#61517B", "bgColor": "#A8A2B9", "bgImage": ""}', 10000, 100, 1.3, 'Y'),
      ('level', 'Y', 'vip8', '王者会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#903F38", "bgColor": "#F0C478", "bgImage": ""}', 20000, 100, 1.3, 'Y'),
      ('level', 'Y', 'vip9', '至尊会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#F0C478", "bgColor": "#3A3942", "bgImage": ""}', 50000, 100, 1.5, 'Y')
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`shop_member_card_binding\` DROP FOREIGN KEY \`FK_8821652088342503fabffd3785d\``)
    await queryRunner.query(`ALTER TABLE \`shop_member_card_binding\` DROP FOREIGN KEY \`FK_c15eadbddc1808f73b04698d733\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_address\` ON \`shop_member_address\``)
    await queryRunner.query(`DROP TABLE \`shop_member_address\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member\` ON \`shop_member\``)
    await queryRunner.query(`DROP TABLE \`shop_member\``)
    await queryRunner.query(`DROP TABLE \`shop_member_card_plan\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_card_level\` ON \`shop_member_card\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_card_custom\` ON \`shop_member_card\``)
    await queryRunner.query(`DROP TABLE \`shop_member_card\``)
    await queryRunner.query(`DROP INDEX \`REL_c15eadbddc1808f73b04698d73\` ON \`shop_member_card_binding\``)
    await queryRunner.query(`DROP TABLE \`shop_member_card_binding\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_account\` ON \`shop_member_account\``)
    await queryRunner.query(`DROP TABLE \`shop_member_account\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_group\` ON \`shop_member_group\``)
    await queryRunner.query(`DROP TABLE \`shop_member_group\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_logout\` ON \`shop_member_logout\``)
    await queryRunner.query(`DROP TABLE \`shop_member_logout\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_points_rule\` ON \`shop_member_points_rule\``)
    await queryRunner.query(`DROP TABLE \`shop_member_points_rule\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_tag\` ON \`shop_member_tag\``)
    await queryRunner.query(`DROP TABLE \`shop_member_tag\``)
  }
}
