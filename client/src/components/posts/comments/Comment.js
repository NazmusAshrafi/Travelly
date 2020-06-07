import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import withStyles from "@material-ui/core/styles/withStyles";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../actions/postActions";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { MapState } from "react-map-gl";

const styles = () => ({
  commentImage: {
    maxWidth: "100%",
    height: 60,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
});

class Comment extends Component {
  // deleteComment = (postId, commentId) => {
  //   this.props.deleteComment(postId, commentId);
  // };

  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
    window.location.reload();
  }

  render() {
    const { comment, postId, classes, auth } = this.props;
    const { text, date, avatar, name, _id, user } = comment;
    return (
      <div>
        {/* <h2>{this.props.comment.text}</h2> */}

        <Fragment key={date}>
          <Grid item sm={12}>
            <Grid container>
              <Grid item sm={2}>
                <img
                  src={avatar}
                  alt="comment"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography variant="h5" color="primary">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(date).format("h:mm a, MMMM DD YYYY")}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variabnt="body1">{text}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* {index !== comments.length - 1 && (
            <hr className={classes.visibleSeparator} />
          )} */}

          {user === auth.user.id ? (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.onDeleteClick.bind(this, postId, _id)}
            >
              Delete
            </Button>
          ) : null}

          <hr className={classes.visibleSeparator} />
        </Fragment>
      </div>
    );
  }
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(
  withStyles(styles)(Comment)
);
