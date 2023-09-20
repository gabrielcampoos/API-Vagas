import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, UsuariosEntity, VagaEntity } from ".";
import { CandidatoVagaStatus } from "../enums";

@Entity({ name: "candidato_vaga" })
export class CandidatoVagaEntity extends BaseEntity {
  @Column({ name: "id_vaga" })
  public idVaga: string;

  @Column({ name: "id_candidato" })
  public idCandidato: string;

  @Column({ type: "enum", enum: CandidatoVagaStatus, name: "ind_sucesso" })
  public indSucesso: CandidatoVagaStatus;

  @ManyToOne(() => VagaEntity, (entity) => entity.candidatoVaga)
  @JoinColumn({ name: "id_vaga", referencedColumnName: "id" })
  public vaga: VagaEntity;

  @ManyToOne(() => UsuariosEntity, (entity) => entity.candidatosVaga)
  @JoinColumn({ name: "id_candidato", referencedColumnName: "id" })
  public candidato: UsuariosEntity;
}
