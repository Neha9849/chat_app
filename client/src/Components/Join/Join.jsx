import React from "react";
import "./join.css";
import { Link } from "react-router-dom";
import "./../Home/home.css";
import { useState } from "react";
const Join = () => {
  const [room,setRoom]=useState("");
  const [userName,setName]=useState("")
  return (
    <div className="join">
      <nav>
        <div className="home">
          <div className="nav">
            <Link to="/">
              <h3 className="px-5">
                <i className="fa-solid fa-comment tprimary px-2"></i>
                ChitChat
              </h3>
            </Link>
            <Link to="/join">
              <button className="btn btn-primary btnSecondary mx-5">
                Explore Rooms
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="joinContainer flexc">
        <div className="joinBox flexc">
          <div className="container p-3">
            <h1 className="text-center"><span className="tprimary">Join</span> a Room</h1>
            <form action="chat" className="form p-4">
              <input type="text" className="form-control my-3" placeholder="Enter Username" value={userName} onChange={(e)=>setName(e.target.value)} name="name" autocomplete="off" autoFocus/>
              <input type="text" className="form-control my-3" placeholder="Enter Room Name" value={room} onChange={(e)=>setRoom(e.target.value)} name="room" autocomplete="off" />
              <div className="flexc">
              <button type="submit" className="btn btn-primary  w-100">Join</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
