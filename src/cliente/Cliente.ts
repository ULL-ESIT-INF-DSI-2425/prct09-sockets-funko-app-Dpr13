import * as net from 'net';
import { RequestType, ResponseType } from '../models/Request.js';
import chalk from 'chalk';

/**
 * Clase FunkoCliente para manejar la conexión con el servidor Funko.
 * Permite enviar peticiones al servidor y recibir respuestas.
 */
export class FunkoCliente {
  constructor(private host: string, private port: number) {}

  sendRequest(request: RequestType) {
    /**
     * Crea una conexión TCP con el servidor Funko.
     */
    const client = net.createConnection({ host: this.host, port: this.port }, () => {
      console.log(chalk.green('Conectado al servidor'));
      client.write(JSON.stringify(request) + '\n');
    });
    /**
     * Escucha los datos enviados por el servidor.
     */
    client.on('data', (data) => {
      const response: ResponseType = JSON.parse(data.toString());
      console.log(chalk.yellow('Respuesta del servidor:'), response);
      client.end(); 
    });
    /**
     * Maneja los errores de la conexión.
     */
    client.on('error', (err) => {
      console.error(chalk.red('Error en el cliente:'), err.message);
    });
    /**
     * Maneja el cierre de la conexión.
     */
    client.on('end', () => {
      console.log(chalk.red('Conexión cerrada'));
    });
  }
}
