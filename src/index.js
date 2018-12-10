const express = require('express')
const app = express()

const bodyparser = require('body-parser')
const router = require('./server/api/router')
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

app.use(express.static(__dirname + './dist/FoodOrder'));

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+'./dist/FoodOrder/index.html'));
});

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});    
    });
})