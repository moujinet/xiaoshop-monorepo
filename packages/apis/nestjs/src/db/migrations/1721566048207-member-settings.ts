import { MigrationInterface, QueryRunner } from 'typeorm'

export class MemberSettings1721566048207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`manage_settings\` (\`key\`, \`value\`) VALUES 
      ('member.register.enableUsername', '1'),
      ('member.register.enableMobile', '1'),
      ('member.register.enableOAuth', '1'),
      ('member.register.enableBindingMobile', '1'),
      ('member.register.passwordLength', '6'),
      ('member.register.passwordStrong', '["number", "lower"]'),
      ('member.register.defaultAvatar', ''),
      ('member.logout.enableLogout', '1'),
      ('member.logout.enableAudit', '1')
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`manage_settings\` WHERE \`key\` IN (
      'member.register.enableUsername',
      'member.register.enableMobile',
      'member.register.enableOAuth',
      'member.register.enableBindingMobile',
      'member.register.passwordLength',
      'member.register.passwordStrong',
      'member.register.defaultAvatar',
      'member.logout.enableLogout',
      'member.logout.enableAudit'
    )`)
  }
}

// @ID: member
// @CREATE: [{"key":"register.enableUsername","value":"1"},{"key":"register.enableMobile","value":"1"},{"key":"register.enableOAuth","value":"1"},{"key":"register.enableBindingMobile","value":"1"},{"key":"register.passwordLength","value":"6"},{"key":"register.passwordStrong","value":"[\"number\", \"lower\"]"},{"key":"register.defaultAvatar","value":""},{"key":"logout.enableLogout","value":"1"},{"key":"logout.enableAudit","value":"1"}]
// @UPDATE: []
// @RESTORE: []
// @REMOVE: []
// -------------------------------------------------
// Generated by XiaoShop API Client
