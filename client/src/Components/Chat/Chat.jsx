import React from "react";
import { Link } from "react-router-dom";
import "./../Home/home.css";
import Message from "./../Message";
import "./chat.css";
import { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import Alert from "./../Alert";

const Chat = () => {
  const [socket, setSocket] = useState("");
  const [data, setData] = useState({name:'',room:''});
  const [messages,setMessages]=useState([]);
  const [messagesArray,setMessagesArray]= useState([]);
  useEffect(()=>{scrollToBottom()},[messages])
  useEffect(() => {
    
    //data from query string
    const parsed = queryString.parse(window.location.search);
    // console.log(parsed);
    setData(data=>({name:parsed.name,room:parsed.room}))
    //socket intialization
    const socket = io();
    //in development
    // const socket = io("http://localhost:5000")
    setSocket(socket);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.emit("join", { userName: parsed.name, room: parsed.room });
    //alert messages to be saved only on frontend
    socket.on("message", (message) => {
      setMessages(messages=>[...messages,<Alert msg={message} key={messages.lenth}/>])
    });
    //update messages when single message arrives
    socket.on("updateMessages",(data)=>{
      setMessagesArray((prev)=>[...prev,data]);
      setMessages(messages=>[...messages,<Message msg={data.text} user={data.name} key={messages.length} />]);  
    })
    //get all msgs for first render
    socket.on("getAllmsgs",(data)=>{ 
      setMessagesArray((prev)=>[...data]);
      data.map((msg)=>{
        setMessages(messages=>[...messages,<Message msg={msg.text} user={msg.name} key={messages.length} />]);
      })
    })

    return () => socket.disconnect();
  }, [setSocket]);

  const [showMsgs, setShowMsgs] = useState(true);
  //on enter key press
  const onEnter = (e) => {
    if (e.keyCode === 13) {
      sendMsgHandler(e);
    }
  };
  //send message handler
  const sendMsgHandler = (e) => {
    e.preventDefault();
    const msgInput = document.getElementById("msgInput");
    socket.emit('chatMessage',{text:msgInput.value,name:data.name,room:data.room});
    msgInput.value=""
  };
  //scroll to bottom 
  const scrollToBottom =()=>{
    const ele=document.getElementById("msgs");
    ele.scrollTop=ele.scrollHeight;
  }
  return (
    <div className="chat">
      {/* navbar */}
      <nav>
        <div className="home">
          <div className="nav">
            <Link to="/">
              <h3>
                <i className="fa-solid fa-comment tprimary px-1 "></i>
                ChitChat
              </h3>
            </Link>
            <Link to="/">
              <button
                className="btn btn-primary btnSecondary"
                onClick={() => {
                  console.log("user disconneted");
                }}>
                Leave
              </button>
            </Link>
          </div>
        </div>
      </nav>
      {/* chatContainer */}
      <div className="chatContainer flexc">
        <div className="chatBox">
          {/* nav for chatContainer */}
          <div className="headerTop p-1">
            <div>
              <h3 className="p-2 m-0">{data.room}</h3>
            </div>
            <div>
              <button
                id="mbtn"
                className={`btn btn-primary ${showMsgs ? "disabled" : null}`}
                onClick={() => {
                  setShowMsgs(true);
                }}>
                Messages
              </button>
              <button
                id="pbtn"
                className={`btn btn-primary btnSecondary m-2 ${
                  showMsgs ? null : "disabled"
                }`}
                onClick={() => {
                  setShowMsgs(false);
                }}>
                Participants
              </button>
            </div>
          </div>
          {showMsgs ? (
            <div className="messagesArea">
              {/* Messages box */}
              <div className="msgs" id="msgs">
                {/* messages means only notifications */}
                {messages}
              
              </div>
              <div className="sendMsgForm">
                {/* form */}
                <form className="d-flex">
                  <input
                    type="text"
                    className="form form-control d-inline"
                    name="Message"
                    id="msgInput"
                    placeholder="Enter Your Message"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      onEnter(e);
                    }}
                  />
                  <button
                    type="submit"
                    className="btn"
                    onClick={(e) => {
                      sendMsgHandler(e);
                    }}>
                    <i className="fa-solid fa-paper-plane "></i>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="participants"> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
