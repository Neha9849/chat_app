const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors= require('cors');
require("dotenv").config();
const messages = require('./models/messages')

const app = express();
const httpServer = createServer(app);
const PORT = 5000;
//connect db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

//middlewares
app.use(cors());

//socket intialization
const io= new Server(httpServer,{
  cors:{
    orgin:"*",
    methods:["GET", "POST"]
  }
});
app.use(express.json());
app.use(express.urlencoded({ extented:false }));
let roomValue;
io.on('connection',(socket)=>{
  console.log('new connection made');
  //when user joins
  socket.on('join',(data)=>{
    const {userName,room} = data;
    roomValue=room;
    socket.emit("message",`welcome ${userName}!`)
    socket.broadcast.to(room).emit("message",`${userName} has joined the chat`)
    socket.join(room);
    //get all msgs from db
    messages.find({room},(err,data)=>{
      if(err) return console.log(err);
      socket.emit("getAllmsgs",data);

    })
    
    // io.to(room).emit("users-data",{ 
    //   room:room,
    //   users:io.getAllUsers(room),
    // })
    socket.on("disconnect",(reason)=>{
      io.to(room).emit("message",`${userName} has left`)
      console.log(`disconnected`)
    })
  })
  //save message in db
  socket.on('chatMessage',(data)=>{
    console.log(data);
    var message=new messages(data);
    message.save((err,message)=>{
      if(err) return console.log(err);
    
        if(err) return console.log(err);
        io.to(roomValue).emit("updateMessages",message);
    })
   

    

  })
 
 
})

//assign socket object to every req
app.use((req,res,next)=>{
  req.io=io;
  next()
})

//run server
httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
