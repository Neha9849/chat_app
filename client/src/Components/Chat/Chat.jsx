import React from "react";
import { Link } from "react-router-dom";
import "./../Home/home.css";
import "./chat.css"
const Chat = () => {
  return (
    <div className="chat">
      <nav>
        <div className="home">
          <div className="nav">
            <Link to="/">
              <h3 className="px-5">
                <i className="fa-solid fa-comment tprimary px-2"></i>
                ChitChat
              </h3>
            </Link>
            <Link to="/">
              <button className="btn btn-primary btnSecondary mx-5" onClick={()=>{console.log('user disconneted')}}>
                Leave
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="chatContainer flexc">

      </div>
    </div>
  );
};

export default Chat;
