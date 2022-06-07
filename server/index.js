const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors= require('cors');
//load config
require("dotenv").config();

//passport config
require("./passport")(passport);

const app = express();
const httpServer = createServer(app);
const PORT = 3000;

//middlewares
app.use(cors());
app.use(session({
  secret:'mimi',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI
  })
}
));
app.use(passport.initialize());
app.use(passport.session())

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

//socket intialization
const io= new Server(httpServer,{
  cors:{
    orgin:"*",
    methods:["GET", "POST"]
  }
});
app.use(express.json());
app.use(express.urlencoded({ extented:false }));
io.on('connection',(socket)=>{
  console.log('new connection made');
  //when user joins
  socket.on('join',(data)=>{
    const {userName,room} = data;
    socket.emit("message",`welcome ${userName}`)
    socket.broadcast.to(room).emit("message",`${userName} has joined the chat`)
    socket.join(room);
    // io.to(room).emit("users-data",{ 
    //   room:room,
    //   users:io.getAllUsers(room),
    // })
    socket.on("disconnect",(reason)=>{
      io.to(room).emit("message",`${userName} has left`)
      console.log(`disconnected`)
    })
  })
 
})
//assign socket object to every req
app.use((req,res,next)=>{
  req.io=io;
  next()
})
//routes
app.use("/auth",require("./routes/auth"))
//run server
httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
