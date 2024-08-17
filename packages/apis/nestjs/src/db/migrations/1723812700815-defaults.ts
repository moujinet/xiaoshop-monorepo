import { MigrationInterface, QueryRunner } from 'typeorm'

export class Defaults1723812700815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO manage_staff_account (is_admin, status, username, name, password, salt) VALUES
      ('Y', 'normal', 'admin', 'Admin', '$2b$10$6HjLrj5a0Jefr12T.76SRe/5AISF0uVaCaoL0grW.4mKBI/393zNO', '$2b$10$6HjLrj5a0Jefr12T.76SRe')`)

    await queryRunner.query(`INSERT INTO \`app_assets_group\` (\`parent_id\`, \`name\`, \`enable_compress\`, \`enable_watermark\`, \`enable_thumbnail\`) VALUES
      (0, '系统图片', 'N', 'N', 'N'),
      (1, '默认图片', 'N', 'N', 'N')
    `)

    await queryRunner.query(`INSERT INTO \`app_assets\` (\`name\`, \`path\`, \`size\`, \`groupId\`) VALUES
      ('logo.png', '202407/07/image/b09c0eab-505a-400f-a5a8-43371e151e80', 1508, 2)
    `)

    await queryRunner.query(`INSERT INTO \`shop_points_rule\` (\`key\`, \`enable\`, \`name\`, \`desc\`, \`icon\`, \`options\`) VALUES
      ('register', 'Y', '注册奖励', '注册会员时赠送的积分', 'mingcute:user-add-2', '{"points": 100}'),
      ('order', 'Y', '消费奖励', '会员消费时, 赠送消费金额 100% 的积分', 'mingcute:shopping-bag-3', '{"perOrderRatio": 100}'),
      ('birthday', 'Y', '生日有礼', '会员生日时赠送的积分', 'mingcute:birthday-2', '{"points": 500}'),
      ('signIn', 'Y', '签到奖励', '会员签到时赠送的积分', 'mingcute:checkbox', '{"points": 10, "perWeekRatio": 1.5, "perMonthRatio": 3}'),
      ('deduct', 'Y', '积分抵现', '会员消费时, 积分抵扣一定金额', 'mingcute:cash', '{"limit": 10000, "ratio": 10}')
    `)

    await queryRunner.query(`INSERT INTO \`shop_member_card\` (\`type\`, \`is_enabled\`, \`key\`, \`name\`, \`desc\`, \`badge_styles\`, \`card_styles\`, \`need_exp\`, \`discount\`, \`points_ratio\`, \`is_free_shipping\`) VALUES
      ('level', 'Y', 'vip0', '注册会员', '会员等级', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2"}', '{"icon": "", "textColor": "#424954", "bgColor": "#D8E1E2", "bgImage": ""}', 100, 100, 1, 'N'),
      ('level', 'Y', 'vip1', '普通会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#547183", "bgColor": "#B5D0CD"}', '{"icon": "", "textColor": "#547183", "bgColor": "#B5D0CD", "bgImage": ""}', 200, 100, 1, 'N'),
      ('level', 'Y', 'vip2', '青铜会员', '会员等级', '{"icon": "mingcute:vip-3", "textColor": "#F3F8F4", "bgColor": "#B38264"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#B38264", "bgImage": ""}', 400, 100, 1.1, 'N'),
      ('level', 'Y', 'vip3', '白银会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#7B86A2"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#7B86A2", "bgImage": ""}', 800, 100, 1.1, 'N'),
      ('level', 'Y', 'vip4', '黄金会员', '会员等级', '{"icon": "mingcute:vip-4", "textColor": "#F3F8F4", "bgColor": "#E1B60B"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#E1B60B", "bgImage": ""}', 1600, 100, 1.1, 'N'),
      ('level', 'Y', 'vip5', '铂金会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6177B0"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#6177B0", "bgImage": ""}', 3200, 100, 1.2, 'N'),
      ('level', 'Y', 'vip6', '钻石会员', '会员等级', '{"icon": "mingcute:vip-1", "textColor": "#F3F8F4", "bgColor": "#6D71A0"}', '{"icon": "", "textColor": "#F3F8F4", "bgColor": "#6D71A0", "bgImage": ""}', 6400, 100, 1.2, 'N'),
      ('level', 'Y', 'vip7', '星耀会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#61517B", "bgColor": "#A8A2B9"}', '{"icon": "", "textColor": "#61517B", "bgColor": "#A8A2B9", "bgImage": ""}', 10000, 100, 1.3, 'Y'),
      ('level', 'Y', 'vip8', '王者会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#903F38", "bgColor": "#F0C478"}', '{"icon": "", "textColor": "#903F38", "bgColor": "#F0C478", "bgImage": ""}', 20000, 100, 1.5, 'Y'),
      ('level', 'Y', 'vip9', '至尊会员', '会员等级', '{"icon": "mingcute:vip-2", "textColor": "#F0C478", "bgColor": "#3A3942"}', '{"icon": "", "textColor": "#F0C478", "bgColor": "#3A3942", "bgImage": ""}', 50000, 100, 2, 'Y')
    `)

    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = 'http://localhost:3003/upload' WHERE \`key\` = 'upload.customDomain'`)
    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = '202407/07/image/b09c0eab-505a-400f-a5a8-43371e151e80' WHERE \`key\` = 'store.logo'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = '' WHERE \`key\` = 'upload.customDomain'`)
    await queryRunner.query(`UPDATE \`manage_settings\` SET \`value\` = '' WHERE \`key\` = 'store.logo'`)

    await queryRunner.query(`DELETE FROM \`shop_points_rule\` WHERE \`key\` IN ('register', 'order', 'birthday', 'signIn', 'deduct')`)
    await queryRunner.query(`DELETE FROM \`shop_member_card\` WHERE \`key\` IN ('vip0', 'vip1', 'vip2', 'vip3', 'vip4', 'vip5', 'vip6', 'vip7', 'vip8', 'vip9')`)
  }
}
