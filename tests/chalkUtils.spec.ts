import { test, describe, expect } from "vitest";
import { mostrarInfoFunko } from "../src/utils/chalkUtils";
import { Funko } from "../src/models/Funko";

describe("Pruebas sobre chalkUtils", () => { 
  test("debería mostrar la información de un Funko", () => {
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
    mostrarInfoFunko(funko);
  });
});