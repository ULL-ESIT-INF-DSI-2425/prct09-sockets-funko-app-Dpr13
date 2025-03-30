import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ManejoFunko } from '../servidor/ManejoFunko.js';
import { Funko } from '../models/Funko.js';
import { RequestType } from '../models/Request.js';
import { FunkoCliente } from './Cliente.js';

const cliente = new FunkoCliente('localhost', 60300);

const argv = yargs(hideBin(process.argv))
  .command('añadir', 'Añadir un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    nombre: { type: 'string', demandOption: true },
    descripcion: { type: 'string', demandOption: true },
    tipo: { type: 'string', demandOption: true },
    genero: { type: 'string', demandOption: true },
    franquicia: { type: 'string', demandOption: true },
    numero: { type: 'number', demandOption: true },
    exclusivo: { type: 'boolean', demandOption: true },
    caracteristicas: { type: 'string', demandOption: true },
    valorMercado: { type: 'number', demandOption: true }
  }, (args) => {
    const funko: Funko = {
      id: args.id,
      nombre: args.nombre,
      descripcion: args.descripcion,
      tipo: args.tipo,
      genero: args.genero,
      franquicia: args.franquicia,
      numero: args.numero,
      exclusivo: args.exclusivo,
      caracteristicas: args.caracteristicas,
      valorMercado: args.valorMercado
    };
    const manager: RequestType = {
      type: 'add',
      usuario: args.usuario,
      funko: funko
    };
    cliente.sendRequest(manager);
  })
  .command('listar', 'Listar Funkos', {
    usuario: { type: 'string', demandOption: true }
  }, (args) => {
    const manager: RequestType = {
      type: 'list',
      usuario: args.usuario
    };
    cliente.sendRequest(manager);
  })
  .command('modificar', 'Modificar un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    nombre: { type: 'string', demandOption: true },
    descripcion: { type: 'string', demandOption: true },
    tipo: { type: 'string', demandOption: true },
    genero: { type: 'string', demandOption: true },
    franquicia: { type: 'string', demandOption: true },
    numero: { type: 'number', demandOption: true },
    exclusivo: { type: 'boolean', demandOption: true },
    caracteristicas: { type: 'string', demandOption: true },
    valorMercado: { type: 'number', demandOption: true }
  }, (args) => {
    const funko: Funko = {
      id: args.id,
      nombre: args.nombre,
      descripcion: args.descripcion,
      tipo: args.tipo,
      genero: args.genero,
      franquicia: args.franquicia,
      numero: args.numero,
      exclusivo: args.exclusivo,
      caracteristicas: args.caracteristicas,
      valorMercado: args.valorMercado
    };
    const manager: RequestType = {
      type: 'update',
      usuario: args.usuario,
      funko: funko
    };
    cliente.sendRequest(manager);
  })
  .command('eliminar', 'Eliminar un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
  }, (args) => {
    const manager: RequestType = {
      type: 'remove',
      usuario: args.usuario,
      id: args.id
    };
    cliente.sendRequest(manager);
  })
  .command('mostrar', 'Mostrar un Funko', {
    usuario: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
  }, (args) => {
    const manager: RequestType = {
      type: 'read',
      usuario: args.usuario,
      id: args.id
    };
    cliente.sendRequest(manager);
  })
  .help()
  .argv;
