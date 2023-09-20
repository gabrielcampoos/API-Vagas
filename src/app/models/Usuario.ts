import { Perfil } from "../shared/enums";
import { Base } from "./Base";

export interface UsuarioJSON {
  id: string;
  nome: string;
  perfil: Perfil;
  username: string;
  criadoEm: Date;
  nomeEmpresa?: string;
}

export class Usuario extends Base {
  constructor(
    _id: string,
    private _nome: string,
    private _perfil: Perfil,
    private _username: string,
    private _senha: string,
    private _nomeEmpresa?: string
  ) {
    super();
  }

  public toJSON(): UsuarioJSON {
    return {
      id: this._id,
      nome: this._nome,
      perfil: this._perfil,
      username: this._username,
      criadoEm: this._criadoEm,
      nomeEmpresa: this._nomeEmpresa,
    };
  }

  public toJSONComSenha() {
    return {
      id: this._id,
      nome: this._nome,
      perfil: this._perfil,
      username: this._username,
      senha: this._senha,
      criadoEm: this._criadoEm,
      nomeEmpresa: this._nomeEmpresa,
    };
  }
}
