const express = require('express')
const app = express()
var path = require("path");

const bodyparser = require('body-parser')
const router = require('./src/server/api/router')
const methodOverride = require('method-override');

var server= require('http').createServer(app);
var io = require('socket.io').listen(server);


const morgan = require('morgan')
app.use(bodyparser.json())
app.use(methodOverride('_method'));
app.use(morgan('dev'))

app.use(router);



//app.listen(1234,()=>console.log('Server started :)'))
server.listen(process.env.PORT||1234);
console.log('server running...');

app.use(express.static(__dirname + '/dist/FoodOrder'));

app.use('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/FoodOrder/index.html'));
});

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('socket connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('orderDetails', (message) => {
        console.log("Order Received: " + message);
        io.emit('orderDetails', {text: message});    
    });
})