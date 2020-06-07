import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "../comments/Comment";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    console.log(postId);
    if (comments) {
      return comments.map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ));
    } else {
      return <h4>loading...</h4>;
    }
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentFeed;
