import { NextFunction, Request, Response } from "express";
import { Perfil } from "../../../shared/enums";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";

export const FiltroUsuario = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { perfil } = req.query;

  const perfis = Object.keys(Perfil);

  if (perfil) {
    if (typeof perfil !== "string" || !perfis.includes(perfil)) {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(
          400,
          "Informar perfil com valor string. Valores aceitos: " +
            perfis.join(",")
        )
      );
    }
  }
  return next();
};
