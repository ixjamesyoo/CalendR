import React from "react";
import { Link } from "react-router-dom";

export default ({ loggedIn, currentUser, openModal, login, logout, history }) => {

  const logoDiv = (
      <div>
        <Link to="/" className="navbar-logo">
          <h1>CalendR</h1>
        </Link>
      </div>
  );

  const handleLogout = () => {
    logout().then(() => history.push("/"));
  };

  const handleDemo = () => {
    login({ email: "guest@guest.com", password: "password" });
  };

  let buttonDiv;
  if (loggedIn) {

    buttonDiv = (
      <div className="navbar-button-container">
        <button className="navbar-button logout"
          onClick={ handleLogout }>Log Out</button>
      </div>
    );
  } else {
    buttonDiv = (
      <div className="navbar-button-container">
        <button className="navbar-button" onClick={ () => openModal("signup") }>Sign Up</button>
        <button className="navbar-button" onClick={ () => openModal("login") }>Log In</button>
        <button className="navbar-button demo-button" onClick={ handleDemo }>Demo</button>
      </div>
    );
  }

  return (
    <nav className="navbar-container">
      { logoDiv }
      { buttonDiv }
    </nav>
  );
};
