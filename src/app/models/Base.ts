export abstract class Base {
  protected _id: string;
  protected _criadoEm: Date;

  public toJSON() {
    // a lógica de execução vai ficar nas subclasses.
  }
}
