const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newuser = new User({ username, email });
      const registeredUser = await User.register(newuser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }      
        req.flash("success", "Welcome to Travencia!");
        res.redirect("/listings");
      });  
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }),
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async(req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  },
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {  
      return next(err);
    } else {
      req.flash("success", "You are logged out!");
      res.redirect("/listings");
    }   
  });
});

module.exports = router;
