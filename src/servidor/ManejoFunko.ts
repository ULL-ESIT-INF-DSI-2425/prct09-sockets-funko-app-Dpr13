import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Funko } from '../models/Funko.js';
import chalk from 'chalk';
import { mostrarInfoFunko } from '../utils/chalkUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Clase para manejar Funkos.
 */
export class ManejoFunko {
  private directorio: string;
  /**
   * Constructor de la clase.
   * @param usuario - Nombre del usuario
   */
  constructor(private usuario: string) {
    this.directorio = path.join(__dirname, '../../data', usuario);
    if (!fs.existsSync(this.directorio)) {
      fs.mkdirSync(this.directorio, { recursive: true });
    }
  }
  /**
   * Función para obtener la ruta de un Funko.
   * @param id - Identificador del Funko
   * @returns Ruta del Funko
   */
  private getRutaFunko(id: number): string {
    return path.join(this.directorio, `${id}.json`);
  }
  /**
   * Función para añadir un Funko.
   * @param funko - Funko a añadir
   * @returns void
   */
  addFunko(funko: Funko): void {
    try {
      const ruta = this.getRutaFunko(funko.id);
      if (fs.existsSync(ruta)) {
        console.log(chalk.red(`Ya existe un funko con ID ${funko.id}.`));
        return;
      }
      fs.writeFileSync(ruta, JSON.stringify(funko, null, 2));
      console.log(chalk.green(`Se ha agregado un funko con éxito.`));
    } 
    catch (error) {
      console.error(chalk.red(`Error al agregar Funko: ${error}`));
    }
  }
  /**
   * Función para listar Funkos.
   * @returns void
   */
  listFunkos(): Funko[] {
    try {
      if (!fs.existsSync(this.directorio)) {
        console.log(chalk.yellow(`No existen Funkos en la colección de ${this.usuario}.`));
        return [];
      }
      const archivos = fs.readdirSync(this.directorio).filter((archivo) => archivo.endsWith('.json'));
      if (archivos.length === 0) {
        console.log(chalk.yellow(`No hay Funkos en la colección.`));
        return [];
      }
      const funkos: Funko[] = archivos.map((archivo) => {
        const contenido = fs.readFileSync(path.join(this.directorio, archivo), 'utf8');
        return JSON.parse(contenido) as Funko;
      });
      funkos.forEach((funko) => mostrarInfoFunko(funko));
      return funkos;
    } catch (error) {
      console.error(chalk.red(`Error al listar Funkos: ${error}`));
      return [];
    }
  }
  /**
   * Función para modificar un Funko.
   * @param id - Identificador del Funko
   * @param funko Funko a modificar
   * @returns void
   */
  modFunko(id: number, funko: Funko): void {
    try {
      const ruta = this.getRutaFunko(id);
      if (!fs.existsSync(ruta)) {
        console.log(chalk.red(`No existe el funko con ID ${id}`));
        return;
      }
      fs.writeFileSync(ruta, JSON.stringify(funko, null, 2));
      console.log(chalk.green(`El funko ha sido modificado con éxito.`));
    } 
    catch (error) {
      console.error(chalk.red(`Error al modificar Funko: ${error}`));
    }
  }
  /**
   * Función para eliminar un Funko.
   * @param id - Identificador del Funko
   * @returns void
   */
  eliminarFunko(id: number): void {
    try {
      const ruta = this.getRutaFunko(id);
      if (!fs.existsSync(ruta)) {
        console.log(chalk.red(`No existe el funko con ID ${id} no existe.`));
        return;
      }
      fs.unlinkSync(ruta);
      console.log(chalk.green(`EL funko ha sido eliminado con éxito.`));
    } 
    catch (error) {
      console.error(chalk.red(`Error al eliminar Funko: ${error}`));
    }
  }
  /**
   * Función para mostrar un Funko.
   * @param id - Identificador del Funko
   * @returns void
   */
  mostrarFunko(id: number): Funko | null {
    try {
      const ruta = this.getRutaFunko(id);
      if (!fs.existsSync(ruta)) {
        console.log(chalk.red(`No existe el funko con ID ${id}.`));
        return null;
      }
      const contenido = fs.readFileSync(ruta, 'utf8');
      const funko: Funko = JSON.parse(contenido);
      mostrarInfoFunko(funko);
      return funko;
    }
    catch (error) {
      console.error(chalk.red(`Error al mostrar Funko: ${error}`));
      return null;
    }
  }
}
