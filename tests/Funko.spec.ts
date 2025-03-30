import { test, expect, describe } from "vitest";
import { Funko } from "../src/models/Funko";

describe("Funko", () => {
  test("Se debería crear un nuevo funko", () => {
    const funko: Funko = {
      id: 1,
      nombre: "Funko 1",
      descripcion: "Funko 1 Descripcion",
      tipo: "Funko 1 Tipo",
      genero: "Funko 1 Genero",
      franquicia: "Funko 1 Franquicia",
      numero: 1,
      exclusivo: true,
      caracteristicas: "Funko 1 Caracteristicas",
      valorMercado: 1,
    };
    expect(funko).toBeDefined();
  });
});