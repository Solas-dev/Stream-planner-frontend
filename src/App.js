import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/js/bootstrap";
import AuthService from "./services/auth.service";
import EventService from "./services/event.service";
import Overview from "./components/Overview";
import Login from "./components/Login2";
import Register from "./components/Register2";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Planner from "./components/Planner";

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [userEvents, setUserEvents] = useState([]);
  const [updateEvent, setUpdateEvent] = useState(false);
  // const [validUser, setValidUser] = useState(true);
  // console.log(userEvents);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      AuthService.checkUser(currentUser.id).then((res) => {
        if (res === false) {
          AuthService.logout();
        }
      });

      // console.log(AuthService.checkUser(currentUser.id));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      EventService.getUserEvents(currentUser.id).then((res) => {
        // console.log(res);
        setUserEvents(res);
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      EventService.getUserEvents(currentUser.id).then((res) => {
        // console.log(res);
        setUserEvents(res);
      });
    }
  }, [updateEvent]);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="main-body">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark nav bg-milldgrey">
          <Link to={"/"} className="navbar-brand">
            millPlan
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarToggler">
            {currentUser ? (
              <div className="navbar-nav mr-auto text-center">
                <li className="nav-item ">
                  <Link to={"/overview"} className="nav-link text-millyell">
                    Overview
                  </Link>
                </li>

                <li className="nav-item ">
                  <Link to={"/planner"} className="nav-link text-millyell">
                    Planner
                  </Link>
                </li>
              </div>
            ) : null}

            {currentUser ? (
              <ul className="navbar-nav ml-auto text-center">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link text-millyell">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-link text-millyell"
                    onClick={logOut}
                  >
                    LogOut
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} user={currentUser} />}
            />
            <Route
              path="/planner"
              render={(props) =>
                currentUser ? (
                  <Planner
                    {...props}
                    user={currentUser}
                    events={userEvents}
                    setEvents={setUserEvents}
                    updateEvent={updateEvent}
                    setUpdateEvent={setUpdateEvent}
                  />
                ) : (
                  <p>Please Log in to use this feature </p>
                )
              }
            />
            <Route
              path="/overview"
              render={(props) =>
                currentUser ? (
                  <Overview
                    {...props}
                    user={currentUser}
                    events={userEvents}
                    setEvents={setUserEvents}
                    updateEvent={updateEvent}
                    setUpdateEvent={setUpdateEvent}
                  />
                ) : (
                  <p>Please Log in to use this feature </p>
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

// <Route path="/login">
//   <Login />
// </Route>

export default App;
