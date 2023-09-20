import { bcrypt } from "../../../shared/utils";
import {
  Resultado,
  ResultadoDTO,
} from "../../../shared/utils/resultado.helper";
import { CriarUsuarioDTO } from "../dto";
import { UsuariosRepository } from "../repository";

export class CriarUsuarioUsecase {
  public async execute(dado: CriarUsuarioDTO): Promise<ResultadoDTO> {
    const repository = new UsuariosRepository();

    const usuarioExistente =
      await repository.verificarSeUsuarioExistePorUsername(dado.username);

    if (usuarioExistente) return Resultado.erro(400, "Usuário já cadastrado.");

    const senhaHash = await bcrypt.generateHash(dado.senha);
    dado.senha = senhaHash;

    const novoUsuario = await repository.cadastrar(dado);

    return Resultado.sucesso(
      200,
      "Usuário criado com sucesso.",
      novoUsuario.toJSON()
    );
  }
}
