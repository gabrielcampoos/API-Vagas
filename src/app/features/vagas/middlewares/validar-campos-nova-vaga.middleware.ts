import { NextFunction, Request, Response } from "express";
import { httpHelper } from "../../../shared/utils";
import { Resultado } from "../../../shared/utils/resultado.helper";

export const validarCamposNovaVaga = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    idRecrutador,
    descricao,
    nomeEmpresa,
    indAtivo,
    dtLimite,
    maxCandidatos,
  } = req.body;

  if (!idRecrutador || typeof idRecrutador !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar o id do recrutador.")
    );
  }

  if (!descricao || typeof descricao !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar uma descrição.")
    );
  }

  if (!nomeEmpresa || typeof nomeEmpresa !== "string") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar o nome da empresa.")
    );
  }

  if (!indAtivo || typeof indAtivo !== "boolean") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar o status da vaga.")
    );
  }

  if (!dtLimite || typeof dtLimite !== Date.toString()) {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(400, "É necessário informar a data limite.")
    );
  }

  if (!maxCandidatos || typeof maxCandidatos !== "number") {
    return httpHelper.badRequestError(
      res,
      Resultado.erro(
        400,
        "É necessário informar a quantidade máxima de candidatos."
      )
    );
  }

  next();
};
