import { Request, Response } from "express";
import { Perfil } from "../../../shared/enums";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";
import { CriarUsuarioDTO } from "../dto";
import {
  CriarUsuarioUsecase,
  ListarTodosUsuariosUsecase,
  LoginUsuarioUsecase,
} from "../usecases";

export class UsuariosController {
  public static async criarUsuario(req: Request, res: Response) {
    const usuario: CriarUsuarioDTO = req.body;

    try {
      const usecase = new CriarUsuarioUsecase();

      const resultado = await usecase.execute(usuario);

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async criarCandidato(req: Request, res: Response) {
    const usuario: CriarUsuarioDTO = req.body;

    try {
      const usecase = new CriarUsuarioUsecase();

      const resultado = await usecase.execute(usuario);

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async loginUsuario(req: Request, res: Response) {
    const { username, senha }: CriarUsuarioDTO = req.body;

    try {
      const usecase = new LoginUsuarioUsecase();

      const resultado = await usecase.execute({ username, senha });

      if (!resultado.sucesso) return httpHelper.badRequestError(res, resultado);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }

  public static async listarUsuarios(req: Request, res: Response) {
    try {
      const { perfil } = req.query;

      const usecase = new ListarTodosUsuariosUsecase();

      const resultado = await usecase.execute(perfil as keyof typeof Perfil);

      return httpHelper.success(res, resultado);
    } catch (erro: any) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(500, erro.toString())
      );
    }
  }
}
