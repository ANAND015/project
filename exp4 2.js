const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const PORT = 8000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;
    if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.end('File Not Found');
                return;
            }
            res.end(data);
        });
    } 
    else if (pathname === '/login' && req.method === 'GET') {
        const query = parsedUrl.query;
        const qs = querystring.parse(query);
        console.log(query)
        console.log(qs)
        const name = qs["username"];
        const email = qs["email"];
        console.log(name)
        console.log(email)
        res.write(`Hello ${name}, your email id ${email} has been registered successfully`);
        res.end();
    } else {
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
