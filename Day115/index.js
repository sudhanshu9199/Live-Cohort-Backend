const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Heelo with server heelo!')
}); // Creates an HTTP server instance

server.listen(3000, () => { // Server starts listening on port 3000
    console.log('Server is running on port 3000');
    
})