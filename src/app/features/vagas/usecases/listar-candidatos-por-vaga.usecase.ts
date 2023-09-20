import { UsuarioJSON } from "../../../models";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { VagasRepository } from "../repository";

const PREFIX_CACHE = "listar-candidatos";

export class ListarCandidatosPorVagaUsecase {
  async execute(idVaga: string, idUsuario: string): Promise<ResultadoDTO> {
    const repository = new VagasRepository();
    const cacheRepository = new CacheRepository();

    let candidatos = await cacheRepository.get<UsuarioJSON[]>(
      `${PREFIX_CACHE}-${idUsuario}-${idVaga}`
    );

    if (!candidatos) {
      const candidatosDB = await repository.listarCandidatosPorVaga(
        idVaga,
        idUsuario
      );

      if (!candidatosDB) {
        return Resultado.erro(400, "Vaga não encontrada.");
      }

      candidatos = candidatosDB.map((c) => c.toJSON());

      await cacheRepository.set(
        `${PREFIX_CACHE}-${idUsuario}-${idVaga}`,
        candidatos
      );
    }

    return Resultado.sucesso(200, "Candidatos encontrados", candidatos);
  }
}
