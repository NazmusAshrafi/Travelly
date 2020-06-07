import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { connect } from "react-redux";
import { addComment } from "../../../actions/postActions";

const styles = () => ({
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 10,
    position: "relative",
  },

  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
    marginTop: 15,
  },
});

class CommentForm extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };

    if (this.state.text === "") {
      this.setState({ error: "Comment cannot be empty" });
    } else {
      this.props.addComment(postId, newComment);
      this.setState({ error: "" });

      this.setState({ text: "" });
      window.location.reload();
    }
  };

  render() {
    const { classes } = this.props;

    const commentFormMarkup = (
      <Grid item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="text"
            type="text"
            label="Comment on post"
            value={this.state.text}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
            error={this.state.error ? true : false}
            helperText={this.state.error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    );
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  // errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(
  withStyles(styles)(CommentForm)
);
