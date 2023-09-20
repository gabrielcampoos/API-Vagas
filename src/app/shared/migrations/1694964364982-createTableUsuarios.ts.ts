import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsuariosts1694964364982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isUnique: true,
          },
          {
            name: "perfil",
            type: "varchar",
            length: "15",
          },
          {
            name: "senha",
            type: "varchar",
            length: "255",
          },
          {
            name: "nome_empresa",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "criado_em",
            type: "timestamp",
          },
          {
            name: "atualizado_em",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios", true, true, true);
  }
}
