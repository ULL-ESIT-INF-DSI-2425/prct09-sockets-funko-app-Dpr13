import * as net from 'net';
import chalk from 'chalk';

const args = process.argv.slice(2);

const client = net.createConnection({ port: 60300 }, () => {
  console.log(`Cliente conectado`);
  client.write(args.toString());
});

let comando = '';
client.on('data', (dataChunk) => {
  comando += dataChunk;
  console.log(comando);
  client.end();
});

client.on('error', (err) => {
  console.error(chalk.red('Error en el cliente:'), err.message);
});

client.on('end', () => {
  console.log(chalk.red('Conexión cerrada'));
});
