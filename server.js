var fs = require('fs');
var path = require('path');
const net = require('net')

// Fancy header
var readStream = fs.createReadStream(path.join(__dirname, 'cnsp.txt'), 'utf8');
let data = ''
readStream.on('data', function(chunk) {
    data += chunk;
}).on('data', function() {
    console.log('\x1b[32m', data);
});

let clients = []

// Start the server
const server = net.createServer(socket => {
  console.log('Client connected')
  let client_id = clients.length
  clients.push({
    active: true,
    socket
  })

  socket.on('end', () => {
    clients[client_id].active = false
  })

  socket.on('data', chunk => {
    clients
      .filter((x, i) => x.active && i !== client_id)
      .map(client => client.socket.write(chunk))
  })
}).on('error', () => null)

server.listen(3000, () => {
  console.log(`Server started on port `, server.address().port)
})