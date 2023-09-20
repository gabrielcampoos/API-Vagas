import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado } from "../../../shared/utils";
import { CandidatoVagasRepository } from "../repository";

const PREFIX_CACHE = "listar-vagas";

export class ListarVagasUsecase {
  async execute(idUsuario: string) {
    const repository = new CandidatoVagasRepository();
    const cacheRepository = new CacheRepository();

    let aplicacoes = await cacheRepository.get(`${PREFIX_CACHE}-${idUsuario}`);

    if (!aplicacoes) {
      aplicacoes = await repository.listarVagasPorCandidato(idUsuario);
      await cacheRepository.set(`${PREFIX_CACHE}-${idUsuario}`, aplicacoes);
    }

    return Resultado.sucesso(200, "Aplicações OK", aplicacoes);
  }
}
