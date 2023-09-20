import { randomUUID } from "crypto";
import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from "typeorm";

export class BaseEntity {
  @PrimaryColumn()
  public id: string;

  @Column({ name: "criado_em" })
  public criadoEm: Date;

  @Column({ name: "atualizado_em" })
  public atualizadoEm: Date;

  @BeforeInsert()
  public beforeInsert() {
    this.id = randomUUID();
    this.criadoEm = new Date();
    this.atualizadoEm = new Date();
  }

  @BeforeUpdate()
  public beforeUpdate() {
    this.atualizadoEm = new Date();
  }
}
