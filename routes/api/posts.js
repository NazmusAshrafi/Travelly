const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");
//Profile model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

//route   GET api/posts/test
//desc    Test post route
router.get("/test", (req, res) => {
  res.json({
    message: "its ok, posts works",
  });
});

//route   GET api/posts
//desc    Get posts
//access  public
router.get("/", (req, res) => {
  Post.find()
    .sort({ timestamps: -1 }) //sorts ascending
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(400).json({ nopostsfound: "no posts found " }));
});

//route   GET api/posts/:id
//desc    Get post by id
//access  public
router.get("/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })

    .then((post) => {
      res.json(post);
    })
    .catch((err) =>
      res.status(400).json({ nopostfound: "no post found with that id" })
    );
});

//
//route   GET api/posts/userposts/:user_id
//desc    Get posts by user ID
//access  public
router.get("/userposts/:user_id", (req, res) => {
  Post.find({ user: req.params.user_id })
    .sort({ timestamps: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) =>
      res.status(400).json({ nopostsfound: "no posts found with that id" })
    );
});

//route   POST api/posts
//desc    Create post
//access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //check validation
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //------

    req.body.user = req.user.id;
    const newPost = new Post(req.body);
    const createdPost = await newPost.save();
    res.json(createdPost);
  }
);

//route   PUT api/posts/:id
//desc    Update post
//access  private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validation
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //------

    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //update post
          Post.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
            Post.findOne({ _id: req.params.id }).then((post) => {
              res.json(post);
            });
          });
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//route   DELETE api/posts/:id
//desc    Delete post
//access  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //delete post
          post.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//route   POST api/posts/like/:id
//desc    Like post
//access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0 //means user already in like array
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "user already liked this post" });
          }

          //add user id to like array
          post.likes.unshift({ user: req.user.id });

          post.save().then((post) => {
            res.json(post);
          });
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//route   POST api/posts/unlike/:id
//desc    Unlike post
//access  private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0 //means user not in the like array
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          //remove user id from like array-----
          //get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          //splice it out of array
          post.likes.splice(removeIndex, 1);
          //save
          post.save().then((post) => res.json(post));
          //--------------------------
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

//route   POST api/posts/comment/:id
//desc    Add comment to post
//access  private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check Validation

    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//route   DELETE api/posts/comment/:id
//desc    Delete comment from post
//access  private
router.delete(
  "/comment/:id/:comment_id",
  //:postid/:commentid
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
