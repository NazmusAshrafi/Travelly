import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Post from "../components/Post";
import Profile from "../components/Profile";

import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";

class home extends Component {
  state = {
    cachePosts: null,
  };
  componentDidMount() {
    this.props.getPosts();

    axios.get("/api/posts").then((res) => {
      this.setState({
        cachePosts: res.data,
      });
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { posts } = this.props.post;

    let recentPostMarkup;

    if (isAuthenticated === true) {
      // recentPostMarkup = <h4>user feed</h4>;
      recentPostMarkup = this.props.post ? (
        posts
          // .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
          .map((post) => <Post key={post._id} entry={post} />)
      ) : (
        <CircularProgress size={30} />
      );
    } else {
      // //home feed without login

      // axios.get("/api/posts").then((res) => {
      //   this.setState({
      //     cachePosts: res.data,
      //   });
      // });

      recentPostMarkup = this.state.cachePosts ? (
        this.state.cachePosts.map((post) => (
          <Post key={post._id} entry={post} />
        ))
      ) : (
        <CircularProgress size={30} />
      );
    }

    return (
      <Grid container spacing={8}>
        <Grid item sm={5} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={7} xs={12}>
          {recentPostMarkup}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(home);
