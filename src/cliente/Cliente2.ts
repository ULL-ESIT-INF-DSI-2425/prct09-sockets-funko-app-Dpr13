import * as net from 'net';
import * as readline from 'readline';

const username = process.argv[2];
if (!username) {
  console.error('Por favor, proporciona un nombre de usuario: node client.js <nombre>');
  process.exit(1);
}

const client = net.createConnection({ port: 60300 }, () => {
  console.log(`Conectado como ${username}. Escribe un mensaje:`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const message = `${username}: ${input}`;
  client.write(message + '\n');
});

client.on('data', (data) => {
  console.log(`${data.toString()}`);
});

client.on('end', () => {
  console.log('Conexión cerrada');
  process.exit(0);
});
