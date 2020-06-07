import React, { useState, useEffect } from "react";
import ReactMapGl, { Popup } from "react-map-gl";
import "../../App.css";
import { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Post from "../../components/Post";

//redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions/postActions";

class ProfilePosts extends Component {
  state = {
    posts: [],

    //
    viewport: {
      width: "50vw",
      height: "50vh",
      // longitude: props.latitude,
      // longitude: props.longitude + 4,
      latitude: 31.681995,
      longitude: 120.3034471,
      zoom: 1, //6
    },
  };

  componentDidMount() {
    this.props.getUserPosts(this.props.profileid);
  }

  render() {
    const { posts, loading } = this.props.post;
    let profileMapContent;

    if (posts === null || loading) {
      profileMapContent = <h4>loading</h4>;
    } else {
      profileMapContent = posts
        .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
        .map((entry) => <Post key={entry._id} entry={entry} />);
    }

    return profileMapContent;
  }
}

ProfilePosts.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getUserPosts })(ProfilePosts);
