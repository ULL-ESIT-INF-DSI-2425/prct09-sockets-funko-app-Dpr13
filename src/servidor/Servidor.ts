import * as net from 'net';
import { RequestType, ResponseType } from '../models/Request.js';
import { ManejoFunko } from './ManejoFunko.js';
import chalk from 'chalk';

const server = net.createServer((socket) => {
  console.log(chalk.green('Cliente conectado'));
  /**
   * Escucha los datos enviados por el cliente.
   */
  socket.on('data', (data) => {
    const request: RequestType = JSON.parse(data.toString());
    const manager = new ManejoFunko(request.usuario);
    let response: ResponseType;

    switch (request.type) {
      case 'add':
        manager.addFunko(request.funko!);
        response = { type: 'add', success: true, message: 'Funko añadido' };
        break;
      case 'remove':
        manager.eliminarFunko(request.id!);
        response = { type: 'remove', success: true, message: 'Funko eliminado' };
        break;
      case 'read':
        const funko = manager.mostrarFunko(request.id!);
        response = funko
          ? { type: 'read', success: true, message: 'Funko encontrado', funkoPops: [funko] }
          : { type: 'read', success: false, message: 'Funko no encontrado' };
        break;
      case 'list':
        response = { type: 'list', success: true, message: 'Lista de Funkos', funkoPops: manager.listFunkos() };
        break;
      default:
        response = { type: request.type, success: false, message: 'Operación no válida' };
    }
    socket.write(JSON.stringify(response), () => {
      console.log(chalk.yellow('Respuesta enviada al cliente'));
      // socket.end();
    });
  });
  /**
   * Maneja el cierre de la conexión.
   */
  socket.on('end', () => {
    console.log(chalk.green('Cliente desconectado'));
  });
  /**
   * Maneja los errores de la conexión.
   */
  socket.on('error', (err) => {
    console.error(chalk.red('Error en el servidor:', err.message));
  });
});
/**
 * Maneja el cierre del servidor.
 */
server.listen(60300, () => {
  console.log(chalk.bold('Servidor escuchando en el puerto 60300'));
});
