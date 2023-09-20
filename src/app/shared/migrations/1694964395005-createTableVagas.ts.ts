import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableVagasts1694964395005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vagas",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_recrutador",
            type: "uuid",
          },
          {
            name: "descricao",
            type: "text",
          },
          {
            name: "nome_empresa",
            type: "varchar",
            length: "100",
          },
          {
            name: "ind_ativo",
            type: "boolean",
          },
          {
            name: "data_limite",
            type: "timestamp",
          },
          {
            name: "max_candidatos",
            type: "int",
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
        foreignKeys: [
          new TableForeignKey({
            columnNames: ["id_recrutador"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios",
            name: "fk_vagas_recrutador",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vagas", true, true, true);
  }
}
