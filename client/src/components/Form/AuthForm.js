import React, { useState } from "react";
import "./form.css";
import "../Landing/landing.css";
import MountainsFront from "../../images/mountains_front.png";
import MountainsBack from "../../images/mountains_back.png";
import ForestFront from "../../images/forest_front.png";
import ForestMid from "../../images/forest_mid.png";
import ForestBack from "../../images/forest_back.png";
import Beach from "../../images/beach.png";
import BirdL from "../../images/bird_l.png";
import BirdR from "../../images/bird_r.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { login, signUp } from "../../actions/authActions";
// butter toast
import ButterToast, { Cinnamon } from "butter-toast";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function AuthForm(props) {
  const history = useHistory();
  // form data
  const [values, setValues] = useState(initialValues);
  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  // show sign-in OR sign-up form
  const [isLogin, setIsLogin] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isLogin) {
      if (values.password !== values.confirmPassword)
        ButterToast.raise({content: (<Cinnamon.Crisp title="Passwords do not match!" scheme={Cinnamon.Crisp.SCHEME_RED}/>)}); 
      else
        props.signUp(values, history, () => {
          ButterToast.raise({content: (<Cinnamon.Crisp title="Email already in use." scheme={Cinnamon.Crisp.SCHEME_RED}/>)});
        });
    } 
    else
      props.login(values, history, () => {
        ButterToast.raise({content: (<Cinnamon.Crisp title="Incorrect email/password" scheme={Cinnamon.Crisp.SCHEME_RED}/>)});
      });
  }

  return (
    <section id="landing">
      <img src={MountainsBack} id="mountainsBack" alt="mountains" />
      <img src={MountainsFront} id="mountainsFront" alt="mountains" />
      <img src={ForestBack} id="forestBack" alt="forest" />
      <img src={BirdL} id="birdL" alt="bird" />
      <img src={BirdR} id="birdR" alt="bird" />
      <img src={ForestMid} id="forestMid" alt="forest" />
      <img src={ForestFront} id="forestFront" alt="forest" />
      <img src={Beach} id="beach" alt="beach" />
      <div className="wave" id="wback"></div>
      <div className="wave" id="wmid2"></div>
      <div className="wave" id="wmid"></div>
      <div className="wave" id="wfront"></div>
      <div className="appbar">
        <a
          href="javascript:undefined"
          data-text="SIGN IN"
          onClick={() => setIsLogin(true)}
        >
          <FontAwesomeIcon icon={["fas", "sign-in-alt"]} />
        </a>
        <a
          href="/"
          data-text="CLOSE"
        >
          <FontAwesomeIcon icon={["fas", "times"]} />
        </a>
        <a
          href="javascript:undefined"
          data-text="SIGN UP"
          onClick={() => setIsLogin(false)}
        >
          <FontAwesomeIcon icon={["fas", "user-plus"]} />
        </a>
      </div>
      <form id="authForm" autoComplete="off" onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="formControl">
            <div className="inputBox">
              <input 
                type="text" 
                name="email"
                value={values.email}
                onChange={handleChange}
                required />
              <span className="placeholder">Email</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        {!isLogin && (
          <div className="formGroup">
            <div className="formControl">
              <div className="inputBox">
                <input 
                  type="text" 
                  name="username" 
                  value={values.username}
                  onChange={handleChange}
                  required />
                <span className="placeholder">User Name</span>
                <span className="line"></span>
              </div>
            </div>
          </div>
        )}
        <div className="formGroup">
          <div className="formControl">
            <div className="inputBox">
              <input 
                type="password" 
                name="password"
                value={values.password}
                onChange={handleChange}
                required />
              <span className="placeholder">Password</span>
              <span className="line"></span>
            </div>
          </div>
        </div>
        {!isLogin && (
          <div className="formGroup">
            <div className="formControl">
              <div className="inputBox">
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  required />
                <span className="placeholder">Confirm Password</span>
                <span className="line"></span>
              </div>
            </div>
          </div>
        )}
        <div className="formGroup">
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});

export default connect(mapStateToProps, { signUp, login })(AuthForm);
