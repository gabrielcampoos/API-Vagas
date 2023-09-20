export interface CriarVagaDTO {
  idRecrutador: string;
  descricao: string;
  nomeEmpresa: string;
  indAtivo: boolean;
  dtLimite: Date;
  maxCandidatos?: number;
}
