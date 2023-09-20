import { NextFunction, Request, Response } from "express";
import { Resultado, httpHelper } from "../../../shared/utils";

export const validarCriacaoVaga = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { descricao, nomeEmpresa, indAtivo, dtLimite, maxCandidatos } =
    req.body;

  if (!descricao || typeof descricao !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "Descrição é obrigatória.")
    );
  }

  if (!nomeEmpresa || typeof nomeEmpresa !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "Nome da empresa é obrigatório.")
    );
  }

  if (!indAtivo || typeof indAtivo !== "boolean") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "Indicador de ativo é obrigatório.")
    );
  }

  if (!dtLimite || typeof dtLimite !== "string" || dtLimite.length !== 10) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "Data limite é obrigatória no formato dd/mm/aaaa")
    );
  }

  const dataISO = dtLimite.split("/").reverse().join("-");

  req.body.dtLimite = new Date(dataISO);

  if (maxCandidatos) {
    if (typeof maxCandidatos !== "number") {
      return httpHelper.badRequestError(
        res,
        Resultado.erro(
          400,
          "Máximo de candidatos precisa ser no formato numérico."
        )
      );
    }
  }

  return next();
};
