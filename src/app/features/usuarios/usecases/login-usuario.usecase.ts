import { bcrypt, jwt } from "../../../shared/utils";
import {
  Resultado,
  ResultadoDTO,
} from "../../../shared/utils/resultado.helper";
import { CriarUsuarioDTO } from "../dto";
import { UsuariosRepository } from "../repository";

type LoginUsuarioDTO = Omit<CriarUsuarioDTO, "nome" | "perfil" | "nomeEmpresa">;

export class LoginUsuarioUsecase {
  public async execute(dados: LoginUsuarioDTO): Promise<ResultadoDTO> {
    const repository = new UsuariosRepository();

    const usuarioExistente =
      await repository.verificarSeUsuarioExistePorUsername(dados.username);

    if (!usuarioExistente)
      return Resultado.erro(404, "Usuário não encontrado.");

    const senhaValidada = await bcrypt.compareHash(
      dados.senha,
      usuarioExistente.toJSONComSenha().senha
    );

    if (!senhaValidada)
      return Resultado.erro(404, "Usuário ou senha inválidos.");

    const dadoUsuario = usuarioExistente.toJSON();
    const token = jwt.encoded(dadoUsuario);

    return Resultado.sucesso(200, "Usuário logado com sucesso.", {
      ...dadoUsuario,
      token,
    });
  }
}
