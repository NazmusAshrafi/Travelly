import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MapPost from "./Post-map";
import DeletePost from "../components/DeletePost";

//redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, removeLike, getPost } from "../actions/postActions";

//MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import MyButton from "../utils/MyButton";

import MuiLink from "@material-ui/core/Link";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    display: "flex",
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },

  root: {
    position: "relative",
    maxWidth: 645,
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    objectFit: "cover",
  },

  avatar: {
    backgroundColor: red[500],
  },
};

class Post extends Component {
  state = {
    localLikes: this.props.entry.likes.length,
    isButtonDisabled: false,
  };

  onLikeClick(id) {
    if (this.props.auth.isAuthenticated) {
      this.props.addLike(id);
      // window.location.reload();
      // document.location.reload(true);

      let i, userPresent, selectedPost, j;

      for (j = 0; j < this.props.post.posts.length; j++) {
        if (this.props.post.posts[j]._id === id) {
          selectedPost = this.props.post.posts[j];
          console.log(selectedPost.title);
          //
          for (i = 0; i < selectedPost.likes.length; i++) {
            if (selectedPost.likes[i].user === this.props.auth.user.id) {
              userPresent = true;
              console.log(userPresent);
              console.log(selectedPost.likes[i].user);
              console.log(this.props.auth.user.id);
              break;
            } else {
              userPresent = false;
              console.log(userPresent);
              console.log(selectedPost.likes[i].user);
              console.log(this.props.auth.user.id);
              break;
            }
          }
        }
      }

      if (!userPresent) {
        this.setState({
          localLikes: this.state.localLikes + 1,
          isButtonDisabled: true,
        });

        // **** here's the timeout ****
        setTimeout(() => this.setState({ isButtonDisabled: false }), 1000);
      }
    } else {
      window.alert("Please log in to interact with post");
    }
  }

  onUnlikeClick(id) {
    if (this.props.auth.isAuthenticated) {
      this.props.removeLike(id);
      // window.location.reload();
      // document.location.reload(true);

      let i, userPresent, selectedPost, j;

      for (j = 0; j < this.props.post.posts.length; j++) {
        if (this.props.post.posts[j]._id === id) {
          selectedPost = this.props.post.posts[j];
          console.log(selectedPost.title);
          //
          for (i = 0; i < selectedPost.likes.length; i++) {
            if (selectedPost.likes[i].user === this.props.auth.user.id) {
              userPresent = true;
              console.log(userPresent);
              console.log(selectedPost.likes[i].user);
              console.log(this.props.auth.user.id);
              break;
            } else {
              userPresent = false;
              console.log(userPresent);
              console.log(selectedPost.likes[i].user);
              console.log(this.props.auth.user.id);
              break;
            }
          }
        }
      }

      if (userPresent) {
        if (this.state.localLikes != 0) {
          this.setState({
            localLikes: this.state.localLikes - 1,
            isButtonDisabled: true,
          });

          // **** here's the timeout ****
          setTimeout(() => this.setState({ isButtonDisabled: false }), 1000);
        }
      }
    } else {
      window.alert("Please log in to interact with post");
    }
  }

  // component did mount - get post by post _id
  // componentDidMount() {
  //   this.props.getPost(this.props._id);
  // }

  render() {
    const { auth, post } = this.props;

    dayjs.extend(relativeTime);
    const {
      classes,
      entry: {
        title,
        visitDate,
        latitude,
        longitude,
        comments,
        likes,
        createdAt,
        updatedAt,
        description,
        avatar,
        name,
        user,
        _id,
      },
    } = this.props;

    let i, userPresent, selectedPost, j;

    for (j = 0; j < this.props.post.posts.length; j++) {
      if (this.props.post.posts[j]._id === _id) {
        selectedPost = this.props.post.posts[j];
        console.log(selectedPost.title);
        //
        for (i = 0; i < selectedPost.likes.length; i++) {
          if (selectedPost.likes[i].user === this.props.auth.user.id) {
            userPresent = true;
            console.log(userPresent);
            console.log(selectedPost.likes[i].user);
            console.log(this.props.auth.user.id);
            break;
          } else {
            userPresent = false;
            console.log(userPresent);
            console.log(selectedPost.likes[i].user);
            console.log(this.props.auth.user.id);
            break;
          }
        }
      }
    }

    let thumbsup;
    if (!userPresent) {
      thumbsup = <ThumbUpIcon color="blue" />;
    } else {
      thumbsup = <ThumbUpIcon color="primary" />;
    }

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={avatar}>
              R
            </Avatar>
          }
          // action={user === auth.user.id ? <DeletePost postId={_id} /> : null}
          title={name}
          subheader={dayjs(createdAt).fromNow()}
        />
        <>
          {/* mapbox */}
          {/* {avatar ? (
            <CardMedia className={classes.media} image={<Map />} title="Map " />
          ) : null} */}

          <MapPost
            className={classes.media}
            latitude={latitude}
            longitude={longitude}
          />
        </>
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Visited on: {dayjs(visitDate).format("MM-DD-YYYY")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>

          <MyButton
            disabled={this.state.isButtonDisabled}
            onClick={this.onLikeClick.bind(this, _id)}
            tip="Like"
          >
            {thumbsup}
          </MyButton>
          <MyButton
            disabled={this.state.isButtonDisabled}
            onClick={this.onUnlikeClick.bind(this, _id)}
            tip="Dislike"
          >
            <ThumbDownIcon id="thumb" color="black" />
          </MyButton>
          <span>{this.state.localLikes} likes</span>

          <MuiLink
            component={Link}
            to={`/post/${_id}`}
            underline="none"
            color="primary"
            variant="h5"
          >
            <MyButton tip="comments">
              <ChatIcon color="black" />
            </MyButton>
          </MuiLink>

          <span>{comments.length} comments</span>
          {user === auth.user.id ? <DeletePost postId={_id} /> : null}
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addLike, removeLike, getPost })(
  withStyles(styles)(Post)
);
