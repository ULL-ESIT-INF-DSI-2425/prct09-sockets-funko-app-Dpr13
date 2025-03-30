import chalk from 'chalk';
import { Funko } from '../models/Funko.js';

/**
 * Muestra la información de un Funko en consola.
 * @param funko - Funko a mostrar
 */
export function mostrarInfoFunko(funko: Funko): void {
  let colorValor = chalk.white;
  if (funko.valorMercado > 100) colorValor = chalk.green;
  else if (funko.valorMercado > 50) colorValor = chalk.yellow;
  else if (funko.valorMercado > 20) colorValor = chalk.blue;
  else colorValor = chalk.red;

  console.log(chalk.bold(`ID: ${funko.id}`));
  console.log(`Nombre: ${funko.nombre}`);
  console.log(`Descripción: ${funko.descripcion}`);
  console.log(`Tipo: ${funko.tipo}`);
  console.log(`Género: ${funko.genero}`);
  console.log(`Franquicia: ${funko.franquicia}`);
  console.log(`Número: ${funko.numero}`);
  console.log(`Exclusivo: ${funko.exclusivo ? 'Sí' : 'No'}`);
  console.log(`Características: ${funko.caracteristicas}`);
  console.log(`Valor de mercado: ${colorValor(`$${funko.valorMercado}`)}`);
  console.log('-----------------------------------');
}  