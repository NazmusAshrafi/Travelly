import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Post from "../../../components/Post";
import Comment from "../comments/Comment";
import CommentForm from "../comments/CommentForm";
import CommentFeed from "../comments/CommentFeed";

//Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, getPost } from "../../../actions/postActions";

class getPostFormComment extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { posts, post } = this.props.post;

    let recentPostMarkup;

    if (isAuthenticated === true) {
      // recentPostMarkup = <h4>user feed</h4>;
      recentPostMarkup = this.props.post ? (
        posts.map((post) => {
          if (post._id === this.props.match.params.id) {
            return <Post key={post._id} entry={post} />;
          }
        })
      ) : (
        <p>Loading....</p>
      );
    } else {
      recentPostMarkup = this.props.post ? (
        posts.map((post) => {
          if (post._id === this.props.match.params.id) {
            return <Post key={post._id} entry={post} />;
          }
        })
      ) : (
        <p>Loading....</p>
      );
    }

    // let CommentMarkup;

    // CommentMarkup = this.props.post ? (
    //   posts.map((post) => {
    //     if (post._id === this.props.match.params.id) {
    //       post.comments.map((comment) => {
    //         // const { text, data, name, avatar } = comment;
    //         console.log(comment.text);

    //         return <Comment text={comment.text} />;
    //       });
    //     }
    //   })
    // ) : (
    //   <p>Loading....</p>
    // );
    let x;
    x = post.comments;
    console.log(x);

    return (
      <Grid container spacing={8}>
        <Grid item sm={7} xs={12}>
          {recentPostMarkup}
        </Grid>
        <Grid item sm={5} xs={12}>
          <h4>Comments</h4>

          <CommentForm postId={post._id} />
          <CommentFeed comments={post.comments} postId={post._id} />
        </Grid>
      </Grid>
    );
  }
}

getPostFormComment.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts, getPost })(
  getPostFormComment
);
