import React, { useState, useEffect } from "react";
import ReactMapGl, { Popup } from "react-map-gl";
import "../../App.css";
import { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "../../App.css";

//redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions/postActions";

class ProfileMap extends Component {
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
      profileMapContent = (
        <ReactMapGL
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
          mapStyle="mapbox://styles/nazmus-a/ckaezkycl1tl91imt9d78haxp"
          mapboxApiAccessToken={
            process.env.REACT_APP_MAPBOX_TOKEN ||
            "pk.eyJ1IjoibmF6bXVzLWEiLCJhIjoiY2s5cDRocG5wMDZpeTNvcjFkMnQ2MmFrayJ9.u5jhbDKNZKvZy0I-Gitaaw"
          }
        >
          {posts.map((entry) => (
            <div>
              <Marker
                key={entry._id}
                latitude={entry.latitude}
                longitude={entry.longitude}
                // offsetLeft={-20}
                // offsetTop={-10}
              >
                <div>{entry.title}</div>
                {/* <svg
                  className="marker"
                  style={{
                    width: `calc(1vmin * ${this.state.viewport.zoom})`,
                    height: `calc(1vmin * ${this.state.viewport.zoom})`,
                  }}
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg> */}
              </Marker>
            </div>
          ))}
        </ReactMapGL>
      );
    }

    return profileMapContent;
  }
}

ProfileMap.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getUserPosts })(ProfileMap);
