import React, { Component } from "react";

let LoginInput = ({username, password, authError, handleUsernameChange, handlePasswordChange, handleLogin}) => {

  return (
    <div className="container">
      <div className="login-form box">
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" placeholder="Username" value={username} onInput={handleUsernameChange}/>
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" value={password} onInput={handlePasswordChange} />
            <span className="icon is-small is-left">
              <i className="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            {username && password ? (
              <button className="button is-info" onClick={handleLogin}>
                Let me in
              </button>
            ) : (
              <button className="button is-info" disabled>
                Let me in
              </button>
            )}
          </p>
        </div>
        {authError &&
          <div className="error">{authError}</div>
        }
      </div>
    </div>
  );
}

export default LoginInput;
