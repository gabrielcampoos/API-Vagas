import { Express } from "express";
import usuariosRoutes from "../../app/features/usuarios/usuarios.routes";
import vagasRoutes from "../../app/features/vagas/vagas.routes";

export const makeRoutes = (app: Express) => {
  app.use(usuariosRoutes(), vagasRoutes());
};
