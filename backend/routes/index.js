const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
    
    return res.json({
        msg: 'Hello World!'
    })
});

exports.router = router;
