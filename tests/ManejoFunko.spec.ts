import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
// import chalk from 'chalk';
import { ManejoFunko } from '../src/services/ManejoFunko';
import { Funko } from '../src/models/Funko';
import { mostrarInfoFunko } from '../src/utils/chalkUtils';
vi.mock('../src/utils/chalkUtils', () => ({
  mostrarInfoFunko: vi.fn(),
}));

vi.mock('fs');
vi.mock("chalk", () => ({
  red: (text: string) => text,
  green: (text: string) => text,
  blue: (text: string) => text,
}));
vi.mock("chalk", () => ({
  default: {
    red: (text: string) => text,
    green: (text: string) => text,
    blue: (text: string) => text,
  },
}));

describe('ManejoFunko', () => {
  const usuario = 'testUser';
  const funko: Funko = {id: 1, nombre: 'Funko 1', descripcion: 'Funko 1 Descripcion', tipo: 'Funko 1 Tipo', genero: 'Funko 1 Genero', franquicia: 'Funko 1 Franquicia', numero: 1, exclusivo: true, caracteristicas: 'Funko 1 Caracteristicas', valorMercado: 1};
  let manejoFunko: ManejoFunko;
  const funkoPath = path.join(__dirname, '../../data', usuario, `${funko.id}.json`);

  beforeEach(() => {
    vi.restoreAllMocks();
    manejoFunko = new ManejoFunko(usuario);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe crear el directorio si no existe', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const mkdirSyncMock = vi.spyOn(fs, 'mkdirSync');
    new ManejoFunko(usuario);
    expect(mkdirSyncMock).toHaveBeenCalledWith(expect.any(String), { recursive: true });
  });

  it('no debe agregar un Funko si ya existe', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const consoleLogMock = vi.spyOn(console, 'log');
    manejoFunko.addFunko(funko);
    expect(consoleLogMock).toHaveBeenCalled();
  });

  it('no debe modificar un Funko si no existe', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const consoleLogMock = vi.spyOn(console, 'log');
    manejoFunko.modFunko(1, funko);
    expect(consoleLogMock).toHaveBeenCalled();
  });

  it('no debe eliminar un Funko si no existe', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const consoleLogMock = vi.spyOn(console, 'log');
    manejoFunko.eliminarFunko(1);
    expect(consoleLogMock).toHaveBeenCalled();
  });

  it('debe mostrar un Funko si existe', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(funko));
    manejoFunko.mostrarFunko(1);
    expect(mostrarInfoFunko).toHaveBeenCalledWith(funko);
  });

  it('no debe mostrar un Funko si no existe', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const consoleLogMock = vi.spyOn(console, 'log');
    manejoFunko.mostrarFunko(1);
    expect(consoleLogMock).toHaveBeenCalled();
  });
});
