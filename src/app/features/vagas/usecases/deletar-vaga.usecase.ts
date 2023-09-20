import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { VagasRepository } from "../repository";

const PREFIX_CACHE = "deletar-vaga";

export class DeletarVagaUsecase {
  public async execute(idVaga: string): Promise<ResultadoDTO> {
    const repository = new VagasRepository();

    const cacheRepository = new CacheRepository();

    let vaga = await cacheRepository.get(`${PREFIX_CACHE}-${idVaga}`);

    if (!vaga) {
      vaga = await repository.deletarVaga(idVaga);

      await cacheRepository.set(`${PREFIX_CACHE}-${idVaga}`, vaga);
    }

    return Resultado.sucesso(200, "Vaga deletada com sucesso", vaga);
  }
}
