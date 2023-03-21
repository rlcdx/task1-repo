const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer(
    function handle(req, res) {
        console.log(req.url)
            
       switch (req.url) {

            case '/':
                console.log('Homepage')
                const f = fs.readFileSync('./public/display.html')
                res.end(f)
                break;
            case '/public/showlist.js':
                const f2 = fs.readFileSync('./public/showlist.js')
                res.end(f2)
                break;
            case '/favicon.ico':
                const f3 = fs.readFileSync('./public/darock.jpg')
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