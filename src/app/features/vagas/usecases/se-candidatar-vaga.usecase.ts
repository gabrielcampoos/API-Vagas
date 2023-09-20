import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { CandidatoVagasRepository, VagasRepository } from "../repository";

export class SeCandidatarVagaUsecase {
  async execute(idVaga: string, idCandidato: string): Promise<ResultadoDTO> {
    const vagaRepository = new VagasRepository();
    const candidatoVagaRepository = new CandidatoVagasRepository();

    const vaga = await vagaRepository.getVagaById(idVaga);

    if (!vaga) return Resultado.erro(404, "Vaga não encontrada.");

    const vagaJSON = vaga.toJSON();

    if (vagaJSON.dtLimite.getTime() < new Date().getTime()) {
      return Resultado.erro(400, "Data limite expirada.");
    }

    if (!vagaJSON.indAtivo) return Resultado.erro(400, "Vaga fechada.");

    if (vagaJSON.maxCandidatos) {
      const total = await candidatoVagaRepository.getTotal(idVaga);

      if (total >= vagaJSON.maxCandidatos) {
        return Resultado.erro(400, "Vaga atingiu o máximo de candidatos.");
      }
    }

    const estaCandidatado =
      await candidatoVagaRepository.verificarSeCandidatoSeAplicouAVagaPorId(
        idCandidato,
        idVaga
      );

    if (estaCandidatado) {
      return Resultado.erro(400, "Candidato já está cadastrado na vaga.");
    }

    await candidatoVagaRepository.cadastrar({ idVaga, idCandidato });

    return Resultado.sucesso(
      200,
      "Candidato se aplicou com sucesso para a vaga.",
      undefined
    );
  }
}
