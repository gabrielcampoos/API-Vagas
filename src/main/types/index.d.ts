declare namespace Express {
  interface Request {
    usuario: {
      id: string;
      perfil: string;
      username: string;
      nomeEmpresa: string;
    };
  }
}
