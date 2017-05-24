import React, { Component } from "react";
import ReactDOM from "react-dom";
import LoginInput from "./components/login-input";
import NavBar from "./components/nav-bar";
import Draggable from "./components/draggable";


const KEY = "fe-ch-react-session";

let session = window.localStorage.getItem(KEY);

if (session) {
  session = JSON.parse(session);
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: (session) ? session.currentUser : null,
      username: "",
      password: "",
      authError: null,
      namePosition: (session) ? session.namePosition : {x: "10", y: "100"},
      picPosition: (session) ? session.picPosition : {x: "10", y: "300"},
    };
  }

  render() {
    let namePos = this.state.namePosition;
    let picPos = this.state.picPosition;

    if (this.state.currentUser) {
      return (
        <div>
          <NavBar
            user={this.state.currentUser}
            handleLogout={() => this.handleLogout()}
          />

          <h2 className="subtitle">This is your profile:</h2>

          <Draggable
            x={namePos.x}
            y={namePos.y}
            handlePositionChange={(pos) => this.handlePositionChange("name", pos)}>
              <div>Name:</div>
              <div className="name">{this.state.currentUser}</div>
          </Draggable>

          <Draggable
            x={picPos.x}
            y={picPos.y}
            handlePositionChange={(pos) => this.handlePositionChange("pic", pos)}>
              <div>Pic:</div>
              <div>
                <img src="images/pic_100x100.jpg" alt="None" />
              </div>
          </Draggable>

        </div>
      );
    } else {
      return (
        <div>
          <LoginInput
            username={this.state.username}
            password={this.state.password}
            authError={this.state.authError}
            handleUsernameChange={(e) => this.setState({ username: e.target.value })}
            handlePasswordChange={(e) => this.setState({ password: e.target.value })}
            handleLogin={() => this.handleLogin()}
          />
        </div>
      );
    }
  }

  handleLogin() {
    if (this.state.password === "123") {
      this.setState(
        { currentUser: this.state.username, authError: null }
      );
    } else {
      this.setState({ authError: "Auth error. (hint: password is 123)" });
    }
  }

  handleLogout() {
    window.localStorage.removeItem(KEY);
    this.setState({
      currentUser: null,
      username: "",
      password: "",
      authError: null,
      namePosition: {x: "10", y: "100"},
      picPosition: {x: "10", y: "300"}
    });
  }

  handlePositionChange(key, pos) {
    // switch statement is lame, but
    // using dynamic keys was not saving state for
    // the nested object
    switch(key) {
    case "name":
      this.setState({namePosition: pos});
      break;
    case "pic":
      this.setState({picPosition: pos});
      break;
    default:
      return;

    }

  }

  componentDidUpdate() {
    let session = {
      currentUser: this.state.currentUser,
      namePosition: this.state.namePosition,
      picPosition: this.state.picPosition,
    };

    session = JSON.stringify(session);
    window.console.log(`Storing session in LocalStorage ${session}`);
    window.localStorage.setItem(KEY, session);
  }

}

ReactDOM.render(<App />, document.getElementById("container"));
