// Load required packages
var fs = require('fs');
var path = require('path');
const net = require('net')
  , rl = require('readline')
let readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Fancy header
var readStream = fs.createReadStream(path.join(__dirname, 'cnsp.txt'), 'utf8');
let data = ''
readStream.on('data', function(chunk) {
    data += chunk;
}).on('data', function() {
    console.log('\x1b[32m', data);
});

// Connect to the server
// Change IP and port as per the server
let client = net.createConnection(3000, '127.0.0.1', () => {
  console.log('Connected to server')
  console.log('Please enter your name =>')
  process.stdout.write('> ')
  let name = null
  readline.on('line', line => {
    process.stdout.write('> ')
    line = line.trim()
    if(!name){
      name = line
      client.write(name.toString() + ' joined the chat!')
      return
    }
    client.write(name.toString() + ': ')
    client.write(line)
  })
  client.on('data', (chunk) => {
    process.stdout.write(chunk)
    console.log('')
  })
})
