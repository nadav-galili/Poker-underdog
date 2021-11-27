import React from "react";
import { NavLink, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Avatar from "@material-ui/core/Avatar";
import { apiImage } from "../config.json";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {GiPokerHand} from "react-icons/gi";
import { HiOutlineUserGroup} from "react-icons/hi";
import {ImStatsBars} from "react-icons/im";
import {FiLogOut} from "react-icons/fi";

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
            className="nav-link active d-flex"
            to="/about"
            onClick={() => this.closeMenu()}
          >
            <AiOutlineInfoCircle class="mt-2 me-2"/>
            <p class="m-0">About</p>
          </NavLink>
          <Link
            onClick={() => this.closeMenu()}
            className="nav-link d-flex"
            to="/demo"
          >
            <GiPokerHand class="mt-2 me-2"/>
            <p class="m-0">Game Demo</p>
          </Link>
          {this.props.user && (
            <NavLink
              className="nav-item nav-link d-flex"
              onClick={() => this.closeMenu()}
              to="/my-teams"
            >
              <HiOutlineUserGroup class="mt-2 me-2"/>
              <p class="m-0">My Teams</p>
            </NavLink>
          )}

          {this.props.user && (
            <NavLink
              className="nav-item nav-link d-flex"
              onClick={() => this.closeMenu()}
              to={`/my-stats/${this.props.user._id}`}
            >
              <ImStatsBars class="mt-2 me-2"/>
              <p class="m-0">Personal Stats</p>
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
              <div className="userDetails nav-item nav-link d-flex pb-0">
              <Avatar
                  src={`${apiImage}${this.props.details.image}`}
                  alt={this.props.details.name}
                />
                <p className="ms-2 text-primary">{this.props.details.nickName}</p>
              </div>
              <NavLink
                className="nav-item nav-link d-flex pt-0"
                to="/logout"
                onClick={() => this.closeMenu()}
              >
                <FiLogOut class="mt-2 me-2"/>
                <p class="m-0">Log out</p>
              </NavLink>
            </React.Fragment>
          )}
        </Menu>
      </div>
    );
  }
}

export default SideNavBar;
