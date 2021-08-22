import {MigrationInterface, QueryRunner} from "typeorm";

export class ArquivosFieldCreateInAulaModel1629652077118 implements MigrationInterface {
    name = 'ArquivosFieldCreateInAulaModel1629652077118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modulo_aulas" ADD "arquivos" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modulo_aulas" DROP COLUMN "arquivos"`);
    }

}
