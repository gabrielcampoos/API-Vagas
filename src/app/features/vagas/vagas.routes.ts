import { Router } from "express";
import {
  autenticar,
  somenteCandidato,
  somenteRecrutador,
} from "../../shared/middlewares";
import { VagasController } from "./controllers/vagas.controller";
import { validarCriacaoVaga } from "./middlewares";

export default () => {
  const router = Router();

  router.get("/vagas", (req, res) => {
    res.send("OK");
  });

  router.post(
    "/vagas",
    [autenticar, somenteRecrutador, validarCriacaoVaga],
    VagasController.criarVaga
  );

  router.post(
    "/vagas/:idVaga/candidatar",
    [autenticar, somenteCandidato],
    VagasController.seCandidatarVaga
  );

  router.get(
    "/vagas-candidato",
    [autenticar, somenteCandidato],
    VagasController.listarVagas
  );

  router.get(
    "/vagas/:idVaga/candidatos",
    [autenticar, somenteRecrutador],
    VagasController.listarCandidatosPorVaga
  );

  router.get(
    "/vagas-por-recrutador",
    [autenticar, somenteRecrutador],
    VagasController.listarCandidatosPorVaga
  );

  router.put(
    "/vagas/:idVaga",
    [autenticar, somenteRecrutador],
    VagasController.alterarVaga
  );

  router.delete(
    "/vagas/:idVaga",
    [autenticar, somenteRecrutador],
    VagasController.deletarVaga
  );

  return router;
};
