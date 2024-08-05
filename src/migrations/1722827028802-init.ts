import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1722827028802 implements MigrationInterface {
  name = 'Init1722827028802';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(30) NOT NULL, \`email\` varchar(60) NOT NULL, \`encPassword\` varchar(255) NOT NULL, \`roles\` text NOT NULL DEFAULT 'user', \`refreshToken\` varchar(255) NULL, \`refreshTokenExp\` timestamp NULL DEFAULT CURRENT_TIMESTAMP(), UNIQUE INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
