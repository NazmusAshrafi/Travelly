import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import Post from "../../components/Post";
import Profile from "../Profile";
import ProfileArea from "../profile/ProfileArea";
import ProfileMap from "../profile/Profile-map";
import ProfilePosts from "../profile/Profile-posts";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileById } from "../../actions/profileAction";

//mui
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  progress: {
    position: "absolute",
  },
};

class ProfilePage extends Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    axios.get("/api/posts").then((res) => {
      this.setState({
        posts: res.data,
      });
    });

    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  render() {
    let recentPostMarkup = this.state.posts ? (
      this.state.posts.map((post) => <Post key={post._id} post={post} />)
    ) : (
      <p>Loading....</p>
    );

    //
    const { classes } = this.props;
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null) {
      profileContent = (
        <div>
          <CircularProgress size={30} className={classes.progress} />
          <br></br>
          <h4>Please fill profile details at home page if you have not</h4>
        </div>
      );
    } else {
      profileContent = (
        <Grid container spacing={8}>
          <Grid item sm={5} xs={12}>
            {/* <Profile /> */}
            <ProfileArea profile={profile} />
          </Grid>
          <Grid item sm={7} xs={12}>
            {/* {recentPostMarkup} */}
            <h4>Your Map</h4>
            <ProfileMap profileid={this.props.match.params.id} />
            <h4>Your Posts</h4>
            <ProfilePosts profileid={this.props.match.params.id} />
          </Grid>
        </Grid>
      );
    }

    return profileContent;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(
  withStyles(styles)(ProfilePage)
);
