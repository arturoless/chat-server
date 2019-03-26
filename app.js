var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const os = require('os')
var interfaces = os.networkInterfaces()
var wifi = interfaces['eth0']
if(wifi==null){
    wifi = interfaces['Wi-Fi']
    var ipv4 = wifi[1]
}
else{
    var ipv4 = wifi[0]
}
var PORT = process.env.PORT || 3000;
var HOST = ipv4['address']
io.on('connection',function(socket){
    socket.on('chat1',function(mensaje){
        socket.broadcast.emit('chat2',mensaje);  
    });
    socket.on('chat2',function(mensaje){
        socket.broadcast.emit('chat1',mensaje);  
    });
 
});
 
http.listen(PORT,function(){
console.log(HOST+':'+PORT)
});