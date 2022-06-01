import React from 'react';
import {BrowserRouter,Link,Routes,Route} from 'react-router-dom'
import Home from './Components/Home/Home';
import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join'
function App() {
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