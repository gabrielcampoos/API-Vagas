import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableCandidatosts1694964408627
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vagas_candidatos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "id_vaga",
            type: "uuid",
          },
          {
            name: "id_candidato",
            type: "uuid",
          },
          {
            name: "status",
            type: "varchar",
            length: "50",
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
            columnNames: ["id_vaga"],
            referencedColumnNames: ["id"],
            referencedTableName: "vagas",
            name: "fk_vagas_candidatos_vagas",
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            columnNames: ["id_candidato"],
            referencedColumnNames: ["id"],
            referencedTableName: "usuarios",
            name: "fk_vagas_candidatos_usuarios",
            onDelete: "CASCADE",
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vagas_candidatos", true, true, true);
  }
}
