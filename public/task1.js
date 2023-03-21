const http = require('node:http')
const fs = require('node:fs')
const showList = require('./showlist');

const server = http.createServer(
    function handle(req, res) {
        console.log(req.url)
            
       switch (req.url) {

            case '/':
                const f = fs.readFileSync('./display.html', 'utf-8')
                res.end(f.replace('{{listahan}}',showList()))
                break;
            case '/showlist.js':
                const f2 = fs.readFileSync('./showlist.js')
                res.end(f2)
                break;
            case '/favicon.ico':
                const f3 = fs.readFileSync('./darock.jpg')
                res.end(f3)
                break;
        }
    }
)


/*const dis =fs.readFile('./list.txt', 'utf-8', (error1, data1) => {
    console.log(data1);
    res.end(data1)
})*/


server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running.')
})