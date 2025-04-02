import * as net from 'net';
import {spawn} from 'child_process';

const server = net.createServer((socket) => {
  console.log('Cliente conectado');
  
  socket.on('data', (data) => {
    let comando = data.toString().split(',');
    console.log(`Comando a ejecutar recibido: ${comando}`);
    const accion = comando[0];
    comando = comando.slice(1);
    console.log(accion);
    console.log(comando);
    try {
      const child = spawn(accion, comando);
      let salida = '';
      child.stdout.on('data', (piece) => salida += piece);
      child.stderr.on('data', (datos: string) => {
        socket.write(`Error: ${datos}`);
      });
      child.on('close', (code: number) => {
        socket.write(`Salida: \n${salida}\nProceso terminado con código ${code}\n`);
      });
      child.on('error', (err) => {
        socket.write(`Error al ejecutar el comando: ${err.message}\n`);
      });
    } 
    catch (err) {
      socket.write(`No se ha podido ejecutar el comando: Error: ${err}`);
    }
  });
  
  socket.on('end', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(60300, () => {
  console.log('Servidor TCP en el puerto 60300');
});
