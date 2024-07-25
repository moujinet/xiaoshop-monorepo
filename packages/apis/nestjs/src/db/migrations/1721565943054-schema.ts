import { MigrationInterface, QueryRunner } from 'typeorm'

export class Schema1721565943054 implements MigrationInterface {
  name = 'Schema1721565943054'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`manage_settings\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL COMMENT '设置项键名' DEFAULT '', \`value\` text NOT NULL COMMENT '设置项键值', UNIQUE INDEX \`IDX_b6d542a7a04ec347acb50379f0\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="系统设置表"`)
    await queryRunner.query(`CREATE TABLE \`manage_staff_role\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '角色名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '角色描述' DEFAULT '', \`permissions\` text NOT NULL COMMENT '角色权限', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), INDEX \`idx_manage_staff_role\` (\`sort\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="员工角色表"`)
    await queryRunner.query(`CREATE TABLE \`manage_staff_department\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`parent_id\` int UNSIGNED NOT NULL COMMENT '上级部门 ID' DEFAULT '0', \`name\` varchar(32) NOT NULL COMMENT '部门名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '部门描述' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), INDEX \`idx_manage_staff_department\` (\`sort\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="组织部门表"`)
    await queryRunner.query(`CREATE TABLE \`manage_staff_position\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '职位名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '职位描述' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`departmentId\` int UNSIGNED NULL, INDEX \`idx_manage_staff_position\` (\`sort\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="组织职位表"`)
    await queryRunner.query(`CREATE TABLE \`manage_staff_account\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`is_admin\` varchar(32) NOT NULL COMMENT '是否管理员 (N: 否 Y: 是)' DEFAULT '', \`status\` varchar(32) NOT NULL COMMENT '员工状态' DEFAULT '', \`username\` varchar(32) NOT NULL COMMENT '员工账号' DEFAULT '', \`password\` varchar(64) NOT NULL COMMENT '员工密码' DEFAULT '', \`salt\` varchar(32) NOT NULL COMMENT '员工密码盐值' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '员工姓名' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '员工手机' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`last_login_time\` datetime NULL COMMENT '最后登录时间', \`departmentId\` int UNSIGNED NULL, \`positionId\` int UNSIGNED NULL, INDEX \`idx_manage_staff_account\` (\`status\`, \`username\`, \`mobile\`, \`last_login_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="员工账号表"`)
    await queryRunner.query(`CREATE TABLE \`manage_staff_log\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '日志类型' DEFAULT '', \`action\` varchar(64) NOT NULL COMMENT '日志操作' DEFAULT '', \`content\` varchar(255) NOT NULL COMMENT '日志内容' DEFAULT '', \`extra\` text NOT NULL COMMENT '额外信息', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`staffId\` int UNSIGNED NULL, INDEX \`idx_manage_staff_log\` (\`type\`, \`created_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="员工操作日志表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_points_rule\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`key\` varchar(32) NOT NULL COMMENT '积分规则标识' DEFAULT '', \`status\` char NOT NULL COMMENT '积分规则状态' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '积分规则名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '积分规则描述' DEFAULT '', \`icon\` varchar(32) NOT NULL COMMENT '积分规则图标' DEFAULT '', \`options\` text NULL COMMENT '积分规则选项', PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员积分规则表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_logout\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`member_id\` int UNSIGNED NOT NULL COMMENT '会员 ID' DEFAULT '0', \`status\` varchar(32) NOT NULL COMMENT '注销状态' DEFAULT '', \`source\` varchar(32) NOT NULL COMMENT '注销来源' DEFAULT '', \`username\` varchar(32) NOT NULL COMMENT '会员账号' DEFAULT '', \`nickname\` varchar(32) NOT NULL COMMENT '会员昵称' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '会员手机' DEFAULT '', \`reason\` varchar(255) NOT NULL COMMENT '注销原因' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`logout_time\` datetime NULL COMMENT '注销时间', INDEX \`idx_shop_member_logout\` (\`status\`, \`source\`, \`username\`, \`nickname\`, \`mobile\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员注销申请表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_tag\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '标签名称' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员标签表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_group\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '群体名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '群体描述' DEFAULT '', \`conditions\` text NULL COMMENT '群体条件', \`total\` int NOT NULL COMMENT '群体人数' DEFAULT '0', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`refresh_time\` datetime NULL COMMENT '刷新时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员群体表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_card_plan\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '会员卡类型' DEFAULT '', \`duration\` int UNSIGNED NOT NULL COMMENT '会员卡套餐有效期' DEFAULT '0', \`price\` float UNSIGNED NOT NULL COMMENT '会员卡套餐价格' DEFAULT '0', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`cardId\` int UNSIGNED NULL, INDEX \`idx_shop_member_card_plan\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员卡自定义套餐表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_card\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '会员卡类型' DEFAULT '', \`is_enabled\` varchar(32) NOT NULL COMMENT '会员卡启用状态' DEFAULT '', \`key\` varchar(32) NOT NULL COMMENT '会员卡标识' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '会员卡名称' DEFAULT '', \`desc\` varchar(255) NOT NULL COMMENT '会员卡描述' DEFAULT '', \`styles\` text NULL COMMENT '会员卡样式', \`need_exp\` int UNSIGNED NOT NULL COMMENT '所需成长值' DEFAULT '0', \`discount\` float UNSIGNED NOT NULL COMMENT '会员折扣' DEFAULT '0', \`points_ratio\` float UNSIGNED NOT NULL COMMENT '获得积分倍率' DEFAULT '0', \`is_free_shipping\` char NOT NULL COMMENT '是否包邮 (N:否 Y:是)' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`idx_shop_member_card\` (\`type\`, \`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员卡信息表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_card_plan_binding\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`times\` int UNSIGNED NOT NULL COMMENT '会员卡使用次数' DEFAULT '0', \`due_time\` datetime NULL COMMENT '到期时间', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`cardId\` int UNSIGNED NULL, \`planId\` int UNSIGNED NULL, UNIQUE INDEX \`REL_0aa4f1a420344af7cc1950e979\` (\`cardId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员卡自定义套餐表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` varchar(32) NOT NULL COMMENT '会员状态' DEFAULT '', \`username\` varchar(32) NOT NULL COMMENT '会员账号' DEFAULT '', \`nickname\` varchar(32) NOT NULL COMMENT '会员昵称' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '会员手机' DEFAULT '', \`password\` varchar(255) NOT NULL COMMENT '会员密码' DEFAULT '', \`salt\` varchar(32) NOT NULL COMMENT '会员密码盐值' DEFAULT '', \`card_no\` varchar(16) NOT NULL COMMENT '会员卡号' DEFAULT '', \`avatar\` varchar(64) NOT NULL COMMENT '会员头像' DEFAULT '', \`birthday\` date NULL COMMENT '会员生日', \`gender\` varchar(32) NOT NULL COMMENT '会员性别' DEFAULT '', \`source\` varchar(32) NOT NULL COMMENT '注册来源' DEFAULT '', \`location\` text NULL COMMENT '注册城市', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_login_time\` datetime NULL COMMENT '最后登录时间', \`groupId\` int UNSIGNED NULL, \`tagId\` int UNSIGNED NULL, \`bindingId\` int UNSIGNED NULL, UNIQUE INDEX \`idx_shop_member\` (\`status\`, \`username\`, \`mobile\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员信息表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_log\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '日志类型' DEFAULT '', \`source\` varchar(32) NOT NULL COMMENT '日志来源' DEFAULT '', \`action\` varchar(32) NOT NULL COMMENT '日志操作' DEFAULT '', \`content\` text NULL COMMENT '日志内容', \`extra\` text NULL COMMENT '额外信息', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`memberId\` int UNSIGNED NULL, UNIQUE INDEX \`idx_shop_member_log\` (\`type\`, \`source\`, \`action\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员日志表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_address\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`member_id\` int UNSIGNED NOT NULL COMMENT '会员 ID' DEFAULT '0', \`contract_name\` varchar(32) NOT NULL COMMENT '联系人' DEFAULT '', \`mobile\` varchar(16) NOT NULL COMMENT '手机号' DEFAULT '', \`location\` text NULL COMMENT '城市', \`address\` varchar(255) NOT NULL COMMENT '详细地址' DEFAULT '', \`post_code\` varchar(8) NOT NULL COMMENT '邮政编码' DEFAULT '', \`is_default\` char NOT NULL COMMENT '是否默认 (N:否 Y:是)' DEFAULT '', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_member_address\` (\`is_default\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员地址表"`)
    await queryRunner.query(`CREATE TABLE \`manage_logistics_company\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '公司名称' DEFAULT '', \`desc\` varchar(64) NOT NULL COMMENT '公司介绍' DEFAULT '', \`url\` varchar(32) NOT NULL COMMENT '公司官网' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="物流公司管理表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_tag\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '标签名称' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_tag\` (\`sort\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品标签表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_brand\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '品牌名称' DEFAULT '', \`desc\` varchar(200) NOT NULL COMMENT '品牌介绍' DEFAULT '', \`logo\` varchar(200) NOT NULL COMMENT '品牌LOGO' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_brand\` (\`sort\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品品牌表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_group\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '分组名称' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_group\` (\`sort\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品分组表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_category\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`parent_id\` int UNSIGNED NOT NULL COMMENT '父分类 ID' DEFAULT '0', \`name\` varchar(32) NOT NULL COMMENT '分类名称' DEFAULT '', \`image\` varchar(200) NOT NULL COMMENT '分类图片' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_category\` (\`sort\`, \`parent_id\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品分类表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_additional\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '服务名称' DEFAULT '', \`desc\` varchar(200) NOT NULL COMMENT '服务介绍' DEFAULT '', \`icon\` varchar(200) NOT NULL COMMENT '服务图标' DEFAULT '', \`price\` float UNSIGNED NOT NULL COMMENT '服务价格' DEFAULT '0', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_additional\` (\`sort\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品附加服务表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_protection\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '服务名称' DEFAULT '', \`desc\` varchar(200) NOT NULL COMMENT '服务介绍' DEFAULT '', \`icon\` varchar(200) NOT NULL COMMENT '服务图标' DEFAULT '', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_protection\` (\`sort\`, \`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品保障服务表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods\` (\`id\` char(32) NOT NULL, \`type\` varchar(32) NOT NULL COMMENT '商品类型' DEFAULT '', \`status\` varchar(32) NOT NULL COMMENT '商品状态' DEFAULT '', \`source\` varchar(32) NOT NULL COMMENT '商品来源' DEFAULT '', \`images\` text NOT NULL COMMENT '商品图片', \`video\` varchar(200) NOT NULL COMMENT '商品视频' DEFAULT '', \`name\` varchar(100) NOT NULL COMMENT '商品名称' DEFAULT '', \`share_desc\` varchar(36) NOT NULL COMMENT '分享描述' DEFAULT '', \`slogan\` varchar(60) NOT NULL COMMENT '商品卖点' DEFAULT '', \`sku_code\` char(32) NOT NULL COMMENT '商品编码' DEFAULT '', \`price\` float UNSIGNED NOT NULL COMMENT '商品价格' DEFAULT '0', \`original_price\` float UNSIGNED NOT NULL COMMENT '商品原价' DEFAULT '0', \`cost_price\` float UNSIGNED NOT NULL COMMENT '商品成本价' DEFAULT '0', \`stock\` int UNSIGNED NOT NULL COMMENT '商品库存' DEFAULT '0', \`alert_stock\` int UNSIGNED NOT NULL COMMENT '预警库存' DEFAULT '0', \`weight\` float UNSIGNED NOT NULL COMMENT '商品重量' DEFAULT '0', \`volume\` float UNSIGNED NOT NULL COMMENT '商品体积' DEFAULT '0', \`unit\` varchar(8) NOT NULL COMMENT '商品单位' DEFAULT '', \`enable_vip_discount\` char NOT NULL COMMENT '是否开启会员折扣 (N:否 Y:是)' DEFAULT 'N', \`enable_purchase_limits\` char NOT NULL COMMENT '是否开启限购 (N:否 Y:是)' DEFAULT 'N', \`purchase_max_qty\` int UNSIGNED NOT NULL COMMENT '限购数量' DEFAULT '0', \`purchase_min_qty\` int UNSIGNED NOT NULL COMMENT '起购数量' DEFAULT '1', \`stock_deduct_mode\` varchar(32) NOT NULL COMMENT '库存扣减方式' DEFAULT '', \`logistics_delivery_modes\` text NOT NULL COMMENT '商品配送方式 (JSON)', \`logistics_freight_charge_mode\` varchar(32) NOT NULL COMMENT '商品物流费用计算方式' DEFAULT '', \`logistics_freight\` float UNSIGNED NOT NULL COMMENT '统一运费' DEFAULT '0', \`logistics_freight_template_id\` int UNSIGNED NOT NULL COMMENT '运费模板 ID' DEFAULT '0', \`logistics_back_freight_by\` varchar(32) NOT NULL COMMENT '商品退货运费承担方' DEFAULT '', \`publish_mode\` varchar(32) NOT NULL COMMENT '商品上架方式' DEFAULT '', \`auto_in_stock_at\` datetime NULL COMMENT '自定义上架时间', \`buy_btn_name_type\` varchar(32) NOT NULL COMMENT '商品购买按钮类型' DEFAULT '', \`buy_btn_name\` varchar(32) NOT NULL COMMENT '商品购买按钮名称' DEFAULT '', \`detail\` text NULL COMMENT '商品详情', \`sort\` int UNSIGNED NOT NULL COMMENT '排序' DEFAULT '1', \`sales\` int UNSIGNED NOT NULL COMMENT '商品销量' DEFAULT '0', \`views\` int UNSIGNED NOT NULL COMMENT '商品浏览量' DEFAULT '0', \`favorites\` int UNSIGNED NOT NULL COMMENT '商品收藏量' DEFAULT '0', \`overall_grade\` char(6) NOT NULL COMMENT '综合评级' DEFAULT 'high', \`overall_goods_score\` int UNSIGNED NOT NULL COMMENT '商品评分' DEFAULT '5', \`overall_service_score\` int UNSIGNED NOT NULL COMMENT '服务评分' DEFAULT '5', \`overall_logistics_score\` int UNSIGNED NOT NULL COMMENT '物流评分' DEFAULT '5', \`attribute_template_id\` int NOT NULL COMMENT '商品参数模板 ID' DEFAULT '0', \`attributes\` text NOT NULL COMMENT '商品参数 (JSON)', \`is_deleted\` char NOT NULL COMMENT '是否已删除 (N:否 Y:是)' DEFAULT 'N', \`created_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_time\` datetime NULL COMMENT '删除时间', \`in_stock_time\` datetime NULL COMMENT '上架时间', \`stocked_time\` datetime NULL COMMENT '下架时间', \`sold_out_time\` datetime NULL COMMENT '售罄时间', \`tagId\` int UNSIGNED NULL, \`groupId\` int UNSIGNED NULL, \`brandId\` int UNSIGNED NULL, INDEX \`idx_shop_goods\` (\`status\`, \`sort\`, \`updated_time\`, \`in_stock_time\`, \`is_deleted\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品信息表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_spec\` (\`id\` char(32) NOT NULL, \`name\` varchar(32) NOT NULL COMMENT '规格名' DEFAULT '', \`values\` text NOT NULL COMMENT '规格值', \`enable_image\` char NOT NULL COMMENT '启用图片 (N:否 Y:是)' DEFAULT 'N', \`goodsId\` char(32) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品规格表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_sku\` (\`id\` char(32) NOT NULL, \`sku_code\` char(32) NOT NULL COMMENT 'SKU 编码' DEFAULT '', \`image\` varchar(200) NOT NULL COMMENT 'SKU 图片' DEFAULT '', \`name\` varchar(100) NOT NULL COMMENT '商品名称' DEFAULT '', \`specs\` text NOT NULL COMMENT '商品规格', \`price\` float UNSIGNED NOT NULL COMMENT '商品价格' DEFAULT '0', \`original_price\` float UNSIGNED NOT NULL COMMENT '商品原价' DEFAULT '0', \`cost_price\` float UNSIGNED NOT NULL COMMENT '商品成本价' DEFAULT '0', \`stock\` int UNSIGNED NOT NULL COMMENT '商品库存' DEFAULT '0', \`alert_stock\` int UNSIGNED NOT NULL COMMENT '预警库存' DEFAULT '0', \`weight\` float UNSIGNED NOT NULL COMMENT '商品重量' DEFAULT '0', \`volume\` float UNSIGNED NOT NULL COMMENT '商品体积' DEFAULT '0', \`sales\` int UNSIGNED NOT NULL COMMENT '商品销量' DEFAULT '0', \`views\` int UNSIGNED NOT NULL COMMENT '商品浏览量' DEFAULT '0', \`favorites\` int UNSIGNED NOT NULL COMMENT '商品收藏量' DEFAULT '0', \`goodsId\` char(32) NULL, UNIQUE INDEX \`idx_shop_goods_sku\` (\`sku_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品 SKU 表"`)
    await queryRunner.query(`CREATE TABLE \`manage_logistics_freight_template\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '模板名称' DEFAULT '', \`calc_mode\` varchar(32) NOT NULL COMMENT '运费计算方式' DEFAULT '', \`rules\` text NOT NULL COMMENT '运费规则 (JSON)', \`enable_free_rules\` char NOT NULL COMMENT '启用包邮地区 (N:否 Y:是)' DEFAULT '', \`free_rules\` text NOT NULL COMMENT '包邮规则 (JSON)', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="物流运费模板表"`)
    await queryRunner.query(`CREATE TABLE \`app_assets_group\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`parent_id\` int UNSIGNED NOT NULL COMMENT '上级分组 ID' DEFAULT '0', \`type\` varchar(32) NOT NULL COMMENT '素材类型' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '分组名称' DEFAULT '', \`enable_compress\` char NOT NULL COMMENT '启用图片压缩 (N:否 Y:是)' DEFAULT 'Y', \`enable_watermark\` char NOT NULL COMMENT '启用图片水印 (N:否 Y:是)' DEFAULT 'Y', \`enable_thumbnail\` char NOT NULL COMMENT '启用图片缩略图 (N:否 Y:是)' DEFAULT 'Y', \`created_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), INDEX \`idx_app_assets_group\` (\`parent_id\`, \`type\`, \`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="素材分组表"`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_attribute_template\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(32) NOT NULL COMMENT '模板名称' DEFAULT '', \`desc\` varchar(200) NOT NULL COMMENT '模板介绍' DEFAULT '', \`options\` text NOT NULL COMMENT '模板参数选项', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`idx_shop_goods_attribute_template\` (\`updated_time\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="商品参数模板表"`)
    await queryRunner.query(`CREATE TABLE \`app_assets\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` varchar(32) NOT NULL COMMENT '素材类型' DEFAULT '', \`name\` varchar(200) NOT NULL COMMENT '文件名称' DEFAULT '', \`path\` varchar(200) NOT NULL COMMENT '文件路径' DEFAULT '', \`size\` int UNSIGNED NOT NULL COMMENT '文件大小' DEFAULT '0', \`created_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`groupId\` int UNSIGNED NULL, INDEX \`idx_app_asset\` (\`type\`, \`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="素材信息表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_token\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`memberId\` int UNSIGNED NOT NULL COMMENT '会员 ID' DEFAULT '0', \`token\` char(48) NOT NULL COMMENT '会员令牌' DEFAULT '', \`expires\` datetime NULL COMMENT '令牌过期时间', \`created_time\` datetime(6) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`refresh_time\` datetime(6) NULL COMMENT '刷新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`idx_shop_member_token\` (\`token\`, \`expires\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员令牌表"`)
    await queryRunner.query(`CREATE TABLE \`shop_member_account\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`member_id\` int UNSIGNED NOT NULL COMMENT '会员 ID' DEFAULT '0', \`key\` varchar(32) NOT NULL COMMENT '账户标识' DEFAULT '', \`status\` varchar(32) NOT NULL COMMENT '账户状态' DEFAULT '', \`name\` varchar(32) NOT NULL COMMENT '账户名' DEFAULT '', \`value\` float NOT NULL COMMENT '账户值' DEFAULT '0', UNIQUE INDEX \`idx_shop_member_account\` (\`key\`, \`status\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB COMMENT="会员账户表"`)
    await queryRunner.query(`CREATE TABLE \`manage_staff_account_has_roles\` (\`manageStaffAccountId\` int UNSIGNED NOT NULL, \`manageStaffRoleId\` int UNSIGNED NOT NULL, INDEX \`IDX_b66424f69b8eb125a287adbf9a\` (\`manageStaffAccountId\`), INDEX \`IDX_6aac4a1f76876230a25e0faca1\` (\`manageStaffRoleId\`), PRIMARY KEY (\`manageStaffAccountId\`, \`manageStaffRoleId\`)) ENGINE=InnoDB`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_has_categories\` (\`shopGoodsId\` char(32) NOT NULL, \`shopGoodsCategoryId\` int UNSIGNED NOT NULL, INDEX \`IDX_a92943bb7263888b986fe2cf96\` (\`shopGoodsId\`), INDEX \`IDX_003b145ba6baaf1f382e2612c2\` (\`shopGoodsCategoryId\`), PRIMARY KEY (\`shopGoodsId\`, \`shopGoodsCategoryId\`)) ENGINE=InnoDB`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_has_protections\` (\`shopGoodsId\` char(32) NOT NULL, \`shopGoodsProtectionId\` int UNSIGNED NOT NULL, INDEX \`IDX_04cad5aa4971a5ed31d0e16d3b\` (\`shopGoodsId\`), INDEX \`IDX_ab5503dbb0eab2837994ef4254\` (\`shopGoodsProtectionId\`), PRIMARY KEY (\`shopGoodsId\`, \`shopGoodsProtectionId\`)) ENGINE=InnoDB`)
    await queryRunner.query(`CREATE TABLE \`shop_goods_has_additions\` (\`shopGoodsId\` char(32) NOT NULL, \`shopGoodsAdditionalId\` int UNSIGNED NOT NULL, INDEX \`IDX_a73d19e74e528b78d9beec2f1c\` (\`shopGoodsId\`), INDEX \`IDX_f5c4047211d89d14948c7514a0\` (\`shopGoodsAdditionalId\`), PRIMARY KEY (\`shopGoodsId\`, \`shopGoodsAdditionalId\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`shop_member_card_plan_binding\` ADD CONSTRAINT \`FK_0aa4f1a420344af7cc1950e9796\` FOREIGN KEY (\`cardId\`) REFERENCES \`shop_member_card\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE \`shop_member_card_plan_binding\` ADD CONSTRAINT \`FK_e2a1a355c14774a95dc17b6df13\` FOREIGN KEY (\`planId\`) REFERENCES \`shop_member_card_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`shop_member_card_plan_binding\` DROP FOREIGN KEY \`FK_e2a1a355c14774a95dc17b6df13\``)
    await queryRunner.query(`ALTER TABLE \`shop_member_card_plan_binding\` DROP FOREIGN KEY \`FK_0aa4f1a420344af7cc1950e9796\``)
    await queryRunner.query(`DROP INDEX \`IDX_f5c4047211d89d14948c7514a0\` ON \`shop_goods_has_additions\``)
    await queryRunner.query(`DROP INDEX \`IDX_a73d19e74e528b78d9beec2f1c\` ON \`shop_goods_has_additions\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_has_additions\``)
    await queryRunner.query(`DROP INDEX \`IDX_ab5503dbb0eab2837994ef4254\` ON \`shop_goods_has_protections\``)
    await queryRunner.query(`DROP INDEX \`IDX_04cad5aa4971a5ed31d0e16d3b\` ON \`shop_goods_has_protections\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_has_protections\``)
    await queryRunner.query(`DROP INDEX \`IDX_003b145ba6baaf1f382e2612c2\` ON \`shop_goods_has_categories\``)
    await queryRunner.query(`DROP INDEX \`IDX_a92943bb7263888b986fe2cf96\` ON \`shop_goods_has_categories\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_has_categories\``)
    await queryRunner.query(`DROP INDEX \`IDX_6aac4a1f76876230a25e0faca1\` ON \`manage_staff_account_has_roles\``)
    await queryRunner.query(`DROP INDEX \`IDX_b66424f69b8eb125a287adbf9a\` ON \`manage_staff_account_has_roles\``)
    await queryRunner.query(`DROP TABLE \`manage_staff_account_has_roles\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_account\` ON \`shop_member_account\``)
    await queryRunner.query(`DROP TABLE \`shop_member_account\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_token\` ON \`shop_member_token\``)
    await queryRunner.query(`DROP TABLE \`shop_member_token\``)
    await queryRunner.query(`DROP INDEX \`idx_app_asset\` ON \`app_assets\``)
    await queryRunner.query(`DROP TABLE \`app_assets\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_attribute_template\` ON \`shop_goods_attribute_template\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_attribute_template\``)
    await queryRunner.query(`DROP INDEX \`idx_app_assets_group\` ON \`app_assets_group\``)
    await queryRunner.query(`DROP TABLE \`app_assets_group\``)
    await queryRunner.query(`DROP TABLE \`manage_logistics_freight_template\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_sku\` ON \`shop_goods_sku\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_sku\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_spec\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods\` ON \`shop_goods\``)
    await queryRunner.query(`DROP TABLE \`shop_goods\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_protection\` ON \`shop_goods_protection\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_protection\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_additional\` ON \`shop_goods_additional\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_additional\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_category\` ON \`shop_goods_category\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_category\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_group\` ON \`shop_goods_group\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_group\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_brand\` ON \`shop_goods_brand\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_brand\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_goods_tag\` ON \`shop_goods_tag\``)
    await queryRunner.query(`DROP TABLE \`shop_goods_tag\``)
    await queryRunner.query(`DROP TABLE \`manage_logistics_company\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_address\` ON \`shop_member_address\``)
    await queryRunner.query(`DROP TABLE \`shop_member_address\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_log\` ON \`shop_member_log\``)
    await queryRunner.query(`DROP TABLE \`shop_member_log\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member\` ON \`shop_member\``)
    await queryRunner.query(`DROP TABLE \`shop_member\``)
    await queryRunner.query(`DROP INDEX \`REL_0aa4f1a420344af7cc1950e979\` ON \`shop_member_card_plan_binding\``)
    await queryRunner.query(`DROP TABLE \`shop_member_card_plan_binding\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_card\` ON \`shop_member_card\``)
    await queryRunner.query(`DROP TABLE \`shop_member_card\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_card_plan\` ON \`shop_member_card_plan\``)
    await queryRunner.query(`DROP TABLE \`shop_member_card_plan\``)
    await queryRunner.query(`DROP TABLE \`shop_member_group\``)
    await queryRunner.query(`DROP TABLE \`shop_member_tag\``)
    await queryRunner.query(`DROP INDEX \`idx_shop_member_logout\` ON \`shop_member_logout\``)
    await queryRunner.query(`DROP TABLE \`shop_member_logout\``)
    await queryRunner.query(`DROP TABLE \`shop_member_points_rule\``)
    await queryRunner.query(`DROP INDEX \`idx_manage_staff_log\` ON \`manage_staff_log\``)
    await queryRunner.query(`DROP TABLE \`manage_staff_log\``)
    await queryRunner.query(`DROP INDEX \`idx_manage_staff_account\` ON \`manage_staff_account\``)
    await queryRunner.query(`DROP TABLE \`manage_staff_account\``)
    await queryRunner.query(`DROP INDEX \`idx_manage_staff_position\` ON \`manage_staff_position\``)
    await queryRunner.query(`DROP TABLE \`manage_staff_position\``)
    await queryRunner.query(`DROP INDEX \`idx_manage_staff_department\` ON \`manage_staff_department\``)
    await queryRunner.query(`DROP TABLE \`manage_staff_department\``)
    await queryRunner.query(`DROP INDEX \`idx_manage_staff_role\` ON \`manage_staff_role\``)
    await queryRunner.query(`DROP TABLE \`manage_staff_role\``)
    await queryRunner.query(`DROP INDEX \`IDX_b6d542a7a04ec347acb50379f0\` ON \`manage_settings\``)
    await queryRunner.query(`DROP TABLE \`manage_settings\``)
  }
}