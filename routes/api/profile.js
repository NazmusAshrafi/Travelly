const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//import Profile model
const Profile = require("../../models/Profile");
//import User model
const User = require("../../models/User");

//load input validater
const validateProfileInput = require("../../validation/profile");

//route   GET api/profile/test
//desc    Test profile route
router.get("/test", (req, res) => {
  res.json({
    message: "its ok, user works",
  });
});

//route   GET api/profile
//desc    return current users profile
//access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      // bring name and avatar in from user
      .populate("user", ["name", "avatar"])
      //------------------
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

//route   GET api/profile/all
//desc    Get all profiles
//access  public

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(() => {
      errors.noprofile = "There are no profiles";
      res.status(404).json(errors);
    });
});

//route   GET api/profile/handle/:handle
//desc    Get profile by handle
//access  public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

//route   GET api/profile/user/:user_id
//desc    Get profile by user ID
//access  public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(() => {
      errors.noprofile = "There is no profile for this user";
      res.status(404).json(errors);
    });
});

//route   POST api/profile
//desc    Create or edit users profile
//access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //----

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) {
      profileFields.location = req.body.location;
    } else {
      profileFields.location = "";
    }
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    } else {
      profileFields.bio = "";
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => {
          res.json(profile);
        });
      } else {
        // Create

        // Check if handle already exist or not
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
        });

        //Save Profile
        new Profile(profileFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

//route   DELETE api/profile
//desc    Delete user and profile
//access  private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
