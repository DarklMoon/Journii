const express = require("express");
const pool = require("../config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token"); //Use for Generate Token
const { isLoggedIn } = require("../middlewares");

router = express.Router();


router.post('/user/signup', async (req, res, next) => {
    try {

      return res.status(201).json({
        msg: "SignUp!",
      });
    } catch (error) {
      return res.status(400).json(err);
    }
})

router.post('/user/login', async (req, res, next) => {
    try {

      return res.status(200).json({
        msg: "LogIn!",
      });
    } catch (error) {
      return res.status(400).json(err);
    }
})

//Get Account User Or Admin
router.get("/user/:id", (req, res, next) => {

    return res.status(200).json({
      msg: `User/Admin Detail ${req.params.id}!`,
    });
  
});

// Path for User ?
router.get("/user/me", async (req, res, next) => {
  res.json(req.user)
});

exports.router = router;