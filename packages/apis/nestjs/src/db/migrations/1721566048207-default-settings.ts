import { MigrationInterface, QueryRunner } from 'typeorm'

export class DefaultSettings1721566048207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO \`manage_settings\` (\`key\`, \`value\`) VALUES 
      ('store.name', 'XiaoShop'),
      ('store.logo', ''),
      ('store.tel', ''),
      ('store.enableWeapp', '1'),
      ('store.enableH5', '1'),
      ('store.contact', '云链小朔'),
      ('store.contactMobile', ''),
      ('store.contactPhone', ''),
      ('store.email', 'xiaos@mouji.net'),
      ('store.location', ''),
      ('store.address', ''),
      ('store.longitude', ''),
      ('store.latitude', ''),
      ('map.key', ''),
      ('map.enableMobileLocation', '1'),
      ('map.mobileLocationExpire', '15'),
      ('verifyCode.enableOnAdminLogin', '1'),
      ('verifyCode.enableOnLogin', '1'),
      ('verifyCode.enableOnRegister', '1')
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`manage_settings\` WHERE \`key\` IN (
      'store.name',
      'store.logo',
      'store.tel',
      'store.enableWeapp',
      'store.enableH5',
      'store.contact',
      'store.contactMobile',
      'store.contactPhone',
      'store.email',
      'store.location',
      'store.address',
      'store.longitude',
      'store.latitude',
      'map.key',
      'map.enableMobileLocation',
      'map.mobileLocationExpire',
      'verifyCode.enableOnAdminLogin',
      'verifyCode.enableOnLogin',
      'verifyCode.enableOnRegister'
    )`)
  }
}

// @ID: default
// @CREATE: [{"key":"store.name","value":"XiaoShop"},{"key":"store.logo","value":""},{"key":"store.tel","value":""},{"key":"store.enableWeapp","value":"1"},{"key":"store.enableH5","value":"1"},{"key":"store.contact","value":"云链小朔"},{"key":"store.contactMobile","value":""},{"key":"store.contactPhone","value":""},{"key":"store.email","value":"xiaos@mouji.net"},{"key":"store.location","value":""},{"key":"store.address","value":""},{"key":"store.longitude","value":""},{"key":"store.latitude","value":""},{"key":"map.key","value":""},{"key":"map.enableMobileLocation","value":"1"},{"key":"map.mobileLocationExpire","value":"15"},{"key":"verifyCode.enableOnAdminLogin","value":"1"},{"key":"verifyCode.enableOnLogin","value":"1"},{"key":"verifyCode.enableOnRegister","value":"1"}]
// @UPDATE: []
// @RESTORE: []
// @REMOVE: []
// -------------------------------------------------
// Generated by XiaoShop API Client
