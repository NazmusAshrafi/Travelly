import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../utils/MyButton";
import dayjs from "dayjs";
import EditDetails from "../../components/EditDetails";
import isEmpty from "../../validation/is-empty";

//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount } from "../../actions/profileAction";
import { Link } from "react-router-dom";

// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      align: "center",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& .buttons": {
      align: "center",
      margin: "auto",
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  progress: {
    position: "absolute",
  },
};

class ProfileArea extends Component {
  onDeleteClick = () => {
    this.props.deleteAccount();
  };

  render() {
    const { profile, classes } = this.props;
    let profileMarkup;

    if (profile.user) {
      profileMarkup = (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img
                className="profile-image"
                alt="profile"
                src={profile.user.avatar}
              ></img>
              <MyButton
                tip="Manage profile picture at Gravatar"
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                // component={Link}
                // to={`/users/${profile.id}`}
                underline="none"
                color="primary"
                variant="h5"
              >
                {profile.user.name}
              </MuiLink>
              <hr />
              {profile.bio && (
                <Typography variant="body2">{profile.bio}</Typography>
              )}
              <hr />
              {profile.location && (
                <Fragment>
                  <LocationOn color="primary" /> <span>{profile.location}</span>
                  <hr />
                </Fragment>
              )}
              {!isEmpty(profile.social) && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {profile.social.youtube}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(profile.date).format("MMM YYYY")}</span>
            </div>
          </div>
          <div>
            <MyButton tip="Delete account" onClick={this.onDeleteClick}>
              <DeleteIcon color="secondary" />
            </MyButton>

            <EditDetails />
          </div>
        </Paper>
      );
    } else {
      profileMarkup = (
        <CircularProgress size={30} className={classes.progress} />
      );
    }

    return profileMarkup;
  }
}

ProfileArea.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount })(
  withStyles(styles)(ProfileArea)
);
