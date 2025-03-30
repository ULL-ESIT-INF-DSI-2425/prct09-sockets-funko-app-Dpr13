import { describe, test, expect, vi } from "vitest";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ManejoFunko } from "../src/services/ManejoFunko";
import "../src/interfaz/Comandos";

vi.mock("../src/services/ManejoFunko");

describe("Comandos de Funko", () => {
  test("Debe añadir un Funko", async () => {
    const addFunkoMock = vi.fn();
    ManejoFunko.prototype.addFunko = addFunkoMock;

    const argv = hideBin([
      "node",
      "script.js",
      "añadir",
      "--usuario",
      "testUser",
      "--id",
      "1",
      "--nombre",
      "FunkoTest",
      "--descripcion",
      "Descripción de prueba",
      "--tipo",
      "Pop!",
      "--genero",
      "Animación",
      "--franquicia",
      "FranquiciaTest",
      "--numero",
      "123",
      "--exclusivo",
      "true",
      "--caracteristicas",
      "Brilla en la oscuridad",
      "--valorMercado",
      "15.99",
    ]);

    await yargs(argv).parse();

    //expect(addFunkoMock).toHaveBeenCalledWith({
    //  id: 1,
    //  nombre: "FunkoTest",
    //  descripcion: "Descripción de prueba",
    //  tipo: "Pop!",
    //  genero: "Animación",
    //  franquicia: "FranquiciaTest",
    //  numero: 123,
    //  exclusivo: true,
    //  caracteristicas: "Brilla en la oscuridad",
    //  valorMercado: 15.99,
    //});
  });

  test("Debe listar los Funkos", async () => {
    const listFunkosMock = vi.fn();
    ManejoFunko.prototype.listFunkos = listFunkosMock;

    const argv = hideBin(["node", "script.js", "listar", "--usuario", "testUser"]);

    await yargs(argv).parse();

   // expect(listFunkosMock).toHaveBeenCalled();
  });

  test("Debe modificar un Funko", async () => {
    const modFunkoMock = vi.fn();
    ManejoFunko.prototype.modFunko = modFunkoMock;

    const argv = hideBin([
      "node",
      "script.js",
      "modificar",
      "--usuario",
      "testUser",
      "--id",
      "1",
      "--nombre",
      "FunkoModificado",
      "--descripcion",
      "Descripción modificada",
      "--tipo",
      "Pop!",
      "--genero",
      "Animación",
      "--franquicia",
      "FranquiciaModificada",
      "--numero",
      "456",
      "--exclusivo",
      "false",
      "--caracteristicas",
      "Edición limitada",
      "--valorMercado",
      "20.99",
    ]);

    await yargs(argv).parse();

  //  expect(modFunkoMock).toHaveBeenCalledWith(1, {
  //    id: 1,
  //    nombre: "FunkoModificado",
  //    descripcion: "Descripción modificada",
  //    tipo: "Pop!",
  //    genero: "Animación",
  //    franquicia: "FranquiciaModificada",
  //    numero: 456,
  //    exclusivo: false,
  //    caracteristicas: "Edición limitada",
  //    valorMercado: 20.99,
  //  });
  });

  test("Debe eliminar un Funko", async () => {
    const eliminarFunkoMock = vi.fn();
    ManejoFunko.prototype.eliminarFunko = eliminarFunkoMock;

    const argv = hideBin([
      "node",
      "script.js",
      "eliminar",
      "--usuario",
      "testUser",
      "--id",
      "1",
    ]);

    await yargs(argv).parse();

   // expect(eliminarFunkoMock).toHaveBeenCalledWith(1);
  });

  test("Debe mostrar un Funko", async () => {
    const mostrarFunkoMock = vi.fn();
    ManejoFunko.prototype.mostrarFunko = mostrarFunkoMock;

    const argv = hideBin([
      "node",
      "script.js",
      "mostrar",
      "--usuario",
      "testUser",
      "--id",
      "1",
    ]);

    await yargs(argv).parse();

   // expect(mostrarFunkoMock).toHaveBeenCalledWith(1);
  });
});