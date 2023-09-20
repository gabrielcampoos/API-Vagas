import { NextFunction, Request, Response } from "express";
import { Perfil } from "../enums";
import { httpHelper } from "../utils";
import { Resultado } from "../utils/resultado.helper";

export const somenteRecrutador = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const perfil = req.usuario.perfil;

  if (perfil !== Perfil.RECRUTADOR)
    return httpHelper.badRequestError(
      res,
      Resultado.erro(401, "Usuário não é um recrutador.")
    );

  return next();
};
