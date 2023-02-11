// Create your node.js server file index.js and add the code needed to serve the right page according to the url.

//     localhost:8080 should take users to index.html
//     localhost:8080/about should take users to about.html
//     localhost:8080/contact-me should take users to contact-me.html
//     404.html should display any time the user tries to go to a page not listed above.

const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080

const server = http.createServer(function(req, res) {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname + ".html"
    if (filename == './.html') {
        filename = './index.html'
    }    
    res.statusCode = 200;
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(filename, 'utf8', function(error, data) {
        if (error) {
            fs.readFile('./404.html', 'utf8', (a,b) => {
                res.write(b);
                res.end();
            });
        } else {
            res.write(data);
            res.end();
        }
        
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})