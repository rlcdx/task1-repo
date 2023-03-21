const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer(
    function handle(req, res) {
            
        switch (req.url) {
            case '/':
                console.log('Homepage')
                const f = fs.readFileSync('./task1-repo/display.html')
                res.end(f)
                break;
            case '/showlist.js':
                console.log('showlist requested')
                const f2 = fs.readFileSync('./task1-repo/showlist.js')
                res.end(f2)
                break;
        }
    })


/*const dis =fs.readFile('./list.txt', 'utf-8', (error1, data1) => {
    console.log(data1);
    res.end(data1)
})*/


server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running.')
})