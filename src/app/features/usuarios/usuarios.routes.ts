import { Router } from "express";
import { autenticar, somenteAdministrador } from "../../shared/middlewares";
import { UsuariosController } from "./controllers/usuarios-controller";
import {
  FiltroUsuario,
  limparCampos,
  validarCamposNovoUsuario,
  validarCriacaoCandidato,
  validarCriacaoUsuario,
  validarLogin,
} from "./middlewares";

export default () => {
  const router = Router();

  router.post(
    "/usuarios",
    [
      autenticar,
      somenteAdministrador,
      validarCamposNovoUsuario,
      limparCampos,
      validarCriacaoUsuario,
    ],
    UsuariosController.criarUsuario
  );
  router.post(
    "/candidatos",
    [validarCamposNovoUsuario, limparCampos, validarCriacaoCandidato],
    UsuariosController.criarCandidato
  );
  router.post("/login", validarLogin, UsuariosController.loginUsuario);
  router.get(
    "/usuarios",
    [autenticar, somenteAdministrador, FiltroUsuario],
    UsuariosController.listarUsuarios
  );

  return router;
};
