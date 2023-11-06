import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const logo = process.env.PUBLIC_URL + "/images/newlogo-nobg.png";

  return (
    <ul className="nav-header">
      <div>
        <NavLink exact to="/">
          <img className="logo" src={logo} />
        </NavLink>
      </div>
      <div className="nav-links">
        <div className="nav-dramas">
          <NavLink className="nav-linky" to="/dramas">
            Dramas
          </NavLink>
        </div>
        <div className="nav-actors">
          <NavLink className="nav-linky" to="/actors">
            Actors
          </NavLink>
        </div>
      </div>
      <div className="nav-pb">
        {isLoaded ? (
          sessionUser ? (
            <ProfileButton user={sessionUser} className="nav-button" />
          ) : (
            <>
              <div className="signup">
                <OpenModalButton
                  className="signup-button"
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </div>
              <div className="login">
                <OpenModalButton
                  className="login-button"
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </div>
            </>
          )
        ) : null}
      </div>
    </ul>
  );
}

export default Navigation;
