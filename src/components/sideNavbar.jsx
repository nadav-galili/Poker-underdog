import React from "react";
import { NavLink, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Avatar from "@material-ui/core/Avatar";
import { apiImage } from "../config.json";

class SideNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  }

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <Link
            className="navbar-brand"
            to="/#"
            onClick={() => this.closeMenu()}
          >
            <img
              src={process.env.PUBLIC_URL + `logoNewRed.png`}
              alt="logo"
            ></img>
          </Link>
          <NavLink
            className="nav-link active"
            to="/about"
            onClick={() => this.closeMenu()}
          >
            About
          </NavLink>
          <Link
            onClick={() => this.closeMenu()}
            className="nav-link"
            to="/demo"
          >
            Game Demo
          </Link>
          {this.props.user && (
            <NavLink
              className="nav-item nav-link"
              onClick={() => this.closeMenu()}
              to="/my-teams"
            >
              My Teams
            </NavLink>
          )}

          {this.props.user && (
            <NavLink
              className="nav-item nav-link"
              onClick={() => this.closeMenu()}
              to={`/my-stats/${this.props.user._id}`}
            >
              Personal Stats
            </NavLink>
          )}
          {!this.props.user && (
            <React.Fragment>
              <NavLink
                className="nav-item nav-link"
                to="/signin"
                onClick={() => this.closeMenu()}
              >
                Sign-In
              </NavLink>
              <NavLink
                className="nav-item nav-link"
                to="/signup"
                onClick={() => this.closeMenu()}
              >
                Sign-Up
              </NavLink>
            </React.Fragment>
          )}
          {this.props.user && (
            <React.Fragment>
              <div className="userDetails nav-item nav-link">
                <p className="text-primary">{this.props.details.nickName}</p>
                <Avatar
                  src={`${apiImage}${this.props.details.image}`}
                  alt={this.props.details.name}
                />
              </div>
              <NavLink
                className="nav-item nav-link"
                to="/logout"
                onClick={() => this.closeMenu()}
              >
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </Menu>
      </div>
    );
  }
}

export default SideNavBar;
