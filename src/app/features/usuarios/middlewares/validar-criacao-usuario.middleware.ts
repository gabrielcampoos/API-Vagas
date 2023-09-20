import { NextFunction, Request, Response } from "express";
import { Perfil } from "../../../shared/enums";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";

export const validarCriacaoUsuario = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { perfil, nomeEmpresa } = req.body;

  if (perfil !== Perfil.ADMINISTRADOR && perfil !== Perfil.RECRUTADOR) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(
        400,
        'Campo de perfil inválido. Somente valores de "administrador" ou "recrutador".'
      )
    );
  }

  if (
    perfil === Perfil.RECRUTADOR &&
    (!nomeEmpresa || typeof nomeEmpresa !== "string")
  ) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(
        400,
        "É necessário informar o nome da empresa para criar um recrutador."
      )
    );
  }

  return next();
};
