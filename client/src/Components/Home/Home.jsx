import React from "react";
import "./home.css";
import img from "./../../images/des.png";
import des2 from "./../../images/des2.png";
const Home = () => {
  return (
    <>
    <div className="home">
      <nav>
        <div className="nav">
          <h3 className="px-5">ChitChat</h3>
          <button className="btn btn-primary btnSecondary mx-5">Join a Room</button>
        </div>
      </nav>
      <div className="landing">
        <div className="left">
          <div>
          <h1 className="first">Have your </h1>
          <span className="second">Best Chat</span>
         <br />
         <p className="pt-3">Fast, easy & unlimited team chat experience <br/> you'll ever had.</p> 
         <div className="btns py-3">
            <button className="btn btn-primary">Join Now</button>

            <button className="mx-5 btn btn-primary btnSecondary">Register</button>
          </div>
          </div>
        </div>
        <div className="right">
          <img src={img} alt="illustration" className="img-fluid" />
        </div>
      </div>
      <div className="middle">
              <h1 className="w-100 text-center middleHeading
              p-5">Connect with your team</h1>
              <p className="w-100 text-center tsecondary">chitchat is a messaging app which connects like-minded people in an easy and comfortable way</p>
      </div>
      <div class="about">
        <div className="Aleft">
        <img src={des2} alt="illustration" className="img-fluid " />
        </div>
        <div className="Aright">
          <div>
          <h1><span className="tprimary">Easy</span> and <span className="tprimary">effortless</span></h1>
          <h1>way to connect with</h1>
          <h1>your team</h1>
          <p className="tsecondary">
            with chitchat, you can easily connect <br/> with your team in different fields.< br/> you can create and join as many rooms as you want.
          </p>
          </div>
         
        </div>
     
    </div>
    </div>
    
    </>
  );
};

export default Home;
