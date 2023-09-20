import { NextFunction, Request, Response } from "express";
import { Perfil } from "../enums";
import { httpHelper } from "../utils";
import { Resultado } from "../utils/resultado.helper";

export const somenteCandidato = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const perfil = req.usuario.perfil;

  if (perfil !== Perfil.CANDIDATO)
    return httpHelper.badRequestError(
      res,
      Resultado.erro(401, "Usuário não é um candidato.")
    );

  return next();
};
