import React from "react";
import "./home.css";
import img from "./../../images/des.png";
import des2 from "./../../images/des2.png";
import { Link } from "react-router-dom";
const Home = () => {
  window.onscroll = function () {
    scrollNavEffect();
  };
  const scrollNavEffect = () => {
    const nav = document.querySelector(".nav");
    if (window.pageYOffset > 200) {
      nav.style.backgroundColor = "var(--secondary)";
    }
    if (window.pageYOffset < 200) {
      nav.style.backgroundColor = "transparent";
    }
  };
  return (
    <>
      <div className="home">
        <nav>
          <div className="nav">
            <Link to="/">
              <h3 className="px-5">
                <i className="fa-solid fa-comment tprimary px-2"></i>
                ChitChat
              </h3>
            </Link>
            <Link to="/join">
              <button className="btn btn-primary btnSecondary">
                Join a Room
              </button>
            </Link>
          </div>
        </nav>
        <div className="landing">
          <div className="left">
            <div>
              <h1 className="first">Have your </h1>
              <span className="second">Best Chat</span>
              <br />
              <p className="pt-3">
                Fast, easy & unlimited team chat experience <br /> you'll ever
                had.
              </p>
              <div className="btns py-3">
                <Link to="/join">
                  <button className="btn btn-primary">Join Now</button>
                </Link>
                <Link to="/register">
                  <button className="mx-5 btn btn-primary btnSecondary" id="register">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="right">
            <img src={img} alt="illustration" className="img-fluid" />
          </div>
        </div>
        <div className="about">
          <div className="Aleft">
            <img src={des2} alt="illustration" className="img-fluid " />
          </div>
          <div className="Aright">
            <div>
              <h1>
                <span className="tprimary">Easy</span> and{" "}
                <span className="tprimary">effortless</span>
              </h1>
              <h1>way to connect with</h1>
              <h1>your team</h1>
              <p className="tsecondary">
                with chitchat, you can easily connect <br /> with your team in
                different fields.
                <br /> you can create and join as many rooms as you want.
              </p>
            </div>
          </div>
        </div>
        <div className="middleInner p-2">
          <div className="content p-5">
            <h1
              className="w-100 text-center middleHeading
              pb-5 ">
              <span className="tprimary">Connect </span>
              with your team
            </h1>
            <p className="w-100 text-center tsecondary">
              ChitChat is a messaging app which connects like-minded people in
              an easy and comfortable way
            </p>
            <p className="w-100 text-center tsecondary">
              Explore the various Rooms and join the one which suits you.
            </p>
            <div className="w-100 d-flex justify-content-center">
              <button className="btn btn-primary text-center btnSecondary m-3">
                Explore Rooms
              </button>
            </div>
          </div>
        </div>
        <div className="footer-dark p-3">
          <footer>
            <div className="container d-flex justify-content-between">
              <p className="copyright  text-center m-0">ChitChat © 2022</p>
              <a href="/">
                <i className="fa-brands fa-github gh"></i>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
