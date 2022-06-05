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
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extented:false }));
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
app.use(cors({
  orgin:'*'
}))
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
const io= new Server(httpServer);
//middlewares for socket
// io.use((socket,next)=>{
//   console.log(socket.id);
//   next();
// })
io.on('connection',(socket)=>{
  console.log('new connection made');
  console.log(socket.rooms);
  socket.join("room1");
  console.log(socket.rooms);
  socket.on("disconnect",(reason)=>{
    console.log(`disconnected- ${reason}`)
  })
})
//routes
app.use("/auth",require("./routes/auth"))
//run server
httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
