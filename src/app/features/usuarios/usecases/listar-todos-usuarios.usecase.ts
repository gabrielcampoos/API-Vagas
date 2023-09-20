import { UsuarioJSON } from "../../../models";
import { CacheRepository } from "../../../shared/cache/cache.repository";
import { Perfil } from "../../../shared/enums";
import {
  Resultado,
  ResultadoDTO,
} from "../../../shared/utils/resultado.helper";
import { UsuariosRepository } from "../repository";

const PREFIX_CACHE = "listar-todos-usuarios";

export class ListarTodosUsuariosUsecase {
  public async execute(filtro?: keyof typeof Perfil): Promise<ResultadoDTO> {
    const repository = new UsuariosRepository();
    const cacheRepository = new CacheRepository();

    const usuariosCache = await cacheRepository.get<UsuarioJSON[]>(
      PREFIX_CACHE
    );

    let usuarios: UsuarioJSON[] = [];

    if (!usuariosCache) {
      const usuariosDB = await repository.listarUsuarios();

      const usuarios = usuariosDB.map((u) => u.toJSON());

      await cacheRepository.set(PREFIX_CACHE, usuarios);
    } else {
      usuarios = usuariosCache;
    }

    if (filtro) {
      usuarios = usuarios.filter((u) => u.perfil === filtro);
    }

    return Resultado.sucesso(200, "Usuários cadastrados.", usuarios);
  }
}
