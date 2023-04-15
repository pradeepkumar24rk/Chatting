const express = require('express');
const app= express();
const http= require('http');
const { Server}=require('socket.io')
const cors=require('cors');
const { log } = require('console');
app.use(cors);


const server=http.createServer(app);

const io=new Server(server,{                    //creating the server in socket
    cors: {                                     //it helps to solve the error in connection and operation.
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{                  //io.on 'connection'--> event   is when the user using the this website it create one id ...for every connection
    console.log(socket.id);

    socket.on("disconnect",()=>{                //socket.on 'disconnect' --> event   is delete the id. when the website close.      
        console.log("user Disconnected",socket.id);
    });
})

server.listen(3001,()=>{
    console.log("server running.....")
})
