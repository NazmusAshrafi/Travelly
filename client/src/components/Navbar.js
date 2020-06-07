import React, { Component } from "react";
import { Link } from "react-router-dom";
import Posts from "../components/posts/Posts";

//redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileAction";

// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <AppBar>
        <Toolbar className="nav-container">
          {/* <Button color="inherit" onClick={<EditDetails />}>
            Post
          </Button> */}
          <Posts />
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" onClick={this.onLogoutClick}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    );

    const guestLinks = (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    );

    return isAuthenticated ? authLinks : guestLinks;
  }
}

Navbar.namepropTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
