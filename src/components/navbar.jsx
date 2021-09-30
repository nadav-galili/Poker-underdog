import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    const { details } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow p-3 ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/#">
            <img
              src={process.env.PUBLIC_URL + `logoNewRed.png`}
              alt="logo"
            ></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/demo">
                  Game Demo
                </Link>
              </li>

              <li className="nav-item">
                {user && (
                  <NavLink className="nav-item nav-link" to="/my-teams">
                    My Teams
                  </NavLink>
                )}
              </li>

              <li className="nav-item">
                {user && (
                  <NavLink
                    className="nav-item nav-link"
                    to={`/my-stats/${user._id}`}
                  >
                    Personal Stats
                  </NavLink>
                )}
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signin">
                      Sign-In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signup">
                      Sign-Up
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li className="nav-item me-2">
                    {user && (
                      <Avatar src={details.userImage} alt={details.name} />
                    )}
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
