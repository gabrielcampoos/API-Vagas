import { CandidatoVagaStatus } from "../../../shared/enums";

export interface SeCandidatarDTO {
  idVaga: string;
  idRecrutador: string;
  indSucesso: CandidatoVagaStatus;
}
