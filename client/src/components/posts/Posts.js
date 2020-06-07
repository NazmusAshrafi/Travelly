import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../utils/MyButton";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import CreateMap from "../../components/posts/Create-map";
import MapPost from "../Post-map";

// Redux stuff
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profileAction";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";

// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = () => ({
  button: {
    float: "right",
    color: "white",
  },
  textField: {
    margin: "10px auto 10px auto",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    objectFit: "cover",
  },
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    handle: "",
    status: "",
    open: false,
    errors: {},
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      // Set component fields state
      this.setState({
        website: profile.youtube,
        location: profile.location,
        status: profile.status,
        handle: profile.handle,
        bio: profile.bio,
        youtube: profile.youtube,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      location: this.state.location,
      bio: this.state.bio,
      youtube: this.state.website,
      handle: this.state.handle,
      status: this.state.status,
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <Button
          color="inherit"
          tip="Make a post"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          Post
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Card className={classes.root}>
            <>
              <CreateMap
                className={classes.media}
                latitude={23.8}
                longitude={34.2}
              />
            </>
          </Card>

          <DialogActions>
            <MyButton
              tip="Double click on map to start making post"
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
            <Button
              tip="Cancel post"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            {/* <Button onClick={this.onSubmit} color="primary">
              Post
            </Button> */}
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withStyles(styles)(withRouter(EditDetails))
);
