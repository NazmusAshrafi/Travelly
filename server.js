const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json);

//connect database
connectDB();

//passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//use routes
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/users", users);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("production");
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000 || "http://192.168.0.100/";

app.listen(port, () => {
  console.log(`port running at ${port}...`);
});
