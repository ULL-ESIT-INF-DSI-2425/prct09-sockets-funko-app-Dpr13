import * as net from 'net';

const clients: net.Socket[] = [];

const server = net.createServer((socket) => {
  console.log('Cliente conectado');
  clients.push(socket);
  
  socket.on('data', (data) => {
    const message = data.toString();
    console.log(`Mensaje recibido: ${message}`);
    
    // Reenviar mensaje a todos los clientes conectados
    clients.forEach(client => {
      if (client !== socket) {
        client.write(message + '\n');
      }
    });
  });
  
  socket.on('end', () => {
    console.log('Cliente desconectado');
    clients.splice(clients.indexOf(socket), 1);
  });
});

server.listen(60300, () => {
  console.log('Servidor TCP en el puerto 8080');
});
