import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextFieldGroup";
import { addPost } from "../../actions/postActions";
import "../../App.css";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      name: "",
      avatar: "",
      description: "",
      visitDate: "",
      latitude: "",
      longitude: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      title: this.state.text,
      name: user.name,
      avatar: user.avatar,
      description: this.state.description,
      visitDate: this.state.visitDate,
      longitude: this.props.location.longitude,
      latitude: this.props.location.latitude,
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
    console.log(newPost);
    this.props.onClose();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say something about this location
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} className="entry-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  placeholder="Name your post"
                  name="text"
                  value={this.state.text}
                  required
                  onChange={this.onChange}
                  error={errors.title}
                />
                <label htmlFor="description">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe you experience"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <label htmlFor="visitDate">Visit Date </label>
                <input
                  name="visitDate"
                  type="date"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
