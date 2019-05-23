/*
* 这个文件跟这次的目的关系不大，只是测试nodejs是不是正常的。
* */

var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8888);
console.log("nodejs start listen 8888 port!");