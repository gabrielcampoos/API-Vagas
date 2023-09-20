import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, CandidatoVagaEntity, VagaEntity } from ".";
import { Perfil } from "../enums";

@Entity({ name: "usuarios" })
export class UsuariosEntity extends BaseEntity {
  @Column()
  public nome: string;

  @Column()
  public username: string;

  @Column({ type: "enum", enum: Perfil })
  public perfil: Perfil;

  @Column()
  public senha: string;

  @Column({ name: "nome_empresa" })
  public nomeEmpresa: string;

  @OneToMany(() => VagaEntity, (entity) => entity.recrutador)
  public vagas: VagaEntity[];

  @OneToMany(() => CandidatoVagaEntity, (entity) => entity.idCandidato)
  public candidatosVaga: CandidatoVagaEntity[];
}
