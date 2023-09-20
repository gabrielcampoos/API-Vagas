import { Base } from "./Base";

export class Vaga extends Base {
  constructor(
    _id: string,
    private _idRecrutador: string,
    private _descricao: string,
    private _nomeEmpresa: string,
    private _indAtivo: boolean,
    private _dtLimite: Date,
    private _maxCandidatos?: number
  ) {
    super();
  }

  public toJSON() {
    return {
      id: this._id,
      idRecrutador: this._idRecrutador,
      descricao: this._descricao,
      nomeEmpresa: this._nomeEmpresa,
      indAtivo: this._indAtivo,
      dtLimite: this._dtLimite,
      maxCandidatos: this._maxCandidatos,
    };
  }
}
