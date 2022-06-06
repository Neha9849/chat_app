import React from 'react';
import {BrowserRouter,Link,Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';
import {io} from 'socket.io-client';
function App() {
  const socket= io('http://localhost:3000');
  socket.on('connect',()=>{
    console.log(`Connected on client id:${socket.id}`);
    console.log('backend connected');
  
  })
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