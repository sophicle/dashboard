/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Bookmark = require("./models/bookmark");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/bookmark", (req, res) => {
  const newBookmark = new Bookmark({
    name: req.body.name,
    link: req.body.link,
    type: req.body.type,
    userId: "not yet implemented lol", // req.user._id,
  });

  newBookmark.save().then((query) => res.send(query));
});

router.get("/bookmarks", (req, res) => {
  // if (req.user) {
  //   Query.find({ userId: req.user._id }).then((queries) => res.send(queries));
  // }
  Bookmark.find({}).then((bookmarks) => res.send(bookmarks));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
