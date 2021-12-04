import React, { useRef, useState } from "react";
import "./landing.css";
import MountainsFront from "../../images/mountains_front.png";
import MountainsBack from "../../images/mountains_back.png";
import ForestFront from "../../images/forest_front.png";
import ForestMid from "../../images/forest_mid.png";
import ForestBack from "../../images/forest_back.png";
import Beach from "../../images/beach.png";
import BirdL from "../../images/bird_l.png";
import BirdR from "../../images/bird_r.png";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

function Landing(props) {
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const wave1 = useRef();
  const wave2 = useRef();
  const wave3 = useRef();
  const wave4 = useRef();
  const mountainsF = useRef();
  const mountainsB = useRef();
  const forestF = useRef();
  const forestM = useRef();
  const forestB = useRef();
  const birdL = useRef();
  const birdR = useRef();
  const landingText = useRef();
  const authBtn = useRef();

  window.addEventListener("scroll", () => {
    let val = window.scrollY;
    wave1.current.style.backgroundPositionX = 400 + val * 2 + "px";
    wave2.current.style.backgroundPositionX = 200 + val * -1 + "px";
    wave3.current.style.backgroundPositionX = 100 + val * 2 + "px";
    wave4.current.style.backgroundPositionX = 300 + val * -1 + "px";
    mountainsF.current.style.transform = `translateY(${val * 0.3}px)`;
    mountainsB.current.style.transform = `translateY(${val * -0.01}px)`;
    forestF.current.style.transform = `translateY(${val * 0.2}px)`;
    forestM.current.style.transform = `translateY(${val * -0.04}px)`;
    forestB.current.style.transform = `translateY(${val * 0.3}px)`;
    birdL.current.style.transform = `translate(${val * -0.8}px, ${
      val * -0.8
    }px)`;
    birdR.current.style.transform = `translate(${val * 0.8}px, ${val * -1}px)`;
    landingText.current.style.transform = `translateY(${val * 0.5}px)`;
    authBtn.current.style.transform = `translateY(${val * 0.65}px)`;
  });

  const handleLogout = () => {
    props.logout(history);
    setUser(null);
  };

  return (
    <section id="landing">
      <img src={MountainsBack} ref={mountainsB} id="mountainsBack" alt="mountains" />
      <img src={MountainsFront} ref={mountainsF} id="mountainsFront" alt="mountains" />
      <img src={ForestBack} ref={forestB} id="forestBack" alt="forest" />
      <h1 ref={landingText} className="landingText">
        California
        <span>Travelogue</span>
      </h1>
      <img src={BirdL} ref={birdL} id="birdL" alt="bird" />
      <img src={BirdR} ref={birdR} id="birdR" alt="bird" />
      <img src={ForestMid} ref={forestM} id="forestMid" alt="forest" />
      {user ? (
        <h1
          ref={authBtn}
          className="welcomeText"
        >
          Welcome, {user.cred.username}
        </h1>
      ) : (
        <a href="/auth" ref={authBtn} className="authBtn">
          Sign In
        </a>
      )}
      <img src={ForestFront} ref={forestF} id="forestFront" alt="forest" />
      <img src={Beach} id="beach" alt="beach" />
      <div className="wave" ref={wave4} id="wback"></div>
      <div className="wave" ref={wave3} id="wmid2"></div>
      <div className="wave" ref={wave2} id="wmid"></div>
      <div className="wave" ref={wave1} id="wfront"></div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});

export default connect(mapStateToProps, { logout })(Landing);
