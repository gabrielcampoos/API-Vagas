import { Perfil } from "../../../shared/enums";

export interface CriarUsuarioDTO {
  nome: string;
  perfil: Perfil;
  username: string;
  senha: string;
  nomeEmpresa: string;
}
