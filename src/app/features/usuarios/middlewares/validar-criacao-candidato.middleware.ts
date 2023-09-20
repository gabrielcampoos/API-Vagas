import { NextFunction, Request, Response } from "express";
import { Perfil } from "../../../shared/enums";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";

export const validarCriacaoCandidato = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { perfil } = req.body;

  if (perfil !== Perfil.CANDIDATO) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(
        400,
        "Campo de perfil inválido. Somente valores de candidato."
      )
    );
  }

  return next();
};
