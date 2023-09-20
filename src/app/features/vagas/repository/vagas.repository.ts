import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { Usuario, Vaga } from "../../../models";
import { UsuariosEntity, VagaEntity } from "../../../shared/entities";
import { CriarVagaDTO } from "../dto";

export class VagasRepository {
  private _manager = DatabaseConnection.connection.manager;

  public async cadastrar(vaga: CriarVagaDTO): Promise<Vaga> {
    const criarVaga = this._manager.create(VagaEntity, { ...vaga });

    const vagaCriada = await this._manager.save(criarVaga);

    return this.entityToModel(vagaCriada);
  }

  async getVagaById(idVaga: string): Promise<Vaga | undefined> {
    const vaga = await this._manager.findOneBy(VagaEntity, { id: idVaga });

    if (!vaga) return undefined;

    return this.entityToModel(vaga);
  }

  async listarCandidatosPorVaga(
    id: string,
    idRecrutador: string
  ): Promise<Usuario[] | undefined> {
    const vaga = await this._manager.findOne(VagaEntity, {
      where: {
        id,
        idRecrutador,
      },

      relations: {
        candidatoVaga: true,
      },
    });

    if (!vaga) return undefined;

    return vaga.candidatoVaga.map((c) =>
      this.entityToModelUsuario(c.candidato)
    );
  }

  async alterarVaga(idVaga: string): Promise<Vaga | undefined> {
    const vaga = await this._manager.findOneBy(VagaEntity, { id: idVaga });

    if (!vaga) return undefined;

    if (vaga.indAtivo === true) {
      vaga.indAtivo = false;
    }

    return this.entityToModel(vaga);
  }

  async deletarVaga(idVaga: string): Promise<void> {
    const vaga = await this._manager.delete(VagaEntity, { id: idVaga });

    if (!vaga) return undefined;
  }

  private entityToModel(dadosDB: VagaEntity): Vaga {
    return new Vaga(
      dadosDB.id,
      dadosDB.idRecrutador,
      dadosDB.descricao,
      dadosDB.nomeEmpresa,
      dadosDB.indAtivo,
      dadosDB.criadoEm,
      dadosDB.maxCandidatos
    );
  }

  private entityToModelUsuario(dadosDB: UsuariosEntity): Usuario {
    return new Usuario(
      dadosDB.id,
      dadosDB.nome,
      dadosDB.perfil,
      dadosDB.username,
      dadosDB.senha,
      dadosDB.nomeEmpresa
    );
  }
}
