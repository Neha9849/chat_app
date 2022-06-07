import React from 'react';
import {BrowserRouter,Link,Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';
import {io} from 'socket.io-client';
import {useEffect,useState} from 'react';
function App() {
  const [socket,setSocket]= useState("");
   useEffect(()=>{
   const socket= io('http://localhost:3000');
   setSocket(socket);
    socket.on('connect',()=>{
      console.log(socket.id)
    })
    socket.emit('join',{userName:'neha',room:'my'})
    socket.on("message",message=>{
      console.log(message)
    })
    return () => socket.disconnect();
    
   },[setSocket]);

  return ( 
    <>
    <BrowserRouter >
    <Routes >
    <Route path = "/" exact element = { <Home/>} />
    <Route path = "/join" element = {<Join/>} />
    <Route path = "/chat" element = {<Chat/>} />
    </Routes> 
    </BrowserRouter> 
    </>

  )
}

export default App