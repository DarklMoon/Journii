const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

//Create Reports
router.post("/reports", async function (req, res, next){
    try {

      return res.status(201).json({
        msg: "Create report!",
      });
    } catch (error) {
      return res.status(400).json(err);
    }
})

//Get Report detail
router.get("/reports/:id", function (req, res, next) {

    return res.status(200).json({
        msg: `Get Report ${req.params.id}!`
    })
})

//Delete Report
router.delete("/reports/:id", async function (req, res, next) {
    try {

      return res.status(200).json({
        msg: `Delete report ${req.params.id}!`,
      });
    } catch (error) {
      return res.status(400).json(err);
    }
})

exports.router = router;