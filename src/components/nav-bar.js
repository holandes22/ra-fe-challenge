import React from "react";

let NavBar = ({ user, handleLogout }) => {

  return (
    <nav className="nav">
      <div className="nav-left">
        <div className="nav-item">
          <p>Welcome, {user}!</p>;
        </div>
      </div>


      <div className="nav-right nav-menu">

        <div className="nav-item">
          <a className="button is-outlined" onClick={handleLogout}>
            <span className="icon">
              <i className="fa fa-sign-out"></i>
            </span>
            <span>Sign out!</span>
          </a>
        </div>
      </div>
    </nav>
  );

};

export default NavBar;
