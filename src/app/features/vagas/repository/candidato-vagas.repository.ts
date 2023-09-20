import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { CandidatoVagaEntity } from "../../../shared/entities";
import { CandidatoVagaStatus } from "../../../shared/enums";

interface SeCandidatarDTO {
  idCandidato: string;
  idVaga: string;
}

export class CandidatoVagasRepository {
  private _manager = DatabaseConnection.connection.manager;

  async cadastrar(dado: SeCandidatarDTO): Promise<void> {
    const candidatoVagaEntity = this._manager.create(CandidatoVagaEntity, {
      idVaga: dado.idVaga,
      idCandidato: dado.idCandidato,
      indSucesso: CandidatoVagaStatus.EM_PROCESSO,
    });

    await this._manager.save(candidatoVagaEntity);
  }

  async verificarSeCandidatoSeAplicouAVagaPorId(
    idCandidato: string,
    idVaga: string
  ): Promise<boolean> {
    const candidatoCadastrado = await this._manager.find(CandidatoVagaEntity, {
      where: { idCandidato: idCandidato, idVaga: idVaga },
    });

    return !!candidatoCadastrado.length;
  }

  async getTotal(idVaga: string): Promise<number> {
    const total = await this._manager.count(CandidatoVagaEntity, {
      where: { idVaga: idVaga },
    });

    return total;
  }

  async listarVagasPorCandidato(id: string): Promise<CandidatoVagaEntity[]> {
    const listaVagas = await this._manager.find(CandidatoVagaEntity, {
      where: {
        idCandidato: id,
      },
      relations: {
        vaga: true,
      },
    });

    return listaVagas;
  }
}
