var http = require('http');
var dt = require('./no1_module');

http.createServer(function (req,res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('show date : ' + dt.myDateTime());
    res.end();
}).listen(8080);