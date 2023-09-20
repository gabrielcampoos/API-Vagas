import { Resultado, ResultadoDTO } from "../../../shared/utils";
import { CriarVagaDTO } from "../dto";
import { VagasRepository } from "../repository";

export class CriarVagaUsecase {
  public async execute(dados: CriarVagaDTO): Promise<ResultadoDTO> {
    const repository = new VagasRepository();

    const novaVaga = await repository.cadastrar(dados);

    return Resultado.sucesso(
      200,
      "Vaga criada com sucesso.",
      novaVaga.toJSON()
    );
  }
}
