const http = require('node:http')
//const fs = require('node:fs')

const server = http.createServer(
    function handle(req, res) {
        res.end('muzta')
    }
)


server.listen(8000, '127.0.0.1')