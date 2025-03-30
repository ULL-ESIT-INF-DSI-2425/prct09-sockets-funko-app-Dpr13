import * as net from 'net';
import { RequestType, ResponseType } from '../models/Request.js';
import chalk from 'chalk';

export class FunkoCliente {
  constructor(private host: string, private port: number) {}

  sendRequest(request: RequestType) {
    const client = net.createConnection({ host: this.host, port: this.port }, () => {
      console.log(chalk.green('Conectado al servidor'));
      client.write(JSON.stringify(request) + '\n'); // Enviar la petición como JSON
    });

    client.on('data', (data) => {
      const response: ResponseType = JSON.parse(data.toString());
      console.log(chalk.yellow('Respuesta del servidor:'), response);
      client.end(); // Cerrar conexión después de recibir la respuesta
    });

    client.on('error', (err) => {
      console.error(chalk.red('Error en el cliente:'), err.message);
    });

    client.on('end', () => {
      console.log(chalk.red('Conexión cerrada'));
    });
  }
}
