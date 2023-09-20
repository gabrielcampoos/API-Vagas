import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, CandidatoVagaEntity, UsuariosEntity } from ".";

@Entity({ name: "vagas" })
export class VagaEntity extends BaseEntity {
  @Column()
  public descricao: string;

  @Column({ name: "id_recrutador" })
  public idRecrutador: string;

  @Column({ name: "nome_empresa" })
  public nomeEmpresa: string;

  @Column({ name: "ind_ativo" })
  public indAtivo: boolean;

  @Column({ name: "dt_limite" })
  public dtLimite: Date;

  @Column({ name: "max_candidatos" })
  public maxCandidatos?: number;

  @ManyToOne(() => UsuariosEntity, (entity) => entity.vagas)
  @JoinColumn({ name: "id_recrutador", referencedColumnName: "id" })
  public recrutador: UsuariosEntity;

  @OneToMany(() => CandidatoVagaEntity, (entity) => entity.idVaga)
  public candidatoVaga: CandidatoVagaEntity[];
}
