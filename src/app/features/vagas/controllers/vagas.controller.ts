import { Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";
import { CriarVagaUsecase, SeCandidatarVagaUsecase } from "../usecases";
import { AlterarVagaUsecase } from "../usecases/alterar-vaga.usecase";
import { DeletarVagaUsecase } from "../usecases/deletar-vaga.usecase";
import { ListarCandidatosPorVagaUsecase } from "../usecases/listar-candidatos-por-vaga.usecase";
import { ListarVagasUsecase } from "../usecases/listar-vagas.usecase";

export class VagasController {
  public static async criarVaga(req: Request, res: Response) {
    const dados = req.body;
    const { id } = req.usuario;

    try {
      const usecase = new CriarVagaUsecase();

      const resultado = await usecase.execute({
        idRecrutador: id,
        ...dados,
      });

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async seCandidatarVaga(req: Request, res: Response) {
    const { idVaga } = req.params;
    const { id } = req.usuario;

    try {
      const usecase = new SeCandidatarVagaUsecase();

      const resultado = await usecase.execute(idVaga, id);

      if (!resultado.sucesso) {
        return httpHelper.badRequestError(res, resultado);
      }

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async listarVagas(req: Request, res: Response) {
    const { id } = req.usuario;

    try {
      const usecase = new ListarVagasUsecase();

      const resultado = await usecase.execute(id);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async listarCandidatosPorVaga(req: Request, res: Response) {
    const { idVaga } = req.params;
    const { id } = req.usuario;

    try {
      const usecase = new ListarCandidatosPorVagaUsecase();

      const resultado = await usecase.execute(idVaga, id);

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async alterarVaga(req: Request, res: Response) {
    const { idVaga } = req.params;

    try {
      const usecase = new AlterarVagaUsecase();

      const resultado = await usecase.execute(idVaga);

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(res, erro.toString());
    }
  }

  public static async deletarVaga(req: Request, res: Response) {
    const { idVaga } = req.params;

    try {
      const usecase = new DeletarVagaUsecase();

      const resultado = await usecase.execute(idVaga);

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(res, erro.toString());
    }
  }
}
