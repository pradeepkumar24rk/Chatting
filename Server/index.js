const express = require('express');
const app= express();
const http= require('http');
const { Server}=require('socket.io')
const cors=require('cors');
app.use(cors);


const server=http.createServer(app);

const io=new Server(server,{                    //creating the server in socket
    cors: {                                     //it helps to solve the error in connection and operation.
        origin:'https://teamchat24rk.netlify.app/',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{                  //io.on 'connection'--> event   is when the user using the this website it create one id ...for every connection

    //Chatting socket...

    console.log(`UserId : ${socket.id}`);

    socket.on('join_room',(data)=>{                    //socket.on -->listener  , 'join_room' --> event  ,function --> call back like event handler
        socket.join(data);
        console.log(`UserId ${socket.id} joined room :${data}`);
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data);   //this emit is used to send the data to who are in the room
    })

    socket.on("disconnect",()=>{                //socket.on 'disconnect' --> event   is delete the id. when the website close.      
        console.log("user Disconnected",socket.id);
        socket.broadcast.emit("callEnded")
    });

    //Video call..
    socket.emit("me",socket.id);
    socket.on("callUser",({userToCall,signalData,from,name})=>{
        io.to(userToCall).emit("callUser",{signal:signalData,from,name});
    })

    socket.on("answercall",data=>{
        io.to(data.to).emit("callAccepted",data.signal);
    })
})

server.listen(3001,()=>{
    console.log("server running.....")
})
