import { MigrationInterface, QueryRunner } from 'typeorm'

export class MemberTags1722770248554 implements MigrationInterface {
  name = 'MemberTags1722770248554'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`shop_member_has_tags\` (\`shopMemberId\` int UNSIGNED NOT NULL, \`shopMemberTagId\` int UNSIGNED NOT NULL, INDEX \`IDX_e7b8cdc13631703b4cf05074d2\` (\`shopMemberId\`), INDEX \`IDX_4ff5ac4bcf6e41d51f50952f89\` (\`shopMemberTagId\`), PRIMARY KEY (\`shopMemberId\`, \`shopMemberTagId\`)) ENGINE=InnoDB`)
    await queryRunner.query(`ALTER TABLE \`shop_member\` DROP COLUMN \`tagId\``)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`shop_member\` ADD \`tagId\` int UNSIGNED NULL`)
    await queryRunner.query(`DROP INDEX \`IDX_4ff5ac4bcf6e41d51f50952f89\` ON \`shop_member_has_tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_e7b8cdc13631703b4cf05074d2\` ON \`shop_member_has_tags\``)
    await queryRunner.query(`DROP TABLE \`shop_member_has_tags\``)
  }
}
